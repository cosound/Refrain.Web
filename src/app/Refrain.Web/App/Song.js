var Song = (function () {
    function Song(song, selector) {
        this.Year = null;
        this.YoutubeUri = null;
        this.SpotifyId = null;
        this.MostSimilar = ko.observableArray();
        this.LeastSimilar = ko.observableArray();
        this.ExtraMostSimilar = ko.observableArray();
        this.ExtraLeastSimilar = ko.observableArray();
        this.Id = song.Id;
        this.Title = song.Title;
        this.Artist = song.ArtistName;
        this.CountryName = song.CountryName;
        this.CountryCode = CountryInfo[song.CountryName] ? CountryInfo[song.CountryName] : null;
        this.Year = song.Year;

        if (song.YoutubeUri)
            this.YoutubeUri = song.YoutubeUri;
        if (song.SpotifyId)
            this.SpotifyId = song.SpotifyId;

        for (var i = 0; i < song.Similarity.Songs.length; i++) {
            var similarity = new SongSimilarity(song.Similarity.Songs[i], selector);

            if (similarity.Id == this.Id)
                continue;

            if (i < song.Similarity.Songs.length / 2) {
                if (this.MostSimilar().length < 5)
                    this.MostSimilar.push(similarity);
                else
                    this.ExtraMostSimilar.push(similarity);
            } else {
                if (this.LeastSimilar().length < 5)
                    this.LeastSimilar.push(similarity);
                else
                    this.ExtraLeastSimilar.push(similarity);
            }
        }
    }
    Song.prototype.ShowExtraMostSimilar = function () {
        for (var i = 0; this.ExtraMostSimilar().length > 0 && i < 5; i++)
            this.MostSimilar.push(this.ExtraMostSimilar.shift());
    };

    Song.prototype.ShowExtraLeastSimilar = function () {
        for (var i = 0; this.ExtraLeastSimilar().length > 0 && i < 5; i++)
            this.LeastSimilar.push(this.ExtraLeastSimilar.shift());
    };
    return Song;
})();
