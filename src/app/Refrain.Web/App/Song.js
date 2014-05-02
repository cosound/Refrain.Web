var Song = (function () {
    function Song(song, selector) {
        this.MostSimilar = [];
        this.LeastSimilar = [];
        this.Id = song.Id;
        this.Title = song.Title;
        this.Artist = song.ArtistName ? song.ArtistName : "Heps";
        this.YoutubeUri = song.YoutubeUri;
        this.SpotifyId = song.SpotifyId;

        for (var i = 0; i < 3 && i < song.Similarity.Songs.length; i++)
            this.MostSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));

        for (i = song.Similarity.Songs.length - 1; i >= 0 && i >= song.Similarity.Songs.length - 3; i--)
            this.LeastSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));
    }
    return Song;
})();
