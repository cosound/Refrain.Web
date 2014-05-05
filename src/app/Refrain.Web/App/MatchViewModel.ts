﻿class MatchViewModel implements IPageViewModel, IMatchSelector
{
	public Query:KnockoutObservable<string> = ko.observable<string>("");
	public Matches: KnockoutObservableArray<Match> = ko.observableArray<Match>();
	public ExtraMatches: KnockoutObservableArray<Match> = ko.observableArray<Match>();
	public SelectedMatch: KnockoutObservable<Match> = ko.observable<Match>();
	public SelectedSong: KnockoutObservable<Song> = ko.observable<Song>();
	public SelectedSimilarity: KnockoutObservable<SongSimilarity> = ko.observable<SongSimilarity>();

	public ShareUrl: KnockoutObservable<string> = ko.observable<string>();
	public ShareMessage: KnockoutObservable<string> = ko.observable<string>();

	public CompareHelpVisible: KnockoutObservable<boolean> = ko.observable<boolean>(false);
	public SimilarityHelpVisible: KnockoutObservable<boolean> = ko.observable<boolean>(false);
	public CompareType: KnockoutObservable<number> = ko.observable<number>(3);

	private _queryDelayHandle: number;
	private _campareSongId: string;
	private _portalReadyCallback: () => void;
	private _portalIsReady: boolean = false;
	private _countryInfos: KnockoutObservable<ICountryInfo[]> = ko.observable<ICountryInfo[]>();

	private _songPlayer:YT.Player;
	private _compareSongPlayer: YT.Player;
	private _updatingInput:boolean = false;

	constructor()
	{
		this.Query.subscribe(v => this.QueryChanged(v));
		this.CompareType.subscribe(v => this.CompareTypeChanged(v));
	}

	public Initialize(songId:string, compareType:string, campareSongId:string): void
	{
		twttr.ready(() => twttr.widgets.load());

		this._campareSongId = campareSongId;

		if (compareType)
		{
			this._updatingInput = true;
			this.CompareType(parseInt(compareType));
			this._updatingInput = false;
		}

		if(songId)
			this.GetSong(songId);

		$("#SongQuery").focus();
	}

	public PortalReady(): void
	{
		this._portalIsReady = true;
		if (this._portalReadyCallback != null)
			this._portalReadyCallback();
	}

	private CallWhenPortalReady(callback:() => void):void
	{
		if (this._portalIsReady)
			callback();
		else
			this._portalReadyCallback = callback;
	}

	private QueryChanged(newValue:string):void
	{
		if (this._updatingInput) return;

		clearTimeout(this._queryDelayHandle);

		this._queryDelayHandle = setTimeout(() => this.Search(newValue), 200);
	}

	private CompareTypeChanged(newValue: number): void
	{
		if (this._updatingInput) return;

		this.GetSong(this.SelectedSong().Id);
	}

	public SearchAndUpdateQuery(value:string):void
	{
		this._updatingInput = true;

		this.Query(value);

		this.Search(value);

		this._updatingInput = false;
	}

	public ToggleSimilarityHelp():void
	{
		this.SimilarityHelpVisible(!this.SimilarityHelpVisible());
	}

	public ToggleCompareHelp(): void
	{
		this.CompareHelpVisible(!this.CompareHelpVisible());
	}

	private Search(value:string):void
	{
		if (value == "")
			this.Matches.removeAll();
		else
			this.CallWhenPortalReady(() => RefrainPortal.Search.Get(value, 30).WithCallback(this.SearchGetCompleted, this));
	}

	private SearchGetCompleted(response:CHAOS.Portal.Client.IPortalResponse<any>):void
	{
		this.Matches.removeAll();
		this.ExtraMatches.removeAll();

		if (response.Error != null)
		{
			console.log("Failed to get search results: " + response.Error.Message);
			return;
		}

		for (var i = 0; i < response.Body.Results.length; i++)
		{
			if (i < 5)
				this.Matches.push(new Match(response.Body.Results[i], this));
			else
				this.ExtraMatches.push(new Match(response.Body.Results[i], this));
		}
	}

	public SelectMatch(match:Match):void
	{
		if (this.SelectedMatch() != null)
			this.SelectedMatch().IsSelected(false);

		this.SelectedSimilarity(null);
		this.SelectedSong(null);
		this._songPlayer = null;
		this._compareSongPlayer = null;

		this.GetSong(match.Id);

		match.IsSelected(true);

		window.location.hash = "Match/" + match.Id + "/";

		this.SelectedMatch(match);
	}

	public ShowExtraMatches():void
	{
		for (var i = 0; this.ExtraMatches().length > 0 && i < 5; i++)
			this.Matches.push(this.ExtraMatches.shift());
	}

	private GetSong(id:string)
	{
		this.CallWhenPortalReady(() => RefrainPortal.Song.Get(id, 111111, this.CompareType()).WithCallback(this.SongGetCompleted, this));
	}

	public SelectSimilarity(similarity:SongSimilarity):void
	{
		if (this.SelectedSimilarity() != null)
			this.SelectedSimilarity().IsSelected(false);

		similarity.IsSelected(true);

		this.SelectedSimilarity(null);
		this.SelectedSimilarity(similarity);

		window.location.hash = "Match/" + this.SelectedSong().Id + "/" + this.CompareType() + "/" + this.SelectedSimilarity().Id;

		$('html, body').animate({ scrollTop: $("#ExploreHeadline").offset().top }, 1000);

		this._songPlayer = null;
		if (this.SelectedSong().YoutubeId)
		{
			if (this._songPlayer == null)
				this._songPlayer = new YT.Player($("#SelectedFullInfo .YouTubePlayer")[0], { height: 300, width: 400, videoId: this.SelectedSong().YoutubeId });
			else if (this._songPlayer.getVideoUrl().match(/[?&]v=([^&]+)/)[1] != this.SelectedSong().YoutubeId)
				this._songPlayer.cueVideoById(this.SelectedSong().YoutubeId);
		}
		else
			this._songPlayer = null;

		this._compareSongPlayer = null;
		if (this.SelectedSimilarity().YoutubeId)
		{
			if (this._compareSongPlayer == null)
				this._compareSongPlayer = new YT.Player($("#CompareFullInfo .YouTubePlayer")[0], { height: 300, width: 400, videoId: this.SelectedSimilarity().YoutubeId });
			else
				this._compareSongPlayer.cueVideoById(this.SelectedSimilarity().YoutubeId);
		}
		else
			this._compareSongPlayer = null;

		if (window.location.hostname != "localhost")
			this.ShareUrl(window.location.toString());
		else
			this.ShareUrl("http://refrain.dk" + window.location.pathname + window.location.hash);

		this.ShareMessage("I discovered " + this.SelectedSong().Title + " is " + (similarity.Distance < 0.2 ? "similar" : "dissimilar") + " to " + similarity.Title + " at " );

		twttr.widgets.load();
		FB.XFBML.parse();
	}

	private SongGetCompleted(response:CHAOS.Portal.Client.IPortalResponse<RefrainPortal.ISong>):void
	{
		if (response.Error != null)
		{
			console.log("Failed to get Song: " + response.Error.Message);
			return;
		}

		if (response.Body.Count != 1)
		{
			console.log("Failed to get Song, number songs returned: " + response.Body.Count);
			return;
		}

		var song = new Song(response.Body.Results[0], this);
		this.SelectedSong(song);

		if (this._campareSongId != null)
		{
			for (var i = 0; i < song.MostSimilar.length; i++)
			{
				if (song.MostSimilar[i].Id == this._campareSongId)
				{
					this.SelectSimilarity(song.MostSimilar[i]);
					this._campareSongId = null;
					return;
				}
			}

			for (i = 0; i < song.LeastSimilar.length; i++)
			{
				if (song.LeastSimilar[i].Id == this._campareSongId)
				{
					this.SelectSimilarity(song.LeastSimilar[i]);
					this._campareSongId = null;
					return;
				}
			}
		}

		$('html, body').animate({ scrollTop: $("#SelectMatchHeadline").offset().top }, 1000);
	}
}

interface ICountryInfo
{
	name: string;
	"alpha-2": string;
	"country-code": string
}