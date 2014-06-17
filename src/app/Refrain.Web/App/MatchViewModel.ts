class MatchViewModel implements IPageViewModel, IMatchSelector
{
	public Query:KnockoutObservable<string> = ko.observable<string>("");
	public Matches: KnockoutObservableArray<Match> = ko.observableArray<Match>();
	public ExtraMatches: KnockoutObservableArray<Match> = ko.observableArray<Match>();
	public SelectedMatch: KnockoutObservable<Match> = ko.observable<Match>();
	public SelectedSong: KnockoutObservable<Song> = ko.observable<Song>();
	public SelectedSimilarity: KnockoutObservable<SongSimilarity> = ko.observable<SongSimilarity>();
	public SelectedOldSimilarity: KnockoutObservable<ISongViewModel> = ko.observable<ISongViewModel>();
	public SelectedSongSimilarity: KnockoutComputed<ISongViewModel> = ko.computed<ISongViewModel>(() => this.SelectedSimilarity() ? this.SelectedSimilarity() : this.SelectedOldSimilarity() ? this.SelectedOldSimilarity() : null);

	public ShareUrl: KnockoutObservable<string> = ko.observable<string>();
	public ShareMessage: KnockoutObservable<string> = ko.observable<string>();

	public CompareHelpVisible: KnockoutObservable<boolean> = ko.observable<boolean>(false);
	public SimilarityHelpVisible: KnockoutObservable<boolean> = ko.observable<boolean>(false);
	public AspectHelpVisible: KnockoutObservable<boolean> = ko.observable<boolean>(false);
	public CompareType: KnockoutObservable<number> = ko.observable<number>(1);

	public AspectTempo:KnockoutObservable<boolean> = ko.observable(true);
	public AspectRythm:KnockoutObservable<boolean> = ko.observable(true);
	public AspectMood:KnockoutObservable<boolean> = ko.observable(true);
	public AspectMelody:KnockoutObservable<boolean> = ko.observable(true);
	public AspectEnergy:KnockoutObservable<boolean> = ko.observable(true);
	public AspectTimbre:KnockoutObservable<boolean> = ko.observable(true);

	private Aspects:KnockoutComputed<string>;

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
		this.Aspects = ko.computed(() => (this.AspectTempo() ? "1" : "0") + (this.AspectRythm() ? "1" : "0") + (this.AspectMood() ? "1" : "0") + (this.AspectMelody() ? "1" : "0") + (this.AspectEnergy() ? "1" : "0") + (this.AspectTimbre() ? "1" : "0"));	
	}

	public Initialize(songId:string, compareType:string, aspects:string, campareSongId:string): void
	{
		twttr.ready(() => twttr.widgets.load());

		this._campareSongId = campareSongId;

		this._updatingInput = true;

		if (compareType)
			this.CompareType(parseInt(compareType));

		if (aspects)
		{
			var values = aspects.split("");

			this.AspectTempo(values[0] == "1");
			this.AspectRythm(values[1] == "1");
			this.AspectMood(values[2] == "1");
			this.AspectMelody(values[3] == "1");
			this.AspectEnergy(values[4] == "1");
			this.AspectTimbre(values[5] == "1");
		}

		this._updatingInput = false;

		if(songId)
			this.GetSong(songId);

		$("#SongQuery").focus();

		this.Query.subscribe(v => this.QueryChanged(v));
		this.CompareType.subscribe(v => this.CompareTypeChanged(v));
		this.Aspects.subscribe(v => this.AspectsChanged(v));
	}

	public Dispose(): void
	{

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

	private AspectsChanged(newValue: string): void
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

	public ToggleAspectHelp(): void
	{
		this.AspectHelpVisible(!this.AspectHelpVisible());
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
		this.SelectedOldSimilarity(null);
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
		this.CallWhenPortalReady(() => RefrainPortal.Song.Get(id, this.Aspects(), this.CompareType()).WithCallback(this.SongGetCompleted, this));
	}

	public SelectSimilarity(similarity:SongSimilarity):void
	{
		if (this.SelectedSimilarity() != null)
			this.SelectedSimilarity().IsSelected(false);

		similarity.IsSelected(true);

		this.SelectedOldSimilarity(null);
		this.SelectedSimilarity(null);
		this.SelectedSimilarity(similarity);

		window.location.hash = "Match/" + this.SelectedSong().Id + "/" + this.CompareType() + "/" + this.Aspects() + "/" + this.SelectedSimilarity().Id;

		$('html, body').animate({ scrollTop: $("#ExploreHeadline").offset().top }, 1000);

		this.LoadSongPlayer(this.SelectedSong());
		this.LoadComparePlayer(this.SelectedSimilarity());

		if (window.location.hostname != "localhost")
			this.ShareUrl(window.location.toString());
		else
			this.ShareUrl("http://refrain.dk" + window.location.pathname + window.location.hash);

		this.ShareMessage("I discovered " + this.SelectedSong().Title + " is " + (similarity.Distance < 0.2 ? "similar" : "dissimilar") + " to " + similarity.Title + " at " );

		twttr.widgets.load();
	}

	private SelectOldSimilarity(similarity: RefrainPortal.ISimpleSong): void
	{
		if (this.SelectedSimilarity() != null)
			this.SelectedSimilarity().IsSelected(false);

		this.SelectedSimilarity(null);
		this.SelectedOldSimilarity(new SimpleSongViewModel(similarity));

		$('html, body').animate({ scrollTop: $("#ExploreHeadline").offset().top }, 1000);

		this.LoadSongPlayer(this.SelectedSong());
		this.LoadComparePlayer(this.SelectedOldSimilarity());

		this.ShareUrl(null);
		this.ShareMessage(null);
	}

	private LoadSongPlayer(song: ISongViewModel):void
	{
		this._songPlayer = null;
		if (song.YoutubeUri)
		{
			var youtubeId = song.YoutubeUri.match(/[?&]v=([^&]+)/)[1];

			if (this._songPlayer == null)
				this._songPlayer = new YT.Player($("#SelectedFullInfo .YouTubePlayer")[0], { height: 300, width: 400, videoId: youtubeId });
			else if (this._songPlayer.getVideoUrl().match(/[?&]v=([^&]+)/)[1] != youtubeId)
				this._songPlayer.cueVideoById(youtubeId);
		}
		else
			this._songPlayer = null;
	}

	private LoadComparePlayer(song: ISongViewModel): void
	{
		this._compareSongPlayer = null;
		if (song.YoutubeUri)
		{
			var youtubeId = song.YoutubeUri.match(/[?&]v=([^&]+)/)[1];

			if (this._compareSongPlayer == null)
				this._compareSongPlayer = new YT.Player($("#CompareFullInfo .YouTubePlayer")[0], { height: 300, width: 400, videoId: youtubeId});
			else
				this._compareSongPlayer.cueVideoById(youtubeId);
		}
		else
			this._compareSongPlayer = null;
	}

	public ShareOnFacebook():void
	{
		FB.ui({
			method: 'share',
			href: this.ShareUrl(),
		}, (response) =>
		{
			ga('send', 'event', 'Share', 'Facebook', window.location.hash);
		});
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
			var allSimilarities = song.MostSimilar().concat(song.ExtraMostSimilar()).concat(song.LeastSimilar()).concat(song.ExtraLeastSimilar());

			for (var i = 0; i < allSimilarities.length; i++)
			{
				if (allSimilarities[i].Id == this._campareSongId)
				{
					this.SelectSimilarity(allSimilarities[i]);
					this._campareSongId = null;
					return;
				}
			}

			RefrainPortal.Search.By(this._campareSongId).WithCallback(this.SearchByCompleted, this);

			this._campareSongId = null;
		}
		else
			$('html, body').animate({ scrollTop: $("#SelectMatchHeadline").offset().top }, 1000);
	}

	private SearchByCompleted(response: CHAOS.Portal.Client.IPortalResponse<RefrainPortal.ISimpleSong>):void
	{
		if (response.Error != null)
		{
			console.log("Failed to get song via Search/By: " + response.Error.Message);
			return;
		}

		if (response.Body.Count != 1)
		{
			console.log("Failed to get song via Search/By, number songs returned: " + response.Body.Count);
			return;
		}

		this.SelectOldSimilarity(response.Body.Results[0]);
	}
}

interface ICountryInfo
{
	name: string;
	"alpha-2": string;
	"country-code": string
}