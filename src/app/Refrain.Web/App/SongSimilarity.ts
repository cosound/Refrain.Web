class SongSimilarity
{
	public Id: string;
	public Title:string;
	public Tempo:number;
	public Rythm:number;
	public Mood:number;
	public Melody:number;
	public Energy:number;
	public Timbre: number;
	public Distance:number;

	public IsSelected: KnockoutObservable<boolean> = ko.observable(false);

	private _selector: IMatchSelector;

	constructor(similarity:RefrainPortal.ISongSimilarity, selector:IMatchSelector)
	{
		this.Id = similarity.SongId;
		this.Title = similarity.SongTitle;
		this.Distance = similarity.Distance;

		var similarities = similarity.RelativeImportance.split(" ");

		this.Tempo = parseFloat(similarities[0]);
		this.Rythm = parseFloat(similarities[1]);
		this.Mood = parseFloat(similarities[2]);
		this.Melody = parseFloat(similarities[3]);
		this.Energy = parseFloat(similarities[4]);
		this.Timbre = parseFloat(similarities[5]);

		this._selector = selector;
	}

	public Select():boolean
	{
		if(!this.IsSelected())
			this._selector.SelectSimilarity(this);

		return false;
	}
} 