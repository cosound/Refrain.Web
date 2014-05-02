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
		this.Artist = song.ArtistName ? song.ArtistName : "Heps";

		if (song.YoutubeUri)
			this.YoutubeId = song.YoutubeUri.match(/[?&]v=([^&]+)/)[1];
		if (song.YoutubeUri)
			this.SpotifyId = song.SpotifyId;

		var i = 0;
		while (this.MostSimilar.length < 5 && i != song.Similarity.Songs.length)
		{
			if (song.Similarity.Songs[i].SongId != this.Id)
				this.MostSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));

			i++;
		}

		i = song.Similarity.Songs.length - 1
		while (this.LeastSimilar.length < 5 && i >= 0)
		{
			if (song.Similarity.Songs[i].SongId != this.Id)
				this.LeastSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));

			i--;
		}
	}
} 