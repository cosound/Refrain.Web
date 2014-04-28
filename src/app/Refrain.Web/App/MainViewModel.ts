class MainViewModel
{
	public CurrentPage: KnockoutObservable<string> = ko.observable<string>();
	public CurrentPageViewModel: KnockoutObservable<IPageViewModel> = ko.observable<IPageViewModel>();

	constructor()
	{
		$(window).bind("hashchange", (e: Event) => this.HashChange());
		this.HashChange();
	}

	private HashChange()
	{
		var hash = window.location.hash.length == 0 ? "" : window.location.hash.substr(1);

		var page = hash;

		this.CurrentPage(null);
		
		switch(page)
		{
			case "":
				this.CurrentPageViewModel(new HomeViewModel());
				break;
			case "Mood":
				this.CurrentPageViewModel(new MoodViewModel());
				break;
			default:
				this.CurrentPageViewModel(new HomeViewModel());
		}

		this.CurrentPage(page);

		if (this.CurrentPageViewModel() != null)
			this.CurrentPageViewModel().Initialize();
	}
}

interface IPageViewModel
{
	Initialize():void;
}