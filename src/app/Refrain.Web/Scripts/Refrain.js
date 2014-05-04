var AboutViewModel = (function () {
    function AboutViewModel() {
    }
    AboutViewModel.prototype.Initialize = function () {
    };

    AboutViewModel.prototype.PortalReady = function () {
    };
    return AboutViewModel;
})();
var CountryInfo = { "Afghanistan": "af", "Åland Islands": "ax", "Albania": "al", "Algeria": "dz", "American Samoa": "as", "Andorra": "ad", "Angola": "ao", "Anguilla": "ai", "Antarctica": "aq", "Antigua and Barbuda": "ag", "Argentina": "ar", "Armenia": "am", "Aruba": "aw", "Australia": "au", "Austria": "at", "Azerbaijan": "az", "Bahamas": "bs", "Bahrain": "bh", "Bangladesh": "bd", "Barbados": "bb", "Belarus": "by", "Belgium": "be", "Belize": "bz", "Benin": "bj", "Bermuda": "bm", "Bhutan": "bt", "Bolivia, Plurinational State of": "bo", "Bonaire, Sint Eustatius and Saba": "bq", "Bosnia and Herzegovina": "ba", "Botswana": "bw", "Bouvet Island": "bv", "Brazil": "br", "British Indian Ocean Territory": "io", "Brunei Darussalam": "bn", "Bulgaria": "bg", "Burkina Faso": "bf", "Burundi": "bi", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Cape Verde": "cv", "Cayman Islands": "ky", "Central African Republic": "cf", "Chad": "td", "Chile": "cl", "China": "cn", "Christmas Island": "cx", "Cocos (Keeling) Islands": "cc", "Colombia": "co", "Comoros": "km", "Congo": "cg", "Congo, the Democratic Republic of the": "cd", "Cook Islands": "ck", "Costa Rica": "cr", "Côte d'Ivoire": "ci", "Croatia": "hr", "Cuba": "cu", "Curaçao": "cw", "Cyprus": "cy", "Czech Republic": "cz", "Denmark": "dk", "Djibouti": "dj", "Dominica": "dm", "Dominican Republic": "do", "Ecuador": "ec", "Egypt": "eg", "El Salvador": "sv", "Equatorial Guinea": "gq", "Eritrea": "er", "Estonia": "ee", "Ethiopia": "et", "Falkland Islands (Malvinas)": "fk", "Faroe Islands": "fo", "Fiji": "fj", "Finland": "fi", "France": "fr", "French Guiana": "gf", "French Polynesia": "pf", "French Southern Territories": "tf", "Gabon": "ga", "Gambia": "gm", "Georgia": "ge", "Germany": "de", "Ghana": "gh", "Gibraltar": "gi", "Greece": "gr", "Greenland": "gl", "Grenada": "gd", "Guadeloupe": "gp", "Guam": "gu", "Guatemala": "gt", "Guernsey": "gg", "Guinea": "gn", "Guinea-Bissau": "gw", "Guyana": "gy", "Haiti": "ht", "Heard Island and McDonald Islands": "hm", "Holy See (Vatican City State)": "va", "Honduras": "hn", "Hong Kong": "hk", "Hungary": "hu", "Iceland": "is", "India": "in", "Indonesia": "id", "Iran, Islamic Republic of": "ir", "Iraq": "iq", "Ireland": "ie", "Isle of Man": "im", "Israel": "il", "Italy": "it", "Jamaica": "jm", "Japan": "jp", "Jersey": "je", "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke", "Kiribati": "ki", "Korea, Democratic People's Republic of": "kp", "Korea, Republic of": "kr", "Kuwait": "kw", "Kyrgyzstan": "kg", "Lao People's Democratic Republic": "la", "Latvia": "lv", "Lebanon": "lb", "Lesotho": "ls", "Liberia": "lr", "Libya": "ly", "Liechtenstein": "li", "Lithuania": "lt", "Luxembourg": "lu", "Macao": "mo", "Macedonia, the former Yugoslav Republic of": "mk", "Madagascar": "mg", "Malawi": "mw", "Malaysia": "my", "Maldives": "mv", "Mali": "ml", "Malta": "mt", "Marshall Islands": "mh", "Martinique": "mq", "Mauritania": "mr", "Mauritius": "mu", "Mayotte": "yt", "Mexico": "mx", "Micronesia, Federated States of": "fm", "Moldova, Republic of": "md", "Monaco": "mc", "Mongolia": "mn", "Montenegro": "me", "Montserrat": "ms", "Morocco": "ma", "Mozambique": "mz", "Myanmar": "mm", "Namibia": "na", "Nauru": "nr", "Nepal": "np", "Netherlands": "nl", "New Caledonia": "nc", "New Zealand": "nz", "Nicaragua": "ni", "Niger": "ne", "Nigeria": "ng", "Niue": "nu", "Norfolk Island": "nf", "Northern Mariana Islands": "mp", "Norway": "no", "Oman": "om", "Pakistan": "pk", "Palau": "pw", "Palestine, State of": "ps", "Panama": "pa", "Papua New Guinea": "pg", "Paraguay": "py", "Peru": "pe", "Philippines": "ph", "Pitcairn": "pn", "Poland": "pl", "Portugal": "pt", "Puerto Rico": "pr", "Qatar": "qa", "Réunion": "re", "Romania": "ro", "Russian Federation": "ru", "Rwanda": "rw", "Saint Barthélemy": "bl", "Saint Helena, Ascension and Tristan da Cunha": "sh", "Saint Kitts and Nevis": "kn", "Saint Lucia": "lc", "Saint Martin (French part)": "mf", "Saint Pierre and Miquelon": "pm", "Saint Vincent and the Grenadines": "vc", "Samoa": "ws", "San Marino": "sm", "Sao Tome and Principe": "st", "Saudi Arabia": "sa", "Senegal": "sn", "Serbia": "rs", "Seychelles": "sc", "Sierra Leone": "sl", "Singapore": "sg", "Sint Maarten (Dutch part)": "sx", "Slovakia": "sk", "Slovenia": "si", "Solomon Islands": "sb", "Somalia": "so", "South Africa": "za", "South Georgia and the South Sandwich Islands": "gs", "South Sudan": "ss", "Spain": "es", "Sri Lanka": "lk", "Sudan": "sd", "Suriname": "sr", "Svalbard and Jan Mayen": "sj", "Swaziland": "sz", "Sweden": "se", "Switzerland": "ch", "Syrian Arab Republic": "sy", "Taiwan, Province of China": "tw", "Tajikistan": "tj", "Tanzania, United Republic of": "tz", "Thailand": "th", "Timor-Leste": "tl", "Togo": "tg", "Tokelau": "tk", "Tonga": "to", "Trinidad and Tobago": "tt", "Tunisia": "tn", "Turkey": "tr", "Turkmenistan": "tm", "Turks and Caicos Islands": "tc", "Tuvalu": "tv", "Uganda": "ug", "Ukraine": "ua", "United Arab Emirates": "ae", "United Kingdom": "gb", "United States": "us", "United States Minor Outlying Islands": "um", "Uruguay": "uy", "Uzbekistan": "uz", "Vanuatu": "vu", "Venezuela, Bolivarian Republic of": "ve", "Viet Nam": "vn", "Virgin Islands, British": "vg", "Virgin Islands, U.S.": "vi", "Wallis and Futuna": "wf", "Western Sahara": "eh", "Yemen": "ye", "Zambia": "zm", "Zimbabwe": "zw" };
var DiscoveryViewModel = (function () {
    function DiscoveryViewModel() {
    }
    DiscoveryViewModel.prototype.Initialize = function () {
        twttr.ready(function () {
            return twttr.widgets.load();
        });
    };

    DiscoveryViewModel.prototype.PortalReady = function () {
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
    return HomeViewModel;
})();
var MainViewModel = (function () {
    function MainViewModel() {
        var _this = this;
        this.CurrentPage = ko.observable();
        this.CurrentPageViewModel = ko.observable();
        this._client = CHAOS.Portal.Client.Initialize("http://api.refrain.dk/");

        $(window).bind("hashchange", function (e) {
            return _this.HashChange();
        });
        this.HashChange();
    }
    MainViewModel.prototype.HashChange = function () {
        var _this = this;
        var hash = window.location.hash.length == 0 ? [""] : window.location.hash.substr(1).split("/");

        var page = hash.shift();

        ga('send', 'pageview', { 'page': "/" + window.location.hash });

        if (page == this.CurrentPage())
            return;

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
                this._client.SessionAcquired().Add(function (h) {
                    return _this.CurrentPageViewModel().PortalReady();
                });
        }
    };
    return MainViewModel;
})();
var Match = (function () {
    function Match(match, selector) {
        this.IsSelected = ko.observable(false);
        this.Id = match.Id;
        this.Title = match.Text;
        this.Artist = match.ArtistName;
        this.CountryName = match.CountryName;
        this.CountryCode = CountryInfo[match.CountryName];

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
        this.SelectedMatch = ko.observable();
        this.SelectedSong = ko.observable();
        this.SelectedSimilarity = ko.observable();
        this.ShareUrl = ko.observable();
        this.ShareMessage = ko.observable();
        this._portalIsReady = false;
        this._countryInfos = ko.observable();
        this.Query.subscribe(function (v) {
            return _this.QueryChanged(v);
        });
    }
    MatchViewModel.prototype.Initialize = function (songId, campareSongId) {
        twttr.ready(function () {
            return twttr.widgets.load();
        });

        this._campareSongId = campareSongId;

        if (songId != null)
            this.GetSong(songId);
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
        clearTimeout(this._queryDelayHandle);

        this._queryDelayHandle = setTimeout(function () {
            return _this.Search(newValue);
        }, 200);
    };

    MatchViewModel.prototype.Search = function (value) {
        var _this = this;
        if (value == "")
            this.Matches.removeAll();
        else
            this.CallWhenPortalReady(function () {
                return RefrainPortal.Search.Get(value).WithCallback(_this.SearchGetCompleted, _this);
            });
    };

    MatchViewModel.prototype.SearchGetCompleted = function (response) {
        this.Matches.removeAll();

        if (response.Error != null) {
            console.log("Failed to get search results: " + response.Error.Message);
            return;
        }

        for (var i = 0; i < response.Body.Results.length; i++)
            this.Matches.push(new Match(response.Body.Results[i], this));
    };

    MatchViewModel.prototype.SelectMatch = function (match) {
        if (this.SelectedMatch() != null)
            this.SelectedMatch().IsSelected(false);

        this.SelectedSimilarity(null);
        this.SelectedSong(null);
        this._songPlayer = null;
        this._compareSongPlayer = null;

        this.GetSong(match.Id);

        match.IsSelected(true);

        window.location.hash = "Match/" + match.Id + "/";

        this.SelectedMatch(match);
    };

    MatchViewModel.prototype.GetSong = function (id) {
        var _this = this;
        this.CallWhenPortalReady(function () {
            return RefrainPortal.Song.Get(id, 111111).WithCallback(_this.SongGetCompleted, _this);
        });
    };

    MatchViewModel.prototype.SelectSimilarity = function (similarity) {
        if (this.SelectedSimilarity() != null)
            this.SelectedSimilarity().IsSelected(false);

        similarity.IsSelected(true);

        this.SelectedSimilarity(similarity);

        window.location.hash = "Match/" + this.SelectedSong().Id + "/" + this.SelectedSimilarity().Id;

        $('html, body').animate({ scrollTop: $("#ExploreHeadline").offset().top }, 1000);

        this._songPlayer = null;
        if (this.SelectedSong().YoutubeId) {
            if (this._songPlayer == null)
                this._songPlayer = new YT.Player($("#SelectedFullInfo .YouTubePlayer")[0], { height: 300, width: 400, videoId: this.SelectedSong().YoutubeId });
            else if (this._songPlayer.getVideoUrl().match(/[?&]v=([^&]+)/)[1] != this.SelectedSong().YoutubeId)
                this._songPlayer.cueVideoById(this.SelectedSong().YoutubeId);
        } else
            this._songPlayer = null;

        this._compareSongPlayer = null;
        if (this.SelectedSimilarity().YoutubeId) {
            if (this._compareSongPlayer == null)
                this._compareSongPlayer = new YT.Player($("#CompareFullInfo .YouTubePlayer")[0], { height: 300, width: 400, videoId: this.SelectedSimilarity().YoutubeId });
            else
                this._compareSongPlayer.cueVideoById(this.SelectedSimilarity().YoutubeId);
        } else
            this._compareSongPlayer = null;

        if (window.location.hostname != "localhost")
            this.ShareUrl(window.location.toString());
        else
            this.ShareUrl("http://refrain.dk" + window.location.pathname + window.location.hash);

        this.ShareMessage("I found something at");

        twttr.widgets.load();
        FB.XFBML.parse();
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
            for (var i = 0; i < song.MostSimilar.length; i++) {
                if (song.MostSimilar[i].Id == this._campareSongId) {
                    this.SelectSimilarity(song.MostSimilar[i]);
                    this._campareSongId = null;
                    return;
                }
            }

            for (i = 0; i < song.LeastSimilar.length; i++) {
                if (song.LeastSimilar[i].Id == this._campareSongId) {
                    this.SelectSimilarity(song.LeastSimilar[i]);
                    this._campareSongId = null;
                    return;
                }
            }
        }

        $('html, body').animate({ scrollTop: $("#SelectMatchHeadline").offset().top }, 1000);
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

    MoodViewModel.prototype.PortalReady = function () {
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
var RefrainPortal;
(function (RefrainPortal) {
    var Search = (function () {
        function Search() {
        }
        Search.Get = function (query, serviceCaller) {
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

            return serviceCaller.CallService("Search/Get", 0 /* Get */, { query: query }, true);
        };
        return Search;
    })();
    RefrainPortal.Search = Search;

    var Song = (function () {
        function Song() {
        }
        Song.Get = function (id, type, serviceCaller) {
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

            return serviceCaller.CallService("Song/Get", 0 /* Get */, { id: id, type: type }, true);
        };
        return Song;
    })();
    RefrainPortal.Song = Song;
})(RefrainPortal || (RefrainPortal = {}));
var Song = (function () {
    function Song(song, selector) {
        this.YoutubeId = null;
        this.SpotifyId = null;
        this.MostSimilar = [];
        this.LeastSimilar = [];
        this.Id = song.Id;
        this.Title = song.Title;
        this.Artist = song.ArtistName;
        this.CountryName = song.CountryName;
        this.CountryCode = CountryInfo[song.CountryName];

        if (song.YoutubeUri)
            this.YoutubeId = song.YoutubeUri.match(/[?&]v=([^&]+)/)[1];
        if (song.SpotifyId)
            this.SpotifyId = song.SpotifyId;

        for (var i = 0; this.MostSimilar.length < 5 && i != song.Similarity.Songs.length; i++) {
            if (song.Similarity.Songs[i].SongId == this.Id)
                continue;

            this.MostSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));
        }

        for (i = song.Similarity.Songs.length - 1; this.LeastSimilar.length < 5 && i >= 0; i--) {
            if (song.Similarity.Songs[i].SongId == this.Id)
                continue;

            this.LeastSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));
        }
    }
    return Song;
})();
var SongSimilarity = (function () {
    function SongSimilarity(similarity, selector) {
        this.YoutubeId = null;
        this.SpotifyId = null;
        this.IsSelected = ko.observable(false);
        this.Id = similarity.SongId;
        this.Title = similarity.SongTitle;
        this.Artist = similarity.ArtistName;
        this.CountryName = similarity.CountryName;
        this.CountryCode = CountryInfo[similarity.CountryName];

        if (similarity.YoutubeUri)
            this.YoutubeId = similarity.YoutubeUri.match(/[?&]v=([^&]+)/)[1];
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
