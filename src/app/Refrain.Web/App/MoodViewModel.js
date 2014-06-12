var MoodViewModel = (function () {
    function MoodViewModel() {
        this.SelectedTweets = ko.observableArray();
        this.CanShowMoreTweets = ko.observable(false);
        this.AvailableMoodCountries = ko.observableArray();
        this.MoodGraphCurrentTime = ko.observable(new Date(2014, 4, 6, 6, 0));
        this.MoodMapCurrentTime = ko.observable(new Date(2014, 4, 6, 18, 0));
        this._moodData = {};
        this._updateHandler = null;
    }
    MoodViewModel.prototype.Initialize = function () {
        var mapStyle = [{ "featureType": "road", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#fffffa" }] }, { "featureType": "water", "stylers": [{ "lightness": 50 }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "lightness": 40 }] }];

        this._map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 4,
            center: new google.maps.LatLng(51.5, 13.7),
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: mapStyle
        });

        this._map.data.loadGeoJson('Countries.json');

        this.InitializeGraph();
    };

    MoodViewModel.prototype.InitializeGraph = function () {
        this._graphData = [];
        this._graphOptions = {
            lines: {
                show: true
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
                drawSeries: [function (p, c, s) {
                        return s.Country.Color(s.color);
                    }]
            },
            zoom: {
                interactive: true
            },
            pan: {
                interactive: true
            }
        };
    };

    MoodViewModel.prototype.GetPanXRange = function () {
        var min = this.MoodGraphCurrentTime().getTime();

        return [min, min + 24 * 60 * 60 * 1000];
    };

    MoodViewModel.prototype.InitializeGraphCountries = function (groups) {
        var _this = this;
        if (this.AvailableMoodCountries().length != 0)
            return;

        for (var i = 0; i < groups.length; i++)
            this.AvailableMoodCountries.push(new MoodGraphCountry(groups[i], function (country) {
                return _this.CountrySelectToggled(country);
            }));

        this.AvailableMoodCountries.sort(function (a, b) {
            return a.Name.localeCompare(b.Name);
        });

        var selectedCountries = [];

        for (i = 0; i < 3; i++) {
            var country = this.AvailableMoodCountries()[Math.floor(Math.random() * this.AvailableMoodCountries().length)];

            if (country.IsSelected())
                i--;
            else {
                country.IsSelected(true);
                selectedCountries.push(country);
            }
        }

        this.GetGraphData(selectedCountries);
    };

    MoodViewModel.prototype.Dispose = function () {
        if (this._updateHandler != null)
            clearInterval(this._updateHandler);
    };

    MoodViewModel.prototype.PortalReady = function () {
        var _this = this;
        this.Update();

        this.MoodMapCurrentTime.subscribe(function (v) {
            return _this.UpdateMoodMap();
        });

        RefrainPortal.TwitterMood.Get().WithCallback(this.TwitterMoodGetForGraphCountriesCompleted, this);
    };

    MoodViewModel.prototype.MoodMapNext = function () {
        this.MoodMapCurrentTime().setMinutes(this.MoodMapCurrentTime().getMinutes() + 5);

        this.MoodMapCurrentTime(this.MoodMapCurrentTime());
    };

    MoodViewModel.prototype.MoodMapNextBig = function () {
        this.MoodMapCurrentTime().setHours(this.MoodMapCurrentTime().getHours() + 6);

        this.MoodMapCurrentTime(this.MoodMapCurrentTime());
    };

    MoodViewModel.prototype.MoodMapPrevious = function () {
        this.MoodMapCurrentTime().setMinutes(this.MoodMapCurrentTime().getMinutes() - 5);

        this.MoodMapCurrentTime(this.MoodMapCurrentTime());
    };

    MoodViewModel.prototype.MoodMapPreviousBig = function () {
        this.MoodMapCurrentTime().setHours(this.MoodMapCurrentTime().getHours() - 6);

        this.MoodMapCurrentTime(this.MoodMapCurrentTime());
    };

    MoodViewModel.prototype.MoodGraphPrevious = function () {
        this.MoodGraphCurrentTime().setDate(this.MoodGraphCurrentTime().getDate() - 1);

        this.MoodGraphCurrentTime(this.MoodGraphCurrentTime());

        this.RefreshGraphData();
    };

    MoodViewModel.prototype.MoodGraphNext = function () {
        this.MoodGraphCurrentTime().setDate(this.MoodGraphCurrentTime().getDate() + 1);

        this.MoodGraphCurrentTime(this.MoodGraphCurrentTime());

        this.RefreshGraphData();
    };

    MoodViewModel.prototype.GetGraphData = function (countries) {
        var _this = this;
        if (countries.length == 0)
            return;

        var start = this.MoodGraphCurrentTime();
        var end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

        RefrainPortal.TwitterMood.Get(countries.map(function (v, i) {
            return v.CodeName;
        }), start, end, 999).WithCallback(function (r) {
            return _this.TwitterMoodGraphCompleted(r, countries);
        }, this);
    };

    MoodViewModel.prototype.Update = function () {
        this.UpdateMoodMap();
        RefrainPortal.Tweet.Get().WithCallback(this.TweetGetCompleted, this);
    };

    MoodViewModel.prototype.UpdateMoodMap = function () {
        RefrainPortal.TwitterMood.Get(null, this.MoodMapCurrentTime()).WithCallback(this.TwitterMoodGetCompleted, this);
    };

    MoodViewModel.prototype.TwitterMoodGraphCompleted = function (response, countries) {
        if (response.Error != null) {
            console.log("Failed to get Twitter mood: " + response.Error.Message);
            return;
        }

        var groups = response.Body.Groups;

        for (var i = 0; i < groups.length; i++) {
            for (var o = 0; o < countries.length; o++) {
                if (!countries[o].IsEqualGroup(groups[i]))
                    continue;

                if (countries[o].HasData())
                    countries[o].UpdateData(groups[i]);
                else
                    this._graphData.push(countries[o].UpdateData(groups[i]));

                break;
            }
        }

        this.UpdateGraph();
    };

    MoodViewModel.prototype.CountrySelectToggled = function (country) {
        if (country.IsSelected()) {
            if (country.HasData()) {
                this._graphData.push(country.Data);

                this.UpdateGraph();
            } else
                this.GetGraphData([country]);
        } else {
            for (var i = 0; i < this._graphData.length; i++) {
                if (this._graphData[i].Country != country)
                    continue;

                this._graphData.splice(i, 1);
                break;
            }

            this.UpdateGraph();
        }
    };

    MoodViewModel.prototype.RefreshGraphData = function () {
        var countries = [];
        var country;

        this._graphOptions.xaxis.panRange = this.GetPanXRange();

        for (var i = 0; i < this.AvailableMoodCountries().length; i++) {
            country = this.AvailableMoodCountries()[i];

            if (country.IsSelected())
                countries.push(country);
            else
                country.ClearData();
        }

        this.GetGraphData(countries);
    };

    MoodViewModel.prototype.UpdateGraph = function () {
        $.plot("#MoodTimelineGraph", this._graphData, this._graphOptions);
    };

    MoodViewModel.prototype.TwitterMoodGetCompleted = function (response) {
        var _this = this;
        if (response.Error != null) {
            console.log("Failed to get Twitter mood: " + response.Error.Message);
            return;
        }

        var groups = response.Body.Groups;

        for (var i = 0; i < groups.length; i++)
            this._moodData[MoodViewModel.Capitalize(groups[i].Value)] = groups[i].Results[0].Valence;

        this._map.data.setStyle({});
        this._map.data.setStyle(function (f) {
            return _this.SetCountryStyle(f);
        });
    };

    MoodViewModel.prototype.TwitterMoodGetForGraphCountriesCompleted = function (response) {
        if (response.Error != null) {
            console.log("Failed to get Twitter mood: " + response.Error.Message);
            return;
        }

        this.InitializeGraphCountries(response.Body.Groups);
    };

    MoodViewModel.prototype.TweetGetCompleted = function (response) {
        if (response.Error != null) {
            console.log("Failed to get Twitter mood: " + response.Error.Message);
            return;
        }

        this._tweets = [];
        this.SelectedTweets.removeAll();

        var groups = response.Body.Groups;
        var group;

        for (var i = 0; i < groups.length; i++) {
            group = groups[i];

            if (group.Results == null || group.Results.lenght == 0)
                continue;

            for (var o = 0; o < group.Results.length; o++)
                this._tweets.push(group.Results[o].EmbedCode);
        }

        this.ShowMoreTweets();
    };

    MoodViewModel.prototype.ShowMoreTweets = function () {
        for (var i = 0; i < 5 && this._tweets.length > 0; i++)
            this.SelectedTweets.push(this.GetTweetEmbed(this._tweets.shift()));

        this.CanShowMoreTweets(this._tweets.length != 0);
        twttr.widgets.load(document.getElementById("MoodTweets"));
    };

    MoodViewModel.prototype.GetTweetEmbed = function (rawCode) {
        var code = decodeURIComponent(rawCode.replace(/\+/g, '%20'));
        return code.substring(code.indexOf("<blockquote"), code.indexOf("</blockquote>") + 12);
    };

    MoodViewModel.Capitalize = function (country) {
        return country.replace("_", " ").replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    };

    MoodViewModel.prototype.SetCountryStyle = function (feature) {
        if (this._moodData[feature.j.name] == null)
            return { visible: false };

        var mood = this._moodData[feature.j.name];

        var color = "#" + (mood < 0 ? this.HexFromRGB(255 + 51 * mood, 255 + 255 * mood, 255 + 102 * mood) : this.HexFromRGB(255 - 255 * mood, 255 - 102 * mood, 255 - 255 * mood));

        return {
            fillColor: color,
            strokeColor: color,
            strokeWeight: 1
        };
    };

    MoodViewModel.prototype.HexFromRGB = function (r, g, b) {
        var hex = [
            Math.floor(r).toString(16),
            Math.floor(g).toString(16),
            Math.floor(b).toString(16)
        ];
        $.each(hex, function (nr, val) {
            if (val.length === 1)
                hex[nr] = "0" + val;
        });

        return hex.join("").toUpperCase();
    };
    return MoodViewModel;
})();

var MoodGraphCountry = (function () {
    function MoodGraphCountry(resultGroup, updateCallback) {
        this.Color = ko.observable();
        this.IsSelected = ko.observable(false);
        this.Name = MoodViewModel.Capitalize(resultGroup.Value);
        this.CodeName = resultGroup.Value;
        this._updateCallback = updateCallback;
        this.CountryCode = CountryInfo[this.Name];

        this.Data = { data: [], Country: this };
    }
    MoodGraphCountry.prototype.IsEqualGroup = function (resultGroup) {
        return resultGroup.Value.toString() == this.CodeName.toString();
    };

    MoodGraphCountry.prototype.HasData = function () {
        return this.Data.data.length != 0;
    };

    MoodGraphCountry.prototype.ClearData = function () {
        this.Data.data.splice(0);
    };

    MoodGraphCountry.prototype.UpdateData = function (resultGroup) {
        this.ClearData();

        for (var o = 0; o < resultGroup.Results.length; o++)
            this.Data.data.push([resultGroup.Results[o].DateCreated * 1000, resultGroup.Results[o].Valence]);

        return this.Data;
    };

    MoodGraphCountry.prototype.ToggleSelect = function () {
        this.IsSelected(!this.IsSelected());
        this._updateCallback(this);
    };
    return MoodGraphCountry;
})();
