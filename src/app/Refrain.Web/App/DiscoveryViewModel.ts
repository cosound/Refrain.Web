class DiscoveryViewModel implements IPageViewModel
{
	public Initialize(): void
	{
		twttr.ready(() =>
		{
			try
			{
				twttr.widgets.load();
			} catch (error)
			{
				console.log("Twitter caused an error: " + error.message);
			}
		});

	}

	public PortalReady(): void
	{

	}

	public Dispose(): void
	{

	}
} 