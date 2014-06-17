var SimpleSongViewModel = (function () {
    function SimpleSongViewModel(song) {
        this.Year = null;
        this.YoutubeUri = null;
        this.SpotifyId = null;
        this.Id = song.Id;
        this.Title = song.Text;
        this.Artist = song.ArtistName;
        this.CountryName = song.CountryName;
        this.CountryCode = CountryInfo[song.CountryName] ? CountryInfo[song.CountryName] : null;
        this.Year = song.ContestYear;

        if (song.YoutubeUri)
            this.YoutubeUri = song.YoutubeUri;
        if (song.SpotifyId)
            this.SpotifyId = song.SpotifyId;
    }
    return SimpleSongViewModel;
})();
