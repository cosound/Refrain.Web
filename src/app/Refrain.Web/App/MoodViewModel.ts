declare var twttr: any;

class MoodViewModel implements IPageViewModel
{
	private _map: google.maps.Map;
	private _moodData: { [countryCode: string]: number } = {};

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

	public PortalReady(): void
	{
		RefrainPortal.TwitterMood.Get().WithCallback(this.TwitterMoodGetCompleted, this);
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

	private Capitalize(country:string):string
	{
		return country.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); })
	}

	private SetCountryStyle(feature:any):any
	{
		//var color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);

		var mood = 1;

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