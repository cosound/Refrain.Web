var AboutViewModel = (function () {
    function AboutViewModel() {
    }
    AboutViewModel.prototype.Initialize = function () {
    };
    return AboutViewModel;
})();
var DiscoveryViewModel = (function () {
    function DiscoveryViewModel() {
    }
    DiscoveryViewModel.prototype.Initialize = function () {
    };
    return DiscoveryViewModel;
})();
var HomeViewModel = (function () {
    function HomeViewModel() {
    }
    HomeViewModel.prototype.Initialize = function () {
    };
    return HomeViewModel;
})();
var MainViewModel = (function () {
    function MainViewModel() {
        var _this = this;
        this.CurrentPage = ko.observable();
        this.CurrentPageViewModel = ko.observable();
        $(window).bind("hashchange", function (e) {
            return _this.HashChange();
        });
        this.HashChange();
    }
    MainViewModel.prototype.HashChange = function () {
        var hash = window.location.hash.length == 0 ? "" : window.location.hash.substr(1);

        var page = hash;

        this.CurrentPage(null);

        switch (page) {
            case "":
                this.CurrentPageViewModel(new HomeViewModel());
                break;
            case "Match":
                this.CurrentPageViewModel(new MatchViewModel());
                break;
            case "Mood":
                this.CurrentPageViewModel(new MoodViewModel());
                break;
            case "Discovery":
                this.CurrentPageViewModel(new DiscoveryViewModel());
                break;
            case "About":
                this.CurrentPageViewModel(new AboutViewModel());
                break;
            default:
                this.CurrentPageViewModel(new HomeViewModel());
        }

        this.CurrentPage(page);

        if (this.CurrentPageViewModel() != null)
            this.CurrentPageViewModel().Initialize();
    };
    return MainViewModel;
})();
var MatchViewModel = (function () {
    function MatchViewModel() {
    }
    MatchViewModel.prototype.Initialize = function () {
    };
    return MatchViewModel;
})();
var MoodViewModel = (function () {
    function MoodViewModel() {
    }
    MoodViewModel.prototype.Initialize = function () {
        this._map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 4,
            center: new google.maps.LatLng(51.5, 13.7),
            disableDefaultUI: true
        });

        this._map.data.loadGeoJson('Countries.json');
        this._map.data.setStyle(this.SetCountryStyle);

        twttr.ready(function () {
            return twttr.widgets.load();
        });
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
//# sourceMappingURL=Refrain.js.map
