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
	private _graphData:any;

	private _updateHandler:number = null;

	constructor()
	{
		
	}

	public Initialize():void
	{
		this._map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 4,
			center: new google.maps.LatLng(51.5, 13.7),
			disableDefaultUI: true
		});

		(<any>this._map).data.loadGeoJson('Countries.json');
	}

	public Dispose(): void
	{
		if (this._updateHandler != null) clearInterval(this._updateHandler);
	}

	public PortalReady(): void
	{
		this.Update();

		this._updateHandler = setInterval(() => this.Update(), 5 * 60 * 1000);

		var start = new Date();
		var end = new Date();
		end.setDate(start.getDate() - 1);

		RefrainPortal.TwitterMood.Get(null,start, end, 24 * 60 / 5).WithCallback(this.TwitterMoodGraphCompleted, this);
	}

	private Update():void
	{
		RefrainPortal.TwitterMood.Get().WithCallback(this.TwitterMoodGetCompleted, this);
		RefrainPortal.Tweet.Get().WithCallback(this.TweetGetCompleted, this);
	}

	private TwitterMoodGraphCompleted(response: CHAOS.Portal.Client.IPortalResponse<any>): void
	{
		if (response.Error != null)
		{
			console.log("Failed to get Twitter mood: " + response.Error.Message);
			return;
		}

		var groups = <any[]>(<any>response.Body).Groups;
		this._graphData = {};
		this._graphData.labels = new Array<String>();

		for (var i = 0; i < groups.length; i++)
		{
			this.AvailableMoodCountries.push(new MoodGraphCountry(groups[i], () => this.UpdateGraph()));
			
			if (i == 0)
			{
				for (var o = 0; o < groups[i].Results.length; o++)
					this._graphData.labels.push("");
			}
		}

		this.AvailableMoodCountries.sort((a, b) => a.Name.localeCompare(b.Name));

		for (i = 0; i < 3; i++)
		{
			var country = this.AvailableMoodCountries()[Math.floor(Math.random() * this.AvailableMoodCountries().length)];

			if (country.IsSelected())
				i--;
			else
				country.IsSelected(true);
		}

		var context = (<HTMLCanvasElement>$("#MoodTimelineGraph").get(0)).getContext("2d");
		this._chart = new Chart(context);

		this.UpdateGraph();
	}

	private UpdateGraph():void
	{
		this._graphData.datasets  = new Array<any>();

		for (var i = 0; i < this.AvailableMoodCountries().length; i++)
		{
			if (this.AvailableMoodCountries()[i].IsSelected())
				this._graphData.datasets .push(this.AvailableMoodCountries()[i].DataSet);
		}

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

		(<any>this._map).data.setStyle((f:any) => this.SetCountryStyle(f));
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
		return country.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
	}

	private SetCountryStyle(feature:any):any
	{
		if (this._moodData[feature.j.name] == null)
			return {visible: false};

		var mood = this._moodData[feature.j.name];
		var color = '#' + this.HexFromRGBRatio(1 - (mood + 1) / 2, (mood + 1) / 2, 0);

		return {
			fillColor: color,
			strokeColor: color,
			strokeWeight: 1
		};
	}

	private HexFromRGBRatio(r: number, g: number, b: number)
	{
		var hex = [
			Math.floor(r * 255).toString(16),
			Math.floor(g * 255).toString(16),
			Math.floor(b * 255).toString(16)
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
	public CountryCode:string;
	public Color: string;

	public DataSet: any;

	public IsSelected: KnockoutObservable<boolean> = ko.observable(false);

	private _updateCallback:()=>void;

	constructor(resultGroup:any, updateCallback:()=>void)
	{
		this.Name = MoodViewModel.Capitalize(resultGroup.Value);
		this.Color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
		this._updateCallback = updateCallback;
		this.CountryCode = CountryInfo[this.Name];

		this.DataSet = {};

		this.DataSet.strokeColor = this.Color;
		this.DataSet.data = new Array<number>();

		for (var o = 0; o < resultGroup.Results.length; o++)
			this.DataSet.data.push(resultGroup.Results[o].Valence);
	}

	public ToggleSelect():void
	{
		this.IsSelected(!this.IsSelected());
		this._updateCallback();
	}
}