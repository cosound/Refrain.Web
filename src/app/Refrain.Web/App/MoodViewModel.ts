declare var twttr: any;

class MoodViewModel implements IPageViewModel
{
	public SelectedTweets: KnockoutObservableArray<string> = ko.observableArray<string>();
	public CanShowMoreTweets:KnockoutObservable<boolean> = ko.observable(false);

	private _map: google.maps.Map;
	private _moodData: { [countryCode: string]: number } = {};
	private _tweets:string[];

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
	}

	private Update():void
	{
		RefrainPortal.TwitterMood.Get().WithCallback(this.TwitterMoodGetCompleted, this);
		RefrainPortal.Tweet.Get().WithCallback(this.TweetGetCompleted, this);
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
			this._moodData[this.Capitalize(<string>groups[i].Value)] = groups[i].Results[0].Valence;

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

	private Capitalize(country:string):string
	{
		return country.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); })
	}

	private SetCountryStyle(feature:any):any
	{
		var mood = 0;

		if (this._moodData[feature.j.name] != null)
			mood = this._moodData[feature.j.name];

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