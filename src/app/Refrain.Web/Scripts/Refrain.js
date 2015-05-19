var AboutViewModel = (function () {
    function AboutViewModel() {
    }
    AboutViewModel.prototype.Initialize = function () {
    };
    AboutViewModel.prototype.PortalReady = function () {
    };
    AboutViewModel.prototype.Dispose = function () {
    };
    return AboutViewModel;
})();
var CountryInfo = { "Afghanistan": "af", "Åland Islands": "ax", "Albania": "al", "Algeria": "dz", "American Samoa": "as", "Andorra": "ad", "Angola": "ao", "Anguilla": "ai", "Antarctica": "aq", "Antigua and Barbuda": "ag", "Argentina": "ar", "Armenia": "am", "Aruba": "aw", "Australia": "au", "Austria": "at", "Azerbaijan": "az", "Bahamas": "bs", "Bahrain": "bh", "Bangladesh": "bd", "Barbados": "bb", "Belarus": "by", "Belgium": "be", "Belize": "bz", "Benin": "bj", "Bermuda": "bm", "Bhutan": "bt", "Bolivia, Plurinational State of": "bo", "Bonaire, Sint Eustatius and Saba": "bq", "Bosnia and Herzegovina": "ba", "Botswana": "bw", "Bouvet Island": "bv", "Brazil": "br", "British Indian Ocean Territory": "io", "Brunei Darussalam": "bn", "Bulgaria": "bg", "Burkina Faso": "bf", "Burundi": "bi", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Cape Verde": "cv", "Cayman Islands": "ky", "Central African Republic": "cf", "Chad": "td", "Chile": "cl", "China": "cn", "Christmas Island": "cx", "Cocos (Keeling) Islands": "cc", "Colombia": "co", "Comoros": "km", "Congo": "cg", "Congo, the Democratic Republic of the": "cd", "Cook Islands": "ck", "Costa Rica": "cr", "Côte d'Ivoire": "ci", "Croatia": "hr", "Cuba": "cu", "Curaçao": "cw", "Cyprus": "cy", "Czech Republic": "cz", "Denmark": "dk", "Djibouti": "dj", "Dominica": "dm", "Dominican Republic": "do", "Ecuador": "ec", "Egypt": "eg", "El Salvador": "sv", "Equatorial Guinea": "gq", "Eritrea": "er", "Estonia": "ee", "Ethiopia": "et", "Falkland Islands (Malvinas)": "fk", "Faroe Islands": "fo", "Fiji": "fj", "Finland": "fi", "France": "fr", "French Guiana": "gf", "French Polynesia": "pf", "French Southern Territories": "tf", "Gabon": "ga", "Gambia": "gm", "Georgia": "ge", "Germany": "de", "Ghana": "gh", "Gibraltar": "gi", "Greece": "gr", "Greenland": "gl", "Grenada": "gd", "Guadeloupe": "gp", "Guam": "gu", "Guatemala": "gt", "Guernsey": "gg", "Guinea": "gn", "Guinea-Bissau": "gw", "Guyana": "gy", "Haiti": "ht", "Heard Island and McDonald Islands": "hm", "Holy See (Vatican City State)": "va", "Honduras": "hn", "Hong Kong": "hk", "Hungary": "hu", "Iceland": "is", "India": "in", "Indonesia": "id", "Iran, Islamic Republic of": "ir", "Iraq": "iq", "Ireland": "ie", "Isle of Man": "im", "Israel": "il", "Italy": "it", "Jamaica": "jm", "Japan": "jp", "Jersey": "je", "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke", "Kiribati": "ki", "Korea, Democratic People's Republic of": "kp", "Korea, Republic of": "kr", "Kuwait": "kw", "Kyrgyzstan": "kg", "Lao People's Democratic Republic": "la", "Latvia": "lv", "Lebanon": "lb", "Lesotho": "ls", "Liberia": "lr", "Libya": "ly", "Liechtenstein": "li", "Lithuania": "lt", "Luxembourg": "lu", "Macao": "mo", "Macedonia": "mk", "Madagascar": "mg", "Malawi": "mw", "Malaysia": "my", "Maldives": "mv", "Mali": "ml", "Malta": "mt", "Marshall Islands": "mh", "Martinique": "mq", "Mauritania": "mr", "Mauritius": "mu", "Mayotte": "yt", "Mexico": "mx", "Micronesia, Federated States of": "fm", "Moldova": "md", "Monaco": "mc", "Mongolia": "mn", "Montenegro": "me", "Montserrat": "ms", "Morocco": "ma", "Mozambique": "mz", "Myanmar": "mm", "Namibia": "na", "Nauru": "nr", "Nepal": "np", "Netherlands": "nl", "New Caledonia": "nc", "New Zealand": "nz", "Nicaragua": "ni", "Niger": "ne", "Nigeria": "ng", "Niue": "nu", "Norfolk Island": "nf", "Northern Mariana Islands": "mp", "Norway": "no", "Oman": "om", "Pakistan": "pk", "Palau": "pw", "Palestine, State of": "ps", "Panama": "pa", "Papua New Guinea": "pg", "Paraguay": "py", "Peru": "pe", "Philippines": "ph", "Pitcairn": "pn", "Poland": "pl", "Portugal": "pt", "Puerto Rico": "pr", "Qatar": "qa", "Réunion": "re", "Romania": "ro", "Russia": "ru", "Rwanda": "rw", "Saint Barthélemy": "bl", "Saint Helena, Ascension and Tristan da Cunha": "sh", "Saint Kitts and Nevis": "kn", "Saint Lucia": "lc", "Saint Martin (French part)": "mf", "Saint Pierre and Miquelon": "pm", "Saint Vincent and the Grenadines": "vc", "Samoa": "ws", "San Marino": "sm", "Sao Tome and Principe": "st", "Saudi Arabia": "sa", "Senegal": "sn", "Serbia": "rs", "Serbia and Montenegro": "cs", "Seychelles": "sc", "Sierra Leone": "sl", "Singapore": "sg", "Sint Maarten (Dutch part)": "sx", "Slovakia": "sk", "Slovenia": "si", "Solomon Islands": "sb", "Somalia": "so", "South Africa": "za", "South Georgia and the South Sandwich Islands": "gs", "South Sudan": "ss", "Spain": "es", "Sri Lanka": "lk", "Sudan": "sd", "Suriname": "sr", "Svalbard and Jan Mayen": "sj", "Swaziland": "sz", "Sweden": "se", "Switzerland": "ch", "Syrian Arab Republic": "sy", "Taiwan, Province of China": "tw", "Tajikistan": "tj", "Tanzania, United Republic of": "tz", "Thailand": "th", "Timor-Leste": "tl", "Togo": "tg", "Tokelau": "tk", "Tonga": "to", "Trinidad and Tobago": "tt", "Tunisia": "tn", "Turkey": "tr", "Turkmenistan": "tm", "Turks and Caicos Islands": "tc", "Tuvalu": "tv", "Uganda": "ug", "Ukraine": "ua", "United Arab Emirates": "ae", "United Kingdom": "gb", "United States": "us", "United States Minor Outlying Islands": "um", "Uruguay": "uy", "Uzbekistan": "uz", "Vanuatu": "vu", "Venezuela, Bolivarian Republic of": "ve", "Viet Nam": "vn", "Virgin Islands, British": "vg", "Virgin Islands, U.S.": "vi", "Wallis and Futuna": "wf", "Western Sahara": "eh", "Yemen": "ye", "Yugoslavia": "yu", "Zambia": "zm", "Zimbabwe": "zw" };
var DiscoveryViewModel = (function () {
    function DiscoveryViewModel() {
    }
    DiscoveryViewModel.prototype.Initialize = function () {
        twttr.ready(function () {
            try {
                twttr.widgets.load();
            }
            catch (error) {
                console.log("Twitter caused an error: " + error.message);
            }
        });
    };
    DiscoveryViewModel.prototype.PortalReady = function () {
    };
    DiscoveryViewModel.prototype.Dispose = function () {
    };
    return DiscoveryViewModel;
})();
var HomeViewModel = (function () {
    function HomeViewModel() {
    }
    HomeViewModel.prototype.Initialize = function () {
    };
    HomeViewModel.prototype.PortalReady = function () {
    };
    HomeViewModel.prototype.Dispose = function () {
    };
    return HomeViewModel;
})();
var MainViewModel = (function () {
    function MainViewModel() {
        var _this = this;
        this.CurrentPage = ko.observable();
        this.CurrentPageViewModel = ko.observable();
        this._client = CHAOS.Portal.Client.Initialize("http://api.refrain.dk/");
        twttr.ready(function () {
            try {
                twttr.events.bind('tweet', function (ev) { return _this.LogTweet(ev); });
            }
            catch (error) {
                console.log("Twitter caused an error: " + error.message);
            }
        });
        $(window).bind("hashchange", function (e) { return _this.HashChange(); });
        this.HashChange();
    }
    MainViewModel.prototype.LogTweet = function (event) {
        ga('send', 'event', 'Share', 'Twitter', window.location.hash);
    };
    MainViewModel.prototype.HashChange = function () {
        var _this = this;
        var hash = window.location.hash.length == 0 ? [""] : window.location.hash.substr(1).split("/");
        var page = hash.shift();
        ga('send', 'pageview', { 'page': "/" + window.location.hash });
        if (page == this.CurrentPage())
            return;
        if (this.CurrentPageViewModel() != null)
            this.CurrentPageViewModel().Dispose();
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
        if (this.CurrentPageViewModel() != null) {
            this.CurrentPageViewModel().Initialize.apply(this.CurrentPageViewModel(), hash);
            if (this._client.HasSession())
                this.CurrentPageViewModel().PortalReady();
            else
                this._client.SessionAcquired().Add(function (h) { return _this.CurrentPageViewModel().PortalReady(); });
        }
    };
    return MainViewModel;
})();
var Match = (function () {
    function Match(match, selector) {
        this.CountryName = null;
        this.CountryCode = null;
        this.Year = null;
        this.YoutubeUri = null;
        this.SpotifyId = null;
        this.IsSelected = ko.observable(false);
        this.Id = match.Id;
        this.Title = match.Text;
        this.Artist = match.ArtistName;
        this.CountryName = match.CountryName;
        this.CountryCode = CountryInfo[match.CountryName];
        this.Year = match.ContestYear;
        if (match.YoutubeUri)
            this.YoutubeUri = match.YoutubeUri;
        if (match.SpotifyId)
            this.SpotifyId = match.SpotifyId;
        this._selector = selector;
    }
    Match.prototype.Select = function () {
        if (!this.IsSelected())
            this._selector.SelectMatch(this);
        return false;
    };
    return Match;
})();
var MatchViewModel = (function () {
    function MatchViewModel() {
        var _this = this;
        this.Query = ko.observable("");
        this.Matches = ko.observableArray();
        this.ExtraMatches = ko.observableArray();
        this.SelectedMatch = ko.observable();
        this.SelectedSong = ko.observable();
        this.SelectedSimilarity = ko.observable();
        this.SelectedOldSimilarity = ko.observable();
        this.SelectedSongSimilarity = ko.computed(function () { return _this.SelectedSimilarity() ? _this.SelectedSimilarity() : _this.SelectedOldSimilarity() ? _this.SelectedOldSimilarity() : null; });
        this.ShareUrl = ko.observable();
        this.ShareMessage = ko.observable();
        this.CompareHelpVisible = ko.observable(false);
        this.SimilarityHelpVisible = ko.observable(false);
        this.AspectHelpVisible = ko.observable(false);
        this.CompareType = ko.observable(1);
        this.AspectTempo = ko.observable(true);
        this.AspectRythm = ko.observable(true);
        this.AspectMood = ko.observable(true);
        this.AspectMelody = ko.observable(true);
        this.AspectEnergy = ko.observable(true);
        this.AspectTimbre = ko.observable(true);
        this._portalIsReady = false;
        this._countryInfos = ko.observable();
        this._updatingInput = false;
        this.Aspects = ko.computed(function () { return (_this.AspectTempo() ? "1" : "0") + (_this.AspectRythm() ? "1" : "0") + (_this.AspectMood() ? "1" : "0") + (_this.AspectMelody() ? "1" : "0") + (_this.AspectEnergy() ? "1" : "0") + (_this.AspectTimbre() ? "1" : "0"); });
        this.RaterMatch = new MetricRater(0, null, this.SelectedSong, this.SelectedSimilarity, this.Aspects);
        this.RaterTempo = new MetricRater(1, this.AspectTempo, this.SelectedSong, this.SelectedSimilarity, this.Aspects);
        this.RaterRythm = new MetricRater(2, this.AspectRythm, this.SelectedSong, this.SelectedSimilarity, this.Aspects);
        this.RaterMood = new MetricRater(3, this.AspectMood, this.SelectedSong, this.SelectedSimilarity, this.Aspects);
        this.RaterMelody = new MetricRater(4, this.AspectMelody, this.SelectedSong, this.SelectedSimilarity, this.Aspects);
        this.RaterEnergy = new MetricRater(5, this.AspectEnergy, this.SelectedSong, this.SelectedSimilarity, this.Aspects);
        this.RaterTimbre = new MetricRater(6, this.AspectTimbre, this.SelectedSong, this.SelectedSimilarity, this.Aspects);
        this.MetricRaters = [this.RaterTempo, this.RaterRythm, this.RaterMood, this.RaterMelody, this.RaterEnergy, this.RaterTimbre,];
    }
    MatchViewModel.prototype.Initialize = function (songId, compareType, aspects, campareSongId) {
        var _this = this;
        twttr.ready(function () {
            try {
                twttr.widgets.load();
            }
            catch (error) {
                console.log("Twitter caused an error: " + error.message);
            }
        });
        this._campareSongId = campareSongId;
        this._updatingInput = true;
        if (compareType)
            this.CompareType(parseInt(compareType));
        if (aspects) {
            var values = aspects.split("");
            this.AspectTempo(values[0] == "1");
            this.AspectRythm(values[1] == "1");
            this.AspectMood(values[2] == "1");
            this.AspectMelody(values[3] == "1");
            this.AspectEnergy(values[4] == "1");
            this.AspectTimbre(values[5] == "1");
        }
        this._updatingInput = false;
        if (songId)
            this.GetSong(songId);
        $("#SongQuery").focus();
        this.Query.subscribe(function (v) { return _this.QueryChanged(v); });
        this.CompareType.subscribe(function (v) { return _this.CompareTypeChanged(v); });
        this.Aspects.subscribe(function (v) { return _this.AspectsChanged(v); });
    };
    MatchViewModel.prototype.Dispose = function () {
    };
    MatchViewModel.prototype.PortalReady = function () {
        this._portalIsReady = true;
        if (this._portalReadyCallback != null)
            this._portalReadyCallback();
    };
    MatchViewModel.prototype.CallWhenPortalReady = function (callback) {
        if (this._portalIsReady)
            callback();
        else
            this._portalReadyCallback = callback;
    };
    MatchViewModel.prototype.QueryChanged = function (newValue) {
        var _this = this;
        if (this._updatingInput)
            return;
        clearTimeout(this._queryDelayHandle);
        this._queryDelayHandle = setTimeout(function () { return _this.Search(newValue); }, 200);
    };
    MatchViewModel.prototype.CompareTypeChanged = function (newValue) {
        if (this._updatingInput)
            return;
        this.GetSong(this.SelectedSong().Id);
    };
    MatchViewModel.prototype.AspectsChanged = function (newValue) {
        if (this._updatingInput)
            return;
        this.GetSong(this.SelectedSong().Id);
    };
    MatchViewModel.prototype.SearchAndUpdateQuery = function (value) {
        this._updatingInput = true;
        this.Query(value);
        this.Search(value);
        this._updatingInput = false;
    };
    MatchViewModel.prototype.ToggleSimilarityHelp = function () {
        this.SimilarityHelpVisible(!this.SimilarityHelpVisible());
    };
    MatchViewModel.prototype.ToggleCompareHelp = function () {
        this.CompareHelpVisible(!this.CompareHelpVisible());
    };
    MatchViewModel.prototype.ToggleAspectHelp = function () {
        this.AspectHelpVisible(!this.AspectHelpVisible());
    };
    MatchViewModel.prototype.Search = function (value) {
        var _this = this;
        if (value == "")
            this.Matches.removeAll();
        else
            this.CallWhenPortalReady(function () { return RefrainPortal.Search.Get(value, 30).WithCallback(_this.SearchGetCompleted, _this); });
    };
    MatchViewModel.prototype.SearchGetCompleted = function (response) {
        this.Matches.removeAll();
        this.ExtraMatches.removeAll();
        if (response.Error != null) {
            console.log("Failed to get search results: " + response.Error.Message);
            return;
        }
        for (var i = 0; i < response.Body.Results.length; i++) {
            if (i < 5)
                this.Matches.push(new Match(response.Body.Results[i], this));
            else
                this.ExtraMatches.push(new Match(response.Body.Results[i], this));
        }
    };
    MatchViewModel.prototype.SelectMatch = function (match) {
        if (this.SelectedMatch() != null)
            this.SelectedMatch().IsSelected(false);
        this.SelectedSimilarity(null);
        this.SelectedOldSimilarity(null);
        this.SelectedSong(null);
        this._songPlayer = null;
        this._compareSongPlayer = null;
        this.GetSong(match.Id);
        match.IsSelected(true);
        window.location.hash = "Match/" + match.Id + "/";
        this.SelectedMatch(match);
    };
    MatchViewModel.prototype.ShowExtraMatches = function () {
        for (var i = 0; this.ExtraMatches().length > 0 && i < 5; i++)
            this.Matches.push(this.ExtraMatches.shift());
    };
    MatchViewModel.prototype.GetSong = function (id) {
        var _this = this;
        this.CallWhenPortalReady(function () { return RefrainPortal.Song.Get(id, _this.Aspects(), _this.CompareType()).WithCallback(_this.SongGetCompleted, _this); });
    };
    MatchViewModel.prototype.SelectSimilarity = function (similarity) {
        if (this.SelectedSimilarity() != null)
            this.SelectedSimilarity().IsSelected(false);
        similarity.IsSelected(true);
        this.SelectedOldSimilarity(null);
        this.SelectedSimilarity(null);
        this.SelectedSimilarity(similarity);
        window.location.hash = "Match/" + this.SelectedSong().Id + "/" + this.CompareType() + "/" + this.Aspects() + "/" + this.SelectedSimilarity().Id;
        $('html, body').animate({ scrollTop: $("#ExploreHeadline").offset().top }, 1000);
        this.LoadSongPlayer(this.SelectedSong());
        this.LoadComparePlayer(this.SelectedSimilarity());
        if (window.location.hostname != "localhost")
            this.ShareUrl(window.location.toString());
        else
            this.ShareUrl("http://refrain.dk" + window.location.pathname + window.location.hash);
        this.ShareMessage("I discovered " + this.SelectedSong().Title + " is " + (similarity.Distance < 0.2 ? "similar" : "dissimilar") + " to " + similarity.Title + " at ");
        try {
            twttr.widgets.load();
        }
        catch (error) {
            console.log("Twitter caused an error: " + error.message);
        }
    };
    MatchViewModel.prototype.SelectOldSimilarity = function (similarity) {
        if (this.SelectedSimilarity() != null)
            this.SelectedSimilarity().IsSelected(false);
        this.SelectedSimilarity(null);
        this.SelectedOldSimilarity(new SimpleSongViewModel(similarity));
        $('html, body').animate({ scrollTop: $("#ExploreHeadline").offset().top }, 1000);
        this.LoadSongPlayer(this.SelectedSong());
        this.LoadComparePlayer(this.SelectedOldSimilarity());
        this.ShareUrl(null);
        this.ShareMessage(null);
    };
    MatchViewModel.prototype.LoadSongPlayer = function (song) {
        this._songPlayer = null;
        if (song.YoutubeUri) {
            var youtubeId = song.YoutubeUri.match(/[?&]v=([^&]+)/)[1];
            if (this._songPlayer == null)
                this._songPlayer = new YT.Player($("#SelectedFullInfo .YouTubePlayer")[0], { height: 300, width: 400, videoId: youtubeId });
            else if (this._songPlayer.getVideoUrl().match(/[?&]v=([^&]+)/)[1] != youtubeId)
                this._songPlayer.cueVideoById(youtubeId);
        }
        else
            this._songPlayer = null;
    };
    MatchViewModel.prototype.LoadComparePlayer = function (song) {
        this._compareSongPlayer = null;
        if (song.YoutubeUri) {
            var youtubeId = song.YoutubeUri.match(/[?&]v=([^&]+)/)[1];
            if (this._compareSongPlayer == null)
                this._compareSongPlayer = new YT.Player($("#CompareFullInfo .YouTubePlayer")[0], { height: 300, width: 400, videoId: youtubeId });
            else
                this._compareSongPlayer.cueVideoById(youtubeId);
        }
        else
            this._compareSongPlayer = null;
    };
    MatchViewModel.prototype.ShareOnFacebook = function () {
        FB.ui({
            method: 'share',
            href: this.ShareUrl()
        }, function (response) {
            ga('send', 'event', 'Share', 'Facebook', window.location.hash);
        });
    };
    MatchViewModel.prototype.SongGetCompleted = function (response) {
        if (response.Error != null) {
            console.log("Failed to get Song: " + response.Error.Message);
            return;
        }
        if (response.Body.Count != 1) {
            console.log("Failed to get Song, number songs returned: " + response.Body.Count);
            return;
        }
        var song = new Song(response.Body.Results[0], this);
        this.SelectedSong(song);
        if (this._campareSongId != null) {
            var allSimilarities = song.MostSimilar().concat(song.ExtraMostSimilar()).concat(song.LeastSimilar()).concat(song.ExtraLeastSimilar());
            for (var i = 0; i < allSimilarities.length; i++) {
                if (allSimilarities[i].Id == this._campareSongId) {
                    this.SelectSimilarity(allSimilarities[i]);
                    this._campareSongId = null;
                    return;
                }
            }
            RefrainPortal.Search.By(this._campareSongId).WithCallback(this.SearchByCompleted, this);
            this._campareSongId = null;
        }
        else
            $('html, body').animate({ scrollTop: $("#SelectMatchHeadline").offset().top }, 1000);
    };
    MatchViewModel.prototype.SearchByCompleted = function (response) {
        if (response.Error != null) {
            console.log("Failed to get song via Search/By: " + response.Error.Message);
            return;
        }
        if (response.Body.Count != 1) {
            console.log("Failed to get song via Search/By, number songs returned: " + response.Body.Count);
            return;
        }
        this.SelectOldSimilarity(response.Body.Results[0]);
    };
    return MatchViewModel;
})();
var MetricRater = (function () {
    function MetricRater(metricIndex, metricIsSelected, selectedSong, selectedComparison, metricFilter) {
        var _this = this;
        this.HasRated = ko.observable(false);
        this.RatedGood = ko.observable(false);
        this.RatedBad = ko.observable(false);
        this._metricFilter = metricFilter;
        this._selectedComparison = selectedComparison;
        this._selectedSong = selectedSong;
        this._metricIsSelected = metricIsSelected;
        this._metricIndex = metricIndex;
        this.CanRate = ko.computed(function () { return (_this._metricIsSelected == null || _this._metricIsSelected()) && !_this.HasRated(); });
        this._selectedSong.subscribe(function (v) { return _this.Reset(); });
        this._selectedComparison.subscribe(function (v) { return _this.Reset(); });
    }
    MetricRater.prototype.Reset = function () {
        this.HasRated(false);
        this.RatedGood(false);
        this.RatedBad(false);
    };
    MetricRater.prototype.RateGood = function () {
        this.Rate(1);
    };
    MetricRater.prototype.RateBad = function () {
        this.Rate(-1);
    };
    MetricRater.prototype.Rate = function (rating) {
        this.HasRated(true);
        this.RatedGood(rating > 0);
        this.RatedBad(rating < 0);
        RefrainPortal.MetricRating.Set(this._selectedSong().Id, this._selectedComparison().Id, this._metricFilter(), this._metricIndex, rating).WithCallback(function (response) {
            if (response.Error != null)
                throw new Error("Failed to rate: " + response.Error.Message);
        });
    };
    return MetricRater;
})();
var MoodViewModel = (function () {
    function MoodViewModel() {
        this.SelectedTweets = ko.observableArray();
        this.CanShowMoreTweets = ko.observable(false);
        this.AvailableMoodCountries = ko.observableArray();
        this.MoodGraphCurrentTime = ko.observable(new Date(2014, 4, 6, 6, 0));
        this.MoodMapCurrentTime = ko.observable(new Date(2014, 4, 6, 18, 0));
        this.IsLoadingGraph = ko.observable(false);
        this._moodData = {};
        this._updateHandler = null;
        this.MoodMapGotoEuroVision2015();
        this.MoodGraphGotoEuroVision2015(false);
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
                drawSeries: [function (p, c, s) { return s.Country.Color(s.color); }]
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
        if (this.AvailableMoodCountries().length !== 0 || groups.length === 0)
            return;
        for (var i = 0; i < groups.length; i++)
            this.AvailableMoodCountries.push(new MoodGraphCountry(groups[i], function (country) { return _this.CountrySelectToggled(country); }));
        this.AvailableMoodCountries.sort(function (a, b) { return a.Name.localeCompare(b.Name); });
        var selectedCountries = [];
        for (i = 0; i < Math.min(3, groups.length); i++) {
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
        this.MoodMapCurrentTime.subscribe(function (v) { return _this.UpdateMoodMap(); });
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
    MoodViewModel.prototype.MoodMapGotoEuroVision2014 = function () {
        this.MoodMapCurrentTime(new Date(2014, 4, 6, 18, 0));
    };
    MoodViewModel.prototype.MoodMapGotoEuroVision2015 = function () {
        this.MoodMapCurrentTime(this.GetNowIfFuture(new Date(2015, 4, 23, 18, 0)));
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
    MoodViewModel.prototype.MoodGraphGotoEuroVision2014 = function () {
        this.MoodGraphCurrentTime(new Date(2014, 4, 6, 6, 0));
        this.RefreshGraphData();
    };
    MoodViewModel.prototype.MoodGraphGotoEuroVision2015 = function (shouldRefresh) {
        if (shouldRefresh === void 0) { shouldRefresh = true; }
        this.MoodGraphCurrentTime(this.GetNowIfFuture(new Date(2015, 4, 23, 6, 0), 6));
        if (shouldRefresh)
            this.RefreshGraphData();
    };
    MoodViewModel.prototype.GetNowIfFuture = function (date, hour) {
        if (hour === void 0) { hour = null; }
        var now = new Date();
        now.setSeconds(0);
        now.setMinutes(now.getMinutes() - 10);
        if (hour != null) {
            now.setMinutes(0);
            now.setHours(hour);
        }
        return date.getTime() > now.getTime() ? now : date;
    };
    MoodViewModel.prototype.GetGraphData = function (countries) {
        var _this = this;
        if (countries.length == 0)
            return;
        this.IsLoadingGraph(true);
        var start = this.MoodGraphCurrentTime();
        var end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
        RefrainPortal.TwitterMood.Get(countries.map(function (v, i) { return v.CodeName; }), start, end, 999).WithCallback(function (r) { return _this.TwitterMoodGraphCompleted(r, countries, start, end); }, this);
    };
    MoodViewModel.prototype.Update = function () {
        this.UpdateMoodMap();
        RefrainPortal.Tweet.Get().WithCallback(this.TweetGetCompleted, this);
    };
    MoodViewModel.prototype.UpdateMoodMap = function () {
        var after = this.MoodMapCurrentTime();
        var before = new Date(after.getTime());
        before.setMinutes(before.getMinutes() + 7);
        RefrainPortal.TwitterMood.Get(null, after, before).WithCallback(this.TwitterMoodGetCompleted, this);
    };
    MoodViewModel.prototype.TwitterMoodGraphCompleted = function (response, countries, start, end) {
        if (response.Error != null) {
            console.log("Failed to get Twitter mood: " + response.Error.Message);
            return;
        }
        var groups = response.Body.Groups;
        var data = null;
        for (var o = 0; o < countries.length; o++) {
            data = null;
            for (var i = 0; i < groups.length; i++) {
                if (!countries[o].IsEqualGroup(groups[i]))
                    continue;
                data = groups[i].Results;
                break;
            }
            if (data == null)
                data = [];
            this.UpdateMoodData(countries[o], data, start, end);
        }
        this.UpdateGraph();
    };
    MoodViewModel.prototype.UpdateMoodData = function (country, data, start, end) {
        if (country.HasData())
            country.UpdateData(data, start, end);
        else
            this._graphData.push(country.UpdateData(data, start, end));
    };
    MoodViewModel.prototype.CountrySelectToggled = function (country) {
        if (country.IsSelected()) {
            if (country.HasData()) {
                this._graphData.push(country.Data);
                this.UpdateGraph();
            }
            else
                this.GetGraphData([country]);
        }
        else {
            for (var i = 0; i < this._graphData.length; i++) {
                if (this._graphData[i].Country !== country)
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
        this.IsLoadingGraph(false);
    };
    MoodViewModel.prototype.TwitterMoodGetCompleted = function (response) {
        var _this = this;
        if (response.Error != null) {
            console.log("Failed to get Twitter mood: " + response.Error.Message);
            return;
        }
        var groups = response.Body.Groups;
        this._moodData = {};
        for (var i = 0; i < groups.length; i++) {
            var valence = groups[i].Results.length > 0 ? groups[i].Results[0].Valence : 0;
            this._moodData[MoodViewModel.Capitalize(groups[i].Value)] = valence;
        }
        this._map.data.setStyle({});
        this._map.data.setStyle(function (f) { return _this.SetCountryStyle(f); });
    };
    MoodViewModel.prototype.TwitterMoodGetForGraphCountriesCompleted = function (response) {
        if (response.Error != null) {
            console.log("Failed to get Twitter mood: " + response.Error.Message);
            return;
        }
        if (response.Body == null || response.Body.Groups == null)
            return;
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
        try {
            twttr.widgets.load(document.getElementById("MoodTweets"));
        }
        catch (error) {
            console.log("Twitter caused an error: " + error.message);
        }
    };
    MoodViewModel.prototype.GetTweetEmbed = function (rawCode) {
        var code = decodeURIComponent(rawCode.replace(/\+/g, '%20'));
        return code.substring(code.indexOf("<blockquote"), code.indexOf("</blockquote>") + 12);
    };
    MoodViewModel.Capitalize = function (country) {
        return country.replace("_", " ").replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    };
    MoodViewModel.prototype.SetCountryStyle = function (feature) {
        var name = feature.A.name;
        if (this._moodData[name] == null)
            return { visible: false };
        var mood = this._moodData[name];
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
        this._dataPointSpacing = 300000;
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
    MoodGraphCountry.prototype.UpdateData = function (data, start, end) {
        this.ClearData();
        var startNumber = start.getTime();
        var endNumber = end.getTime();
        if (data.length === 0)
            this.Data.data.push([startNumber, 0], [endNumber, 0]);
        else {
            if (data[0].DateCreated !== startNumber)
                this.Data.data.push([startNumber, 0]);
            for (var o = 0; o < data.length; o++)
                this.Data.data.push([data[o].DateCreated * 1000, data[o].Valence]);
            if (data[data.length - 1].DateCreated !== endNumber)
                this.Data.data.push([endNumber, 0]);
            this.CreateMissingPoints(this.Data.data);
        }
        return this.Data;
    };
    MoodGraphCountry.prototype.ToggleSelect = function () {
        this.IsSelected(!this.IsSelected());
        this._updateCallback(this);
    };
    MoodGraphCountry.prototype.CreateMissingPoints = function (data) {
        var previous = data[0];
        var current = data[0];
        for (var i = 1; i < data.length; i++) {
            previous = current;
            current = data[i];
            if (current[0] - previous[0] > this._dataPointSpacing * 2) {
                data.splice(i, 0, [previous[0] + this._dataPointSpacing, 0], [current[0] - this._dataPointSpacing, 0]);
                i += 2;
                if (current[0] - previous[0] > this._dataPointSpacing * 10) {
                    data.splice(i - 1, 0, [previous[0] + this._dataPointSpacing * 3, 0], [current[0] - this._dataPointSpacing * 3, 0]);
                    i += 2;
                }
            }
        }
    };
    return MoodGraphCountry;
})();
var RefrainPortal;
(function (RefrainPortal) {
    var Search = (function () {
        function Search() {
        }
        Search.Get = function (query, pageSize, serviceCaller) {
            if (pageSize === void 0) { pageSize = null; }
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("Search/Get", 0 /* Get */, { query: query, pageSize: pageSize }, true);
        };
        Search.By = function (id, serviceCaller) {
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("Search/By", 0 /* Get */, { id: id }, true);
        };
        return Search;
    })();
    RefrainPortal.Search = Search;
    var Song = (function () {
        function Song() {
        }
        Song.Get = function (id, type, dataSet, serviceCaller) {
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("Song/Get", 0 /* Get */, { id: id, type: type, dataSet: dataSet }, true);
        };
        return Song;
    })();
    RefrainPortal.Song = Song;
    var TwitterMood = (function () {
        function TwitterMood() {
        }
        TwitterMood.Get = function (country, after, before, groupPageSize, serviceCaller) {
            if (country === void 0) { country = null; }
            if (after === void 0) { after = null; }
            if (before === void 0) { before = null; }
            if (groupPageSize === void 0) { groupPageSize = null; }
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("TwitterMood/Get", 0 /* Get */, { country: country, before: before, after: after, groupPageSize: groupPageSize }, true);
        };
        return TwitterMood;
    })();
    RefrainPortal.TwitterMood = TwitterMood;
    var Tweet = (function () {
        function Tweet() {
        }
        Tweet.Get = function (groupLimit, country, serviceCaller) {
            if (groupLimit === void 0) { groupLimit = null; }
            if (country === void 0) { country = null; }
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("Tweet/Get", 0 /* Get */, { groupLimit: groupLimit, country: country }, true);
        };
        return Tweet;
    })();
    RefrainPortal.Tweet = Tweet;
    var MetricRating = (function () {
        function MetricRating() {
        }
        MetricRating.Set = function (songId1, songId2, metricFilter, metricIndex, rating, serviceCaller) {
            if (serviceCaller === void 0) { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();
            return serviceCaller.CallService("MetricRating/Set", 0 /* Get */, { songId1: songId1, songId2: songId2, metricFilter: metricFilter, metricIndex: metricIndex, rating: rating }, true);
        };
        return MetricRating;
    })();
    RefrainPortal.MetricRating = MetricRating;
})(RefrainPortal || (RefrainPortal = {}));
var SimpleSongViewModel = (function () {
    function SimpleSongViewModel(song) {
        this.Year = null;
        this.YoutubeUri = null;
        this.SpotifyId = null;
        this.Id = song.Id;
        this.Title = song.Text;
        this.Artist = song.ArtistName;
        this.CountryName = song.CountryName;
        this.CountryCode = CountryInfo[song.CountryName] ? CountryInfo[song.CountryName] : null;
        this.Year = song.ContestYear;
        if (song.YoutubeUri)
            this.YoutubeUri = song.YoutubeUri;
        if (song.SpotifyId)
            this.SpotifyId = song.SpotifyId;
    }
    return SimpleSongViewModel;
})();
var Song = (function () {
    function Song(song, selector) {
        this.Year = null;
        this.YoutubeUri = null;
        this.SpotifyId = null;
        this.MostSimilar = ko.observableArray();
        this.LeastSimilar = ko.observableArray();
        this.ExtraMostSimilar = ko.observableArray();
        this.ExtraLeastSimilar = ko.observableArray();
        this.Id = song.Id;
        this.Title = song.Title;
        this.Artist = song.ArtistName;
        this.CountryName = song.CountryName;
        this.CountryCode = CountryInfo[song.CountryName] ? CountryInfo[song.CountryName] : null;
        this.Year = song.Year;
        if (song.YoutubeUri)
            this.YoutubeUri = song.YoutubeUri;
        if (song.SpotifyId)
            this.SpotifyId = song.SpotifyId;
        for (var i = 0; i < song.Similarity.Songs.length; i++) {
            var similarity = new SongSimilarity(song.Similarity.Songs[i], selector);
            if (similarity.Id == this.Id)
                continue;
            if (i < song.Similarity.Songs.length / 2) {
                if (this.MostSimilar().length < 5)
                    this.MostSimilar.push(similarity);
                else
                    this.ExtraMostSimilar.push(similarity);
            }
            else {
                if (this.LeastSimilar().length < 5)
                    this.LeastSimilar.push(similarity);
                else
                    this.ExtraLeastSimilar.push(similarity);
            }
        }
    }
    Song.prototype.ShowExtraMostSimilar = function () {
        for (var i = 0; this.ExtraMostSimilar().length > 0 && i < 5; i++)
            this.MostSimilar.push(this.ExtraMostSimilar.shift());
    };
    Song.prototype.ShowExtraLeastSimilar = function () {
        for (var i = 0; this.ExtraLeastSimilar().length > 0 && i < 5; i++)
            this.LeastSimilar.push(this.ExtraLeastSimilar.shift());
    };
    return Song;
})();
var SongSimilarity = (function () {
    function SongSimilarity(similarity, selector) {
        this.Year = null;
        this.YoutubeUri = null;
        this.SpotifyId = null;
        this.IsSelected = ko.observable(false);
        this.Id = similarity.SongId;
        this.Title = similarity.SongTitle;
        this.Artist = similarity.ArtistName;
        this.CountryName = similarity.CountryName;
        this.CountryCode = CountryInfo[similarity.CountryName] ? CountryInfo[similarity.CountryName] : null;
        this.Year = similarity.Year;
        if (similarity.YoutubeUri)
            this.YoutubeUri = similarity.YoutubeUri;
        if (similarity.SpotifyId)
            this.SpotifyId = similarity.SpotifyId;
        this.Distance = similarity.Distance;
        var similarities = similarity.RelativeImportance.split(" ");
        this.Tempo = parseFloat(similarities[0]);
        this.Rythm = parseFloat(similarities[1]);
        this.Mood = parseFloat(similarities[2]);
        this.Melody = parseFloat(similarities[3]);
        this.Energy = parseFloat(similarities[4]);
        this.Timbre = parseFloat(similarities[5]);
        this._selector = selector;
    }
    SongSimilarity.prototype.Select = function () {
        if (!this.IsSelected())
            this._selector.SelectSimilarity(this);
        return false;
    };
    return SongSimilarity;
})();
