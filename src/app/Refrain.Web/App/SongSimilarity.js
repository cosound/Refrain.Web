var SongSimilarity = (function () {
    function SongSimilarity(similarity, selector) {
        this.Year = null;
        this.YoutubeId = null;
        this.SpotifyId = null;
        this.IsSelected = ko.observable(false);
        this.Id = similarity.SongId;
        this.Title = similarity.SongTitle;
        this.Artist = similarity.ArtistName;
        this.CountryName = similarity.CountryName;
        this.CountryCode = CountryInfo[similarity.CountryName] ? CountryInfo[similarity.CountryName] : null;
        this.Year = similarity.Year;

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
