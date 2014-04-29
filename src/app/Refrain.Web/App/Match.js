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
