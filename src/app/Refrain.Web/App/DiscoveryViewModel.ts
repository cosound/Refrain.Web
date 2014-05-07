class DiscoveryViewModel implements IPageViewModel
{
	public Initialize(): void
	{
		twttr.ready(() => twttr.widgets.load());
	}

	public PortalReady(): void
	{

	}

	public Dispose(): void
	{

	}
} 