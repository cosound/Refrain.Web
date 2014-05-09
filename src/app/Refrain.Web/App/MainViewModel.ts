class MainViewModel
{
	public CurrentPage: KnockoutObservable<string> = ko.observable<string>();
	public CurrentPageViewModel: KnockoutObservable<IPageViewModel> = ko.observable<IPageViewModel>();

	private _client:CHAOS.Portal.Client.IPortalClient;

	constructor()
	{
		this._client = CHAOS.Portal.Client.Initialize("http://api.refrain.dk/");
		twttr.events.bind('tweet', (ev: any) => this.LogTweet(ev));
		FB.Event.subscribe('edge.create', (response:string) => this.LogFacebook(response));

		$(window).bind("hashchange", (e: Event) => this.HashChange());
		this.HashChange();
	}

	private LogTweet(event:any):void
	{
		ga('send', 'event', 'Share', 'Twitter', window.location.hash);
	}

	private LogFacebook(event: any): void
	{
		ga('send', 'event', 'Share', 'Facebook', window.location.hash);
	}

	private HashChange()
	{
		var hash = window.location.hash.length == 0 ? [""] : window.location.hash.substr(1).split("/");

		var page = hash.shift();

		ga('send', 'pageview', { 'page': "/" + window.location.hash });

		if (page == this.CurrentPage()) return;

		if (this.CurrentPageViewModel() != null) this.CurrentPageViewModel().Dispose();

		this.CurrentPage(null);
		
		switch(page)
		{
			case "":
				this.CurrentPageViewModel(new HomeViewModel());
				break;
			case "Match":
				this.CurrentPageViewModel(new MatchViewModel());
				break;
			case "Mood":
				this.CurrentPageViewModel(new MoodViewModel());
				break;
			case "Discovery":
				this.CurrentPageViewModel(new DiscoveryViewModel());
				break;
			case "About":
				this.CurrentPageViewModel(new AboutViewModel());
				break;
			default:
				this.CurrentPageViewModel(new HomeViewModel());
		}

		this.CurrentPage(page);

		if (this.CurrentPageViewModel() != null)
		{
			this.CurrentPageViewModel().Initialize.apply(this.CurrentPageViewModel(), hash);

			if (this._client.HasSession())
				this.CurrentPageViewModel().PortalReady();
			else
				this._client.SessionAcquired().Add(h => this.CurrentPageViewModel().PortalReady());
		}
	}
}

interface IPageViewModel
{
	Initialize(...parameers: string[]): void;
	PortalReady(): void;
	Dispose():void;
}

declare var ga:(...parameter:any[])=>void;