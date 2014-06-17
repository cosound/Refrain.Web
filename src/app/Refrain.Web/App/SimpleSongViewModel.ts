class SimpleSongViewModel implements ISongViewModel
{
	public Id: string;
	public Title: string;
	public Artist: string;
	public CountryName: string;
	public CountryCode: string;
	public Year: number = null;
	public YoutubeUri: string = null;
	public SpotifyId: string = null;

	constructor(song: RefrainPortal.ISimpleSong)
	{
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
} 