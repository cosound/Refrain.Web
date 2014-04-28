var MoodViewModel = (function () {
    function MoodViewModel() {
    }
    MoodViewModel.prototype.Initialize = function () {
        console.log(document.getElementById('map-canvas'));
        console.log(new google.maps.LatLng(51.5, 13.7));

        this._map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 4,
            center: new google.maps.LatLng(51.5, 13.7),
            disableDefaultUI: true
        });

        this._map.data.loadGeoJson('Countries.json');

        this._map.data.setStyle(this.SetCountryStyle);

        twttr.widgets.load();
    };

    MoodViewModel.prototype.SetCountryStyle = function (feature) {
        var color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
        return {
            fillColor: color,
            strokeColor: color,
            strokeWeight: 1
        };
    };
    return MoodViewModel;
})();
