var MoodViewModel = (function () {
    function MoodViewModel() {
        this.SelectedTweets = ko.observableArray();
        this._moodData = {};
    }
    MoodViewModel.prototype.Initialize = function () {
        this._map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 4,
            center: new google.maps.LatLng(51.5, 13.7),
            disableDefaultUI: true
        });

        this._map.data.loadGeoJson('Countries.json');
    };

    MoodViewModel.prototype.PortalReady = function () {
        RefrainPortal.TwitterMood.Get().WithCallback(this.TwitterMoodGetCompleted, this);
        RefrainPortal.Tweet.Get().WithCallback(this.TweetGetCompleted, this);
    };

    MoodViewModel.prototype.TwitterMoodGetCompleted = function (response) {
        var _this = this;
        if (response.Error != null) {
            console.log("Failed to get Twitter mood: " + response.Error.Message);
            return;
        }

        var groups = response.Body.Groups;

        for (var i = 0; i < groups.length; i++)
            this._moodData[this.Capitalize(groups[i].Value)] = groups[i].Results[0].Valence;

        this._map.data.setStyle(function (f) {
            return _this.SetCountryStyle(f);
        });
    };

    MoodViewModel.prototype.TweetGetCompleted = function (response) {
        if (response.Error != null) {
            console.log("Failed to get Twitter mood: " + response.Error.Message);
            return;
        }

        var groups = response.Body.Groups;
        var randomGroupIndex = 0;
        var randomTweetIndex = 0;
        var group = null;
        var tweet = null;

        while (groups.length != 0 && this.SelectedTweets().length < 10) {
            randomGroupIndex = Math.floor(Math.random() * (groups.length - 1));

            group = groups[randomGroupIndex];

            if (group.Results == null || group.Results.length == 0) {
                group.splice(randomGroupIndex, 1);
                continue;
            }

            randomTweetIndex = Math.floor(Math.random() * (group.Results.length - 1));

            tweet = group.Results[randomTweetIndex];

            if (tweet.EmbedCode) {
                var code = decodeURIComponent(tweet.EmbedCode.replace(/\+/g, '%20'));
                code = code.substring(code.indexOf("<blockquote"), code.indexOf("</blockquote>") + 12);
                this.SelectedTweets.push(code);
            }

            group.Results.splice(randomTweetIndex, 1);
        }

        twttr.widgets.load();
    };

    MoodViewModel.prototype.Capitalize = function (country) {
        return country.replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    };

    MoodViewModel.prototype.SetCountryStyle = function (feature) {
        var mood = 1;

        if (this._moodData[feature.j.name] != null)
            mood = this._moodData[feature.j.name];

        var color = '#' + this.HexFromRGBRatio(1 - (mood + 1) / 2, (mood + 1) / 2, 0);
        return {
            fillColor: color,
            strokeColor: color,
            strokeWeight: 1
        };
    };

    MoodViewModel.prototype.HexFromRGBRatio = function (r, g, b) {
        var hex = [
            Math.floor(r * 255).toString(16),
            Math.floor(g * 255).toString(16),
            Math.floor(b * 255).toString(16)
        ];
        $.each(hex, function (nr, val) {
            if (val.length === 1)
                hex[nr] = "0" + val;
        });

        return hex.join("").toUpperCase();
    };
    return MoodViewModel;
})();
