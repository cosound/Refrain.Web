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
var Match = (function () {
    function Match(title, selectCallback) {
        this.IsSelected = ko.observable(false);
        this.Title = title;
        this._selectCallback = selectCallback;
    }
    Match.prototype.Select = function () {
        this._selectCallback(this);
        this.IsSelected(true);

        return false;
    };
    return Match;
})();
var MatchViewModel = (function () {
    function MatchViewModel() {
        var _this = this;
        this.Query = ko.observable("");
        this.Matches = ko.observableArray();
        this.SelectedMatch = ko.observable();
        this.Query.subscribe(function (v) {
            return _this.QueryChanged(v);
        });
    }
    MatchViewModel.prototype.Initialize = function () {
    };

    MatchViewModel.prototype.QueryChanged = function (newValue) {
        var _this = this;
        clearTimeout(this._queryDelayHandle);

        this._queryDelayHandle = setTimeout(function () {
            return _this.Search(newValue);
        }, 1000);
    };

    MatchViewModel.prototype.Search = function (value) {
        var _this = this;
        this.Matches.removeAll();

        for (var i = 0; i < 5; i++) {
            this.Matches.push(new Match(value + i, function (m) {
                return _this.Select(m);
            }));
        }
    };

    MatchViewModel.prototype.Select = function (match) {
        if (this.SelectedMatch() != null)
            this.SelectedMatch().IsSelected(false);

        this.SelectedMatch(match);
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
