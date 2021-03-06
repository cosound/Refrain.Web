﻿var MainViewModel = (function () {
    function MainViewModel() {
        var _this = this;
        this.CurrentPage = ko.observable();
        this.CurrentPageViewModel = ko.observable();
        this._client = CHAOS.Portal.Client.Initialize("http://api.refrain.dk/");
        twttr.events.bind('tweet', function (ev) {
            return _this.LogTweet(ev);
        });

        $(window).bind("hashchange", function (e) {
            return _this.HashChange();
        });
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
                this._client.SessionAcquired().Add(function (h) {
                    return _this.CurrentPageViewModel().PortalReady();
                });
        }
    };
    return MainViewModel;
})();
