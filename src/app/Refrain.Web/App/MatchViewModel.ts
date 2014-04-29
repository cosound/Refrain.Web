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

		this._queryDelayHandle = setTimeout(() => this.Search(newValue), 1000);
	}

	private Search(value:string):void
	{
		this.Matches.removeAll();

		for (var i = 0; i < 5; i++)
		{
			this.Matches.push(new Match(value + i, m => this.Select(m)));
		}
	}

	private Select(match:Match):void
	{
		if (this.SelectedMatch() != null)
			this.SelectedMatch().IsSelected(false);

		this.SelectedMatch(match);
	}
} 