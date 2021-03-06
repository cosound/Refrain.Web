﻿class Match
{
	public Id:string;
	public Title: string;
	public Artist: string;
	public CountryName: string = null;
	public CountryCode: string = null;
	public Year: number = null;

	public YoutubeUri: string = null;
	public SpotifyId: string = null;
	
	public IsSelected: KnockoutObservable<boolean> = ko.observable(false);

	private _selector:IMatchSelector;

	constructor(match:RefrainPortal.ISearchMatch, selector:IMatchSelector)
	{
		this.Id = match.Id;
		this.Title = match.Text;
		this.Artist = match.ArtistName;
		this.CountryName = match.CountryName;
		this.CountryCode = CountryInfo[match.CountryName];
		this.Year = match.ContestYear;

		if (match.YoutubeUri)
			this.YoutubeUri = match.YoutubeUri;
		if (match.SpotifyId)
			this.SpotifyId = match.SpotifyId;

		this._selector = selector;
	}

	public Select():boolean
	{
		if (!this.IsSelected())
			this._selector.SelectMatch(this);

		return false;
	}
} 