class Song implements ISongViewModel
{
	public Id:string;
	public Title: string;
	public Artist: string;
	public CountryName: string;
	public CountryCode: string;
	public Year: number = null;
	public YoutubeId:string = null;
	public SpotifyId:string = null;
	public MostSimilar: KnockoutObservableArray<SongSimilarity> = ko.observableArray <SongSimilarity>();
	public LeastSimilar: KnockoutObservableArray<SongSimilarity> = ko.observableArray<SongSimilarity>();

	public ExtraMostSimilar: KnockoutObservableArray<SongSimilarity> = ko.observableArray<SongSimilarity>();
	public ExtraLeastSimilar: KnockoutObservableArray<SongSimilarity> = ko.observableArray <SongSimilarity>();

	constructor(song:RefrainPortal.ISong, selector:IMatchSelector)
	{
		this.Id = song.Id;
		this.Title = song.Title;
		this.Artist = song.ArtistName;
		this.CountryName = song.CountryName;
		this.CountryCode = CountryInfo[song.CountryName] ? CountryInfo[song.CountryName] : null;
		this.Year = song.Year;

		if (song.YoutubeUri)
			this.YoutubeId = song.YoutubeUri.match(/[?&]v=([^&]+)/)[1];
		if (song.SpotifyId)
			this.SpotifyId = song.SpotifyId;

		for (var i = 0; i < song.Similarity.Songs.length; i++)
		{
			var similarity = new SongSimilarity(song.Similarity.Songs[i], selector);

			if (similarity.Id == this.Id) continue;

			if (i < song.Similarity.Songs.length / 2)
			{
				if (this.MostSimilar().length < 5)
					this.MostSimilar.push(similarity);
				else
					this.ExtraMostSimilar.push(similarity);
			}
			else
			{
				if (this.LeastSimilar().length < 5)
					this.LeastSimilar.push(similarity);
				else
					this.ExtraLeastSimilar.push(similarity);
			}
		}
	}

	public ShowExtraMostSimilar(): void
	{
		for (var i = 0; this.ExtraMostSimilar().length > 0 && i < 5; i++)
			this.MostSimilar.push(this.ExtraMostSimilar.shift());
	}

	public ShowExtraLeastSimilar(): void
	{
		for (var i = 0; this.ExtraLeastSimilar().length > 0 && i < 5; i++)
			this.LeastSimilar.push(this.ExtraLeastSimilar.shift());
	}
} 