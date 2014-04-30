class DiscoveryViewModel implements IPageViewModel
{
	public Initialize(): void
	{
		twttr.ready(() => twttr.widgets.load());
	}
} 