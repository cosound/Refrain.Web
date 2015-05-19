declare var twttr: any;

class MoodViewModel implements IPageViewModel
{
	public SelectedTweets: KnockoutObservableArray<string> = ko.observableArray<string>();
	public CanShowMoreTweets: KnockoutObservable<boolean> = ko.observable(false);
	public AvailableMoodCountries: KnockoutObservableArray<MoodGraphCountry> = ko.observableArray<MoodGraphCountry>();
	public MoodGraphCurrentTime: KnockoutObservable<Date> = ko.observable<Date>(new Date(2014, 4, 6, 6, 0));
	public MoodMapCurrentTime: KnockoutObservable<Date> = ko.observable<Date>(new Date(2014, 4, 6, 18, 0));
	public IsLoadingGraph:KnockoutObservable<boolean> = ko.observable(false);

	private _map: google.maps.Map;
	private _moodData: { [countryCode: string]: number } = {};
	private _tweets: string[];
	private _graphData: jquery.flot.dataSeries[];
	private _graphOptions: jquery.flot.plotOptions;

	private _updateHandler: number = null;

	constructor()
	{
		this.MoodMapGotoEuroVision2015();
		this.MoodGraphGotoEuroVision2015(false);
	}

	public Initialize():void
	{
		var mapStyle = [{ "featureType": "road", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#fffffa" }] }, { "featureType": "water", "stylers": [{ "lightness": 50 }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "lightness": 40 }] }];

		this._map = new google.maps.Map(document.getElementById('map-canvas'), <any>{
			zoom: 4,
			center: new google.maps.LatLng(51.5, 13.7),
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: mapStyle
		});

		(<any>this._map).data.loadGeoJson('Countries.json');

		this.InitializeGraph();
	}

	private InitializeGraph(): void
	{	
		this._graphData = [];
		this._graphOptions = {
			lines: {
				show: true
			},
			series: {
				curvedLines: {
					active: true,
					apply: true
				}
			},
			xaxis: {
				mode: "time",
				timezone: "browser",
				timeformat: "%H:%M",
				color: "grey",
				minTickSize: [4, "hour"],
				panRange: this.GetPanXRange()
			},
			yaxis: {
				min: -1,
				max: 1,
				color: "#0088EE",
				ticks: [[-1, "Negative"], [-0.75, ""], [-0.5, ""], [-0.25, ""], [0, "Neutral"], [0.25, ""], [0.5, ""], [0.75, ""], [1, "Positive"]],
				panRange: [-1, 1]
			},
			grid: {
				borderColor: "white"
			},
			hooks: {
				drawSeries: [(p: any, c: any, s: any) => s.Country.Color(s.color)]
			},
			zoom: {
				interactive: true
			},
			pan: {
				interactive: true
			}
		};
	}

	private GetPanXRange():number[]
	{
		var min = this.MoodGraphCurrentTime().getTime();

		return [min, min + 24 * 60 * 60 * 1000];
	}

	private InitializeGraphCountries(groups: any[]): void
	{
		if (this.AvailableMoodCountries().length !== 0 || groups.length === 0) return;

		for (var i = 0; i < groups.length; i++)
			this.AvailableMoodCountries.push(new MoodGraphCountry(groups[i], (country) => this.CountrySelectToggled(country)));

		this.AvailableMoodCountries.sort((a, b) => a.Name.localeCompare(b.Name));

		var selectedCountries: MoodGraphCountry[] = [];

		for (i = 0; i < Math.min(3, groups.length); i++)
		{
			var country = this.AvailableMoodCountries()[Math.floor(Math.random() * this.AvailableMoodCountries().length)];

			if (country.IsSelected())
				i--;
			else
			{
				country.IsSelected(true);
				selectedCountries.push(country);
			}
		}

		this.GetGraphData(selectedCountries);
	}

	public Dispose(): void
	{
		if (this._updateHandler != null) clearInterval(this._updateHandler);
	}

	public PortalReady(): void
	{
		this.Update();

		this.MoodMapCurrentTime.subscribe(v => this.UpdateMoodMap());

		RefrainPortal.TwitterMood.Get().WithCallback(this.TwitterMoodGetForGraphCountriesCompleted, this);
		
		//this._updateHandler = setInterval(() => this.Update(), 5 * 60 * 1000);
	}

	public MoodMapNext():void
	{
		this.MoodMapCurrentTime().setMinutes(this.MoodMapCurrentTime().getMinutes() + 5);

		this.MoodMapCurrentTime(this.MoodMapCurrentTime());
	}

	public MoodMapNextBig(): void
	{
		this.MoodMapCurrentTime().setHours(this.MoodMapCurrentTime().getHours() + 6);

		this.MoodMapCurrentTime(this.MoodMapCurrentTime());
	}

	public MoodMapPrevious(): void
	{
		this.MoodMapCurrentTime().setMinutes(this.MoodMapCurrentTime().getMinutes() - 5);

		this.MoodMapCurrentTime(this.MoodMapCurrentTime());
	}

	public MoodMapPreviousBig(): void
	{
		this.MoodMapCurrentTime().setHours(this.MoodMapCurrentTime().getHours() - 6);

		this.MoodMapCurrentTime(this.MoodMapCurrentTime());
	}

	public MoodMapGotoEuroVision2014():void
	{
		this.MoodMapCurrentTime(new Date(2014, 4, 6, 18, 0));
	}

	public MoodMapGotoEuroVision2015(): void
	{
		this.MoodMapCurrentTime(this.GetNowIfFuture(new Date(2015, 4, 23, 18, 0)));
	}

	public MoodGraphPrevious():void
	{
		this.MoodGraphCurrentTime().setDate(this.MoodGraphCurrentTime().getDate() - 1);

		this.MoodGraphCurrentTime(this.MoodGraphCurrentTime());

		this.RefreshGraphData();
	}

	public MoodGraphNext(): void
	{
		this.MoodGraphCurrentTime().setDate(this.MoodGraphCurrentTime().getDate() + 1);

		this.MoodGraphCurrentTime(this.MoodGraphCurrentTime());

		this.RefreshGraphData();
	}

	public MoodGraphGotoEuroVision2014(): void
	{
		this.MoodGraphCurrentTime(new Date(2014, 4, 6, 6, 0));
		this.RefreshGraphData();
	}

	public MoodGraphGotoEuroVision2015(shouldRefresh:boolean = true): void
	{
		this.MoodGraphCurrentTime(this.GetNowIfFuture(new Date(2015, 4, 23, 6, 0), 6));

		if(shouldRefresh)
			this.RefreshGraphData();
	}

	private GetNowIfFuture(date:Date, hour:number = null):Date
	{
		var now = new Date();
		now.setSeconds(0);
		now.setMinutes(now.getMinutes() - 10);

		if (hour != null)
		{
			now.setMinutes(0);
			now.setHours(hour);
		}

		return date.getTime() > now.getTime() ? now : date;
	}

	private GetGraphData(countries:MoodGraphCountry[]):void
	{
		if (countries.length == 0) return;

		this.IsLoadingGraph(true);

		var start = this.MoodGraphCurrentTime();
		var end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

		RefrainPortal.TwitterMood.Get(countries.map((v, i) => v.CodeName), start, end, 999).WithCallback(r => this.TwitterMoodGraphCompleted(r, countries, start, end), this);
	}

	private Update():void
	{
		this.UpdateMoodMap();
		RefrainPortal.Tweet.Get().WithCallback(this.TweetGetCompleted, this);
	}

	private UpdateMoodMap():void
	{
		var after = this.MoodMapCurrentTime();
		var before = new Date(after.getTime());
		before.setMinutes(before.getMinutes() + 7);
		RefrainPortal.TwitterMood.Get(null, after, before).WithCallback(this.TwitterMoodGetCompleted, this);
	}

	private TwitterMoodGraphCompleted(response: CHAOS.Portal.Client.IPortalResponse<any>, countries: MoodGraphCountry[], start:Date, end:Date): void
	{
		if (response.Error != null)
		{
			console.log("Failed to get Twitter mood: " + response.Error.Message);
			return;
		}

		var groups = <any[]>(<any>response.Body).Groups;
		var data:IMoodData<any>[] = null;

		for (var o:number = 0; o < countries.length; o++)
		{
			data = null;
			for (var i: number = 0; i < groups.length; i++)
			{
				if (!countries[o].IsEqualGroup(groups[i])) continue;
				data = groups[i].Results;
				break;
			}

			if (data == null) data = [];

			this.UpdateMoodData(countries[o], data, start, end);
		}

		this.UpdateGraph();
	}

	private UpdateMoodData(country:MoodGraphCountry, data:IMoodData<any>[], start:Date, end:Date):void
	{
		if (country.HasData())
			country.UpdateData(data, start, end);
		else
			this._graphData.push(country.UpdateData(data, start, end));
	}

	private CountrySelectToggled(country:MoodGraphCountry):void
	{
		if (country.IsSelected())
		{
			if (country.HasData())
			{
				this._graphData.push(country.Data);

				this.UpdateGraph();
			}
			else
				this.GetGraphData([country]);
		} else
		{
			for (var i = 0; i < this._graphData.length; i++)
			{
				if ((<any>this._graphData[i]).Country !== country) continue;

				this._graphData.splice(i, 1);
				break;
			}

			this.UpdateGraph();
		}
	}

	private RefreshGraphData():void
	{
		var countries: MoodGraphCountry[] = [];
		var country: MoodGraphCountry;

		(<any>this._graphOptions.xaxis).panRange = this.GetPanXRange();

		for (var i = 0; i < this.AvailableMoodCountries().length; i++)
		{
			country = this.AvailableMoodCountries()[i];
			
			if (country.IsSelected())
				countries.push(country);
			else
				country.ClearData();
		}

		this.GetGraphData(countries);
	}

	private UpdateGraph():void
	{
		$.plot("#MoodTimelineGraph", this._graphData, this._graphOptions);

		this.IsLoadingGraph(false);
	}

	private TwitterMoodGetCompleted(response: CHAOS.Portal.Client.IPortalResponse<any>):void
	{
		if (response.Error != null)
		{
			console.log("Failed to get Twitter mood: " + response.Error.Message);
			return;
		}

		var groups = <any[]>(<any>response.Body).Groups;
		this._moodData = {};

		for (var i = 0; i < groups.length; i++)
		{
			var valence = groups[i].Results.length > 0 ? groups[i].Results[0].Valence : 0;
			this._moodData[MoodViewModel.Capitalize(<string>groups[i].Value)] = valence;
		}
		
		(<any>this._map).data.setStyle({});
		(<any>this._map).data.setStyle((f: any) => this.SetCountryStyle(f));
	}

	private TwitterMoodGetForGraphCountriesCompleted(response: CHAOS.Portal.Client.IPortalResponse<any>): void
	{
		if (response.Error != null)
		{
			console.log("Failed to get Twitter mood: " + response.Error.Message);
			return;
		}

		if (response.Body == null || (<any>response.Body).Groups == null) return;

		this.InitializeGraphCountries(<any[]>(<any>response.Body).Groups);
	}

	private TweetGetCompleted(response: CHAOS.Portal.Client.IPortalResponse<any>): void
	{
		if (response.Error != null)
		{
			console.log("Failed to get Twitter mood: " + response.Error.Message);
			return;
		}

		this._tweets = [];
		this.SelectedTweets.removeAll();

		var groups = <any[]>(<any>response.Body).Groups;
		var group: any;

		for (var i = 0; i < groups.length; i++)
		{
			group = groups[i];

			if (group.Results == null || group.Results.lenght == 0) continue;

			for (var o = 0; o < group.Results.length; o++)
				this._tweets.push(group.Results[o].EmbedCode);
		}

		this.ShowMoreTweets();
	}

	public ShowMoreTweets():void
	{
		for (var i = 0; i < 5 && this._tweets.length > 0; i++)
			this.SelectedTweets.push(this.GetTweetEmbed(this._tweets.shift()));

		this.CanShowMoreTweets(this._tweets.length != 0);

		try
		{
			twttr.widgets.load(document.getElementById("MoodTweets"));
		} catch (error)
		{
			console.log("Twitter caused an error: " + error.message);
		}
	}

	private GetTweetEmbed(rawCode:string):string
	{
		var code = decodeURIComponent(rawCode.replace(/\+/g, '%20'));
		return code.substring(code.indexOf("<blockquote"), code.indexOf("</blockquote>") + 12);
	}

	public static Capitalize(country:string):string
	{
		return country.replace("_", " ").replace(/(?:^|\s)\S/g, a => a.toUpperCase());
	}

	private SetCountryStyle(feature:any):any
	{
		var name = feature.A.name;
		if (this._moodData[name] == null)
			return { visible: false };

		var mood = this._moodData[name];

		var color = "#" + (mood < 0
			? this.HexFromRGB(255 + 51 * mood, 255 + 255 * mood, 255 + 102 * mood)
			: this.HexFromRGB(255 - 255 * mood, 255 - 102 * mood, 255 - 255 * mood));

		return {
			fillColor: color,
			strokeColor: color,
			strokeWeight: 1
		};
	}

	private HexFromRGB(r: number, g: number, b: number)
	{
		var hex = [
			Math.floor(r).toString(16),
			Math.floor(g).toString(16),
			Math.floor(b).toString(16)
		];
		$.each(hex, (nr, val) => {
			if (val.length === 1)
				hex[nr] = "0" + val;
		});

		return hex.join("").toUpperCase();
	}
}

class MoodGraphCountry
{
	public Name: string;
	public CodeName: string;
	public CountryCode:string;
	public Color: KnockoutObservable<string> = ko.observable<string>();

	public Data: jquery.flot.dataSeries;

	public IsSelected: KnockoutObservable<boolean> = ko.observable(false);

	private _updateCallback: (country: MoodGraphCountry) => void;

	private _dataPointSpacing:number = 300000;

	constructor(resultGroup: any, updateCallback: (country: MoodGraphCountry) => void)
	{
		this.Name = MoodViewModel.Capitalize(resultGroup.Value);
		this.CodeName = resultGroup.Value;
		this._updateCallback = updateCallback;
		this.CountryCode = CountryInfo[this.Name];

		this.Data = { data: <Array<any>>[], Country: this };
	}

	public IsEqualGroup(resultGroup: any):boolean
	{
		return resultGroup.Value.toString() == this.CodeName.toString();
	}

	public HasData():boolean
	{
		return this.Data.data.length != 0;
	}

	public ClearData():void
	{
		this.Data.data.splice(0);
	}

	public UpdateData(data: IMoodData<any>[], start:Date, end:Date): jquery.flot.dataSeries
	{
		this.ClearData();

		var startNumber = start.getTime();
		var endNumber = end.getTime();

		if (data.length === 0)
			this.Data.data.push([startNumber, 0], [endNumber, 0]);
		else
		{
			if (data[0].DateCreated !== startNumber)
				this.Data.data.push([startNumber, 0]);

			for (var o = 0; o < data.length; o++)
				this.Data.data.push([data[o].DateCreated * 1000, data[o].Valence]);	

			if (data[data.length - 1].DateCreated !== endNumber)
				this.Data.data.push([endNumber, 0]);

			this.CreateMissingPoints(this.Data.data);
		}

		return this.Data;
	}

	public ToggleSelect():void
	{
		this.IsSelected(!this.IsSelected());
		this._updateCallback(this);
	}

	private CreateMissingPoints(data:number[][]):void
	{
		var previous = data[0];
		var current = data[0];

		for (var i = 1; i < data.length; i++)
		{
			previous = current;
			current = data[i];

			if (current[0] - previous[0] > this._dataPointSpacing * 2)
			{
				data.splice(i, 0, [previous[0] + this._dataPointSpacing, 0], [current[0] - this._dataPointSpacing, 0]);

				i += 2;

				if (current[0] - previous[0] > this._dataPointSpacing * 10)
				{
					data.splice(i - 1, 0, [previous[0] + this._dataPointSpacing * 3, 0], [current[0] - this._dataPointSpacing * 3, 0]);

					i += 2;
				}
			}
		}
	}
}

interface IGroup<T>
{
	Value: string;
	Count: number;
	TotalCount: number;
	Results:T[];
}

interface IMoodData<T>
{
	Id?: string;
	Country?: string;
	Valence: number;
	DateCreated: number;
	Tweets?:T[];
}