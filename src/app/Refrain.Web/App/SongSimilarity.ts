class SongSimilarity
{
	public Id: string;

	public IsSelected: KnockoutObservable<boolean> = ko.observable(false);

	private _selector: IMatchSelector;

	constructor(similarity:RefrainPortal.ISongSimilarity, selector:IMatchSelector)
	{
		this.Id = similarity.SongId;

		this._selector = selector;
	}

	public Select():boolean
	{
		if(!this.IsSelected())
			this._selector.SelectSimilarity(this);

		return false;
	}
} 