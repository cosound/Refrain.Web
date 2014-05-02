class Song
{
	public Id:string;
	public Title: string;
	public Artist: string;
	public YoutubeId:string;
	public SpotifyId:string;
	public MostSimilar:SongSimilarity[] = [];
	public LeastSimilar:SongSimilarity[] = [];

	constructor(song:RefrainPortal.ISong, selector:IMatchSelector)
	{
		this.Id = song.Id;
		this.Title = song.Title;
		this.Artist = song.ArtistName ? song.ArtistName : "Peter";

		if (song.YoutubeUri)
			this.YoutubeId = song.YoutubeUri.match(/[?&]v=([^&]+)/)[1];
		if (song.YoutubeUri)
			this.SpotifyId = song.SpotifyId;

		for (var i = 0; this.MostSimilar.length < 5 && i != song.Similarity.Songs.length; i++)
		{
			if (song.Similarity.Songs[i].SongId == this.Id) continue;

			this.MostSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));
		}

		for (i = song.Similarity.Songs.length - 1; this.LeastSimilar.length < 5 && i >= 0; i--)
		{
			if (song.Similarity.Songs[i].SongId == this.Id) continue;

			this.LeastSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));
		}
	}
} 