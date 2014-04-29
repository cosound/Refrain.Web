class Match
{
	public Title: string;
	
	public IsSelected: KnockoutObservable<boolean> = ko.observable(false);

	private _selectCallback: (match: Match) => void;

	constructor(title:string, selectCallback:(match:Match)=>void)
	{
		this.Title = title;
		this._selectCallback = selectCallback;
	}

	public Select():boolean
	{
		this._selectCallback(this);
		this.IsSelected(true);

		return false;
	}
} 