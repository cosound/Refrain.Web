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
        }, 500);
    };

    MatchViewModel.prototype.Search = function (value) {
        if (value == "")
            this.Matches.removeAll();
        else
            RefrainPortal.Search.Get(value).WithCallback(this.SearchGetCompleted, this);
    };

    MatchViewModel.prototype.SearchGetCompleted = function (response) {
        var _this = this;
        this.Matches.removeAll();

        if (response.Error != null) {
            console.log("Failed to get search results: " + response.Error.Message);
            return;
        }

        for (var i = 0; i < response.Body.Results.length; i++) {
            this.Matches.push(new Match(response.Body.Results[i].Text, function (m) {
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
