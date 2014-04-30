class MatchViewModel implements IPageViewModel, IMatchSelector
{
	public Query:KnockoutObservable<string> = ko.observable<string>("");
	public Matches: KnockoutObservableArray<Match> = ko.observableArray<Match>();
	public SelectedMatch: KnockoutObservable<Match> = ko.observable<Match>();
	public SelectedSong: KnockoutObservable<Song> = ko.observable<Song>();
	public SelectedSimilarity: KnockoutObservable<SongSimilarity> = ko.observable<SongSimilarity>();

	private _queryDelayHandle: number;

	constructor()
	{
		this.Query.subscribe(v => this.QueryChanged(v));
	}

	public Initialize(): void
	{
		twttr.ready(() => twttr.widgets.load());
	}

	private QueryChanged(newValue:string):void
	{
		clearTimeout(this._queryDelayHandle);

		this._queryDelayHandle = setTimeout(() => this.Search(newValue), 500);
	}

	private Search(value:string):void
	{
		if (value == "")
			this.Matches.removeAll();
		else
			RefrainPortal.Search.Get(value).WithCallback(this.SearchGetCompleted, this);
	}

	private SearchGetCompleted(response:CHAOS.Portal.Client.IPortalResponse<any>):void
	{
		this.Matches.removeAll();
		
		if (response.Error != null)
		{
			console.log("Failed to get search results: " + response.Error.Message);
			return;
		}

		for (var i = 0; i < response.Body.Results.length; i++)
			this.Matches.push(new Match(response.Body.Results[i], this));
	}

	public SelectMatch(match:Match):void
	{
		if (this.SelectedMatch() != null)
			this.SelectedMatch().IsSelected(false);

		RefrainPortal.Song.Get(match.Id, 110001).WithCallback(this.SongGetCompleted, this);

		match.IsSelected(true);

		this.SelectedMatch(match);
	}

	public SelectSimilarity(similarity:SongSimilarity):void
	{
		if (this.SelectedSimilarity() != null)
			this.SelectedSimilarity().IsSelected(false);

		similarity.IsSelected(true);

		this.SelectedSimilarity(similarity);

		$('html, body').animate({ scrollTop: $("#ExploreHeadline").offset().top}, 1000);
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

		this.SelectedSong(new Song(response.Body.Results[0], this));

		$('html, body').animate({ scrollTop: $("#SelectMatchHeadline").offset().top }, 1000);
	}
} 