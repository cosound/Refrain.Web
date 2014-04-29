module RefrainPortal
{
	export class Search
	{
		public static Get(query: string, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Search/Get", CHAOS.Portal.Client.HttpMethod.Get, { query: query }, true);
		}
	}
}