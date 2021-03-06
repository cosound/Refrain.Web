﻿var RefrainPortal;
(function (RefrainPortal) {
    var Search = (function () {
        function Search() {
        }
        Search.Get = function (query, pageSize, serviceCaller) {
            if (typeof pageSize === "undefined") { pageSize = null; }
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

            return serviceCaller.CallService("Search/Get", 0 /* Get */, { query: query, pageSize: pageSize }, true);
        };

        Search.By = function (id, serviceCaller) {
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
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
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
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
            if (typeof country === "undefined") { country = null; }
            if (typeof after === "undefined") { after = null; }
            if (typeof before === "undefined") { before = null; }
            if (typeof groupPageSize === "undefined") { groupPageSize = null; }
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
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
            if (typeof groupLimit === "undefined") { groupLimit = null; }
            if (typeof country === "undefined") { country = null; }
            if (typeof serviceCaller === "undefined") { serviceCaller = null; }
            if (serviceCaller == null)
                serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

            return serviceCaller.CallService("Tweet/Get", 0 /* Get */, { groupLimit: groupLimit, country: country }, true);
        };
        return Tweet;
    })();
    RefrainPortal.Tweet = Tweet;
})(RefrainPortal || (RefrainPortal = {}));
