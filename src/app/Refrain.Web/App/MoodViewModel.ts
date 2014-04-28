declare var twttr:any;

class MoodViewModel implements IPageViewModel
{
	private _map:google.maps.Map;

	constructor()
	{
		
	}

	public Initialize():void
	{
		console.log(document.getElementById('map-canvas'));
		console.log(new google.maps.LatLng(51.5, 13.7));

		this._map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 4,
			center: new google.maps.LatLng(51.5, 13.7),
			disableDefaultUI: true
		});

		// Load GeoJSON.
		(<any>this._map).data.loadGeoJson('Countries.json');

		(<any>this._map).data.setStyle(this.SetCountryStyle);

		twttr.widgets.load();
	}

	public SetCountryStyle(feature:any):any
	{
		var color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
		return {
			fillColor: color,
			strokeColor: color,
			strokeWeight: 1
		};
	}
}