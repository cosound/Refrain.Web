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
