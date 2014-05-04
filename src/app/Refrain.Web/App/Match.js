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
