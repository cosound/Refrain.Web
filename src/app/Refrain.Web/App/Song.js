var Song = (function () {
    function Song(song, selector) {
        this.MostSimilar = [];
        this.LeastSimilar = [];
        this.Id = song.Id;

        for (var i = 0; i < 3 && i < song.Similarity.Songs.length; i++)
            this.MostSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));

        for (var i = song.Similarity.Songs.length - 1; i >= 0 && i >= song.Similarity.Songs.length - 3; i--)
            this.LeastSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));
    }
    return Song;
})();
