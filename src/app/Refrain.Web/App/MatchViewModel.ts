class MatchViewModel implements IPageViewModel
{
	public Query:KnockoutObservable<string> = ko.observable<string>("");
	public Matches: KnockoutObservableArray<Match> = ko.observableArray<Match>();
	public SelectedMatch:KnockoutObservable<Match> = ko.observable<Match>();

	private _queryDelayHandle: number;

	constructor()
	{
		this.Query.subscribe(v => this.QueryChanged(v));
	}

	public Initialize(): void
	{

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
		{
			this.Matches.push(new Match(<string>response.Body.Results[i].Text, m => this.Select(m)));
		}
	}

	private Select(match:Match):void
	{
		if (this.SelectedMatch() != null)
			this.SelectedMatch().IsSelected(false);

		this.SelectedMatch(match);
	}

	
} 