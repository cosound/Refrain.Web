﻿var MatchViewModel = (function () {
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

        if (this.SelectedSong().YoutubeId) {
            if (this._songPlayer == null)
                this._songPlayer = new YT.Player($("#SelectedFullInfo .YouTubePlayer")[0], { height: 300, width: 400, videoId: this.SelectedSong().YoutubeId });
            else if (this._songPlayer.getVideoUrl().match(/[?&]v=([^&]+)/)[1] != this.SelectedSong().YoutubeId)
                this._songPlayer.cueVideoById(this.SelectedSong().YoutubeId);
        } else
            this._songPlayer = null;

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
