var MatchViewModel = (function () {
    function MatchViewModel() {
        var _this = this;
        this.Query = ko.observable("");
        this.Matches = ko.observableArray();
        this.ExtraMatches = ko.observableArray();
        this.SelectedMatch = ko.observable();
        this.SelectedSong = ko.observable();
        this.SelectedSimilarity = ko.observable();
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
        this.Aspects = ko.computed(function () {
            return (_this.AspectTempo() ? "1" : "0") + (_this.AspectRythm() ? "1" : "0") + (_this.AspectMood() ? "1" : "0") + (_this.AspectMelody() ? "1" : "0") + (_this.AspectEnergy() ? "1" : "0") + (_this.AspectTimbre() ? "1" : "0");
        });
    }
    MatchViewModel.prototype.Initialize = function (songId, compareType, aspects, campareSongId) {
        var _this = this;
        twttr.ready(function () {
            return twttr.widgets.load();
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

        this.Query.subscribe(function (v) {
            return _this.QueryChanged(v);
        });
        this.CompareType.subscribe(function (v) {
            return _this.CompareTypeChanged(v);
        });
        this.Aspects.subscribe(function (v) {
            return _this.AspectsChanged(v);
        });
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

        this._queryDelayHandle = setTimeout(function () {
            return _this.Search(newValue);
        }, 200);
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
            this.CallWhenPortalReady(function () {
                return RefrainPortal.Search.Get(value, 30).WithCallback(_this.SearchGetCompleted, _this);
            });
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
        this.CallWhenPortalReady(function () {
            return RefrainPortal.Song.Get(id, _this.Aspects(), _this.CompareType()).WithCallback(_this.SongGetCompleted, _this);
        });
    };

    MatchViewModel.prototype.SelectSimilarity = function (similarity) {
        if (this.SelectedSimilarity() != null)
            this.SelectedSimilarity().IsSelected(false);

        similarity.IsSelected(true);

        this.SelectedSimilarity(null);
        this.SelectedSimilarity(similarity);

        window.location.hash = "Match/" + this.SelectedSong().Id + "/" + this.CompareType() + "/" + this.Aspects() + "/" + this.SelectedSimilarity().Id;

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

        this.ShareMessage("I discovered " + this.SelectedSong().Title + " is " + (similarity.Distance < 0.2 ? "similar" : "dissimilar") + " to " + similarity.Title + " at ");

        twttr.widgets.load();
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
        }

        $('html, body').animate({ scrollTop: $("#SelectMatchHeadline").offset().top }, 1000);
    };
    return MatchViewModel;
})();
