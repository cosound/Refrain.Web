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
			this.YoutubeId = song.YoutubeUri.substr(song.YoutubeUri.indexOf("=") + 1);
		if (song.YoutubeUri)
			this.SpotifyId = song.SpotifyId;

		for (var i = 0; i < 3 && i < song.Similarity.Songs.length; i++)
			this.MostSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));

		for (i = song.Similarity.Songs.length - 1; i >= 0 && i >= song.Similarity.Songs.length - 3; i--)
			this.LeastSimilar.push(new SongSimilarity(song.Similarity.Songs[i], selector));
	}
} 