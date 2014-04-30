class Match
{
	public Id:string;
	public Title: string;
	
	public IsSelected: KnockoutObservable<boolean> = ko.observable(false);

	private _selector:IMatchSelector;

	constructor(match:RefrainPortal.ISearchMatch, selector:IMatchSelector)
	{
		this.Id = match.Id;
		this.Title = match.Text;
		this._selector = selector;
	}

	public Select():boolean
	{
		if (!this.IsSelected())
			this._selector.SelectMatch(this);

		return false;
	}
} 