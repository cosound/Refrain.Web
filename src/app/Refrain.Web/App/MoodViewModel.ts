declare var twttr: any;
declare var Chart:any;

class MoodViewModel implements IPageViewModel
{
	public SelectedTweets: KnockoutObservableArray<string> = ko.observableArray<string>();
	public CanShowMoreTweets: KnockoutObservable<boolean> = ko.observable(false);
	public AvailableMoodCountries: KnockoutObservableArray<MoodGraphCountry> = ko.observableArray < MoodGraphCountry>();

	private _map: google.maps.Map;
	private _moodData: { [countryCode: string]: number } = {};
	private _tweets: string[];
	private _chart: any;
	private _graphData: any;
	private _graphColors: string[] = ["#f5f5c8", "#ff0000", "#f368c0", "#d20935", "#88f7c0", "#5b1c2d", "#b9f30d", "#ffdc8d", "#250792", "#ac2208"];
	private _graphPointPerDay: number = 400;

	private _updateHandler: number = null;

	constructor()
	{
		
	}

	public Initialize():void
	{
		var mapStyle = [{ "featureType": "road", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#fffffa" }] }, { "featureType": "water", "stylers": [{ "lightness": 50 }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "lightness": 40 }] }];

		this._map = new google.maps.Map(document.getElementById('map-canvas'), {
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
		var context = (<HTMLCanvasElement>$("#MoodTimelineGraph").get(0)).getContext("2d");
		this._chart = new Chart(context);

		this._graphData = {};
		this._graphData.labels = new Array<String>();

		for (var i = 0; i < this._graphPointPerDay; i++)
		{
			this._graphData.labels.push("");
		}
	}

	private InitializeGraphCountries(groups: any[]): void
	{
		if (this.AvailableMoodCountries().length != 0) return;

		for (var i = 0; i < groups.length; i++)
			this.AvailableMoodCountries.push(new MoodGraphCountry(groups[i], (country) => this.CountrySelectToggled(country)));

		this.AvailableMoodCountries.sort((a, b) => a.Name.localeCompare(b.Name));

		for (i = 0; i < 3; i++)
		{
			var country = this.AvailableMoodCountries()[Math.floor(Math.random() * this.AvailableMoodCountries().length)];

			if (country.IsSelected())
				i--;
			else
			{
				this.SetColorOnCountry(country);
				country.IsSelected(true);
			}
		}

		this.UpdateGraph();
	}

	public Dispose(): void
	{
		if (this._updateHandler != null) clearInterval(this._updateHandler);
	}

	public PortalReady(): void
	{
		this.Update();

		this._updateHandler = setInterval(() => this.Update(), 5 * 60 * 1000);
	}

	private GetGraphData(countries:MoodGraphCountry[]):void
	{
		if (countries.length == 0) return;

		var before = new Date("2014-05-06");
		var after = new Date("2014-05-06");
		after.setDate(before.getDate() - 1);

		RefrainPortal.TwitterMood.Get(countries.map((v, i) => v.CodeName), before, after, this._graphPointPerDay).WithCallback(r => this.TwitterMoodGraphCompleted(r, countries), this);
	}

	private Update():void
	{
		RefrainPortal.TwitterMood.Get().WithCallback(this.TwitterMoodGetCompleted, this);
		RefrainPortal.Tweet.Get().WithCallback(this.TweetGetCompleted, this);
	}

	private TwitterMoodGraphCompleted(response: CHAOS.Portal.Client.IPortalResponse<any>, countries: MoodGraphCountry[]): void
	{
		if (response.Error != null)
		{
			console.log("Failed to get Twitter mood: " + response.Error.Message);
			return;
		}

		var groups = <any[]>(<any>response.Body).Groups;

		for (var i:number = 0; i < groups.length; i++)
		{
			for (var o:number = 0; o < countries.length; o++)
			{
				if (!countries[o].IsEqualGroup(groups[i])) continue;

				countries[o].UpdateData(groups[i]);
				break;
			}
		}

		this.UpdateGraph(true);
	}

	private CountrySelectToggled(country:MoodGraphCountry):void
	{
		if (country.IsSelected())
			this.SetColorOnCountry(country);
		else
			this._graphColors.unshift(country.Color());

		this.UpdateGraph();
	}

	private SetColorOnCountry(country:MoodGraphCountry):void
	{
		if (this._graphColors.length == 0)
			country.Color('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
		else
			country.Color(this._graphColors.shift());
	}

	private UpdateGraph(preventLoop:boolean = false):void
	{
		this._graphData.datasets = new Array<any>();
		var country:MoodGraphCountry;
		var missingData:MoodGraphCountry[] = [];

		for (var i = 0; i < this.AvailableMoodCountries().length; i++)
		{
			country = this.AvailableMoodCountries()[i];
			if (country.IsSelected())
			{
				if (country.HasData())
					this._graphData.datasets.push(this.AvailableMoodCountries()[i].DataSet);
				else
					missingData.push(country);
			}
		}

		if(!preventLoop)
			this.GetGraphData(missingData);

		this._chart.Line(this._graphData, {
			scaleOverride: true,
			scaleSteps: 8,
			scaleStepWidth: 0.25,
			scaleStartValue: -1,
			scaleShowLabels: false,
			scaleFontColor: "#fff",
			scaleLineColor: "#fff",
			scaleShowGridLines: false,
			pointDot: false,
			datasetFill: false,
			animation: false
		});
	}

	private TwitterMoodGetCompleted(response: CHAOS.Portal.Client.IPortalResponse<any>):void
	{
		if (response.Error != null)
		{
			console.log("Failed to get Twitter mood: " + response.Error.Message);
			return;
		}

		var groups = <any[]>(<any>response.Body).Groups;

		for (var i = 0; i < groups.length; i++)
			this._moodData[MoodViewModel.Capitalize(<string>groups[i].Value)] = groups[i].Results[0].Valence;

		(<any>this._map).data.setStyle((f: any) => this.SetCountryStyle(f));

		this.InitializeGraphCountries(groups);
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
		twttr.widgets.load(document.getElementById("MoodTweets"));
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
		if (this._moodData[feature.j.name] == null)
			return { visible: false };

		var mood = this._moodData[feature.j.name];

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

	public DataSet: any;

	public IsSelected: KnockoutObservable<boolean> = ko.observable(false);

	private _updateCallback: (country: MoodGraphCountry) => void;

	constructor(resultGroup: any, updateCallback: (country: MoodGraphCountry) => void)
	{
		this.Name = MoodViewModel.Capitalize(resultGroup.Value);
		this.CodeName = resultGroup.Value;
		this._updateCallback = updateCallback;
		this.CountryCode = CountryInfo[this.Name];

		this.DataSet = {};
		this.DataSet.data = new Array<number>();

		this.Color.subscribe((value: string) => this.DataSet.strokeColor = value);
	}

	public IsEqualGroup(resultGroup: any):boolean
	{
		return resultGroup.Value.toString() == this.CodeName.toString();
	}

	public HasData():boolean
	{
		return this.DataSet.data.length != 0;
	}

	public UpdateData(resultGroup:any):void
	{
		this.DataSet.data.splice(0);

		for (var o = 0; o < resultGroup.Results.length; o++)
			this.DataSet.data.push(resultGroup.Results[o].Valence);
	}

	public ToggleSelect():void
	{
		this.IsSelected(!this.IsSelected());
		this._updateCallback(this);
	}
}