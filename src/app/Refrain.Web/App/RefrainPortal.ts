module RefrainPortal
{
	export class Search
	{
		public static Get(query: string, pageSize:number = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<ISearchMatch>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Search/Get", CHAOS.Portal.Client.HttpMethod.Get, { query: query, pageSize: pageSize }, true);
		}
	}

	export class Song
	{
		public static Get(id: string, type: number, dataSet:number, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<ISong>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Song/Get", CHAOS.Portal.Client.HttpMethod.Get, { id: id, type: type, dataSet: dataSet }, true);
		}
	}

	export class TwitterMood
	{
		public static Get(country: string[]= null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("TwitterMood/Get", CHAOS.Portal.Client.HttpMethod.Get, { country: country }, true);
		}
	}

	export class Tweet
	{
		public static Get(groupLimit:number = null, country:string[] = null, serviceCaller: CHAOS.Portal.Client.IServiceCaller = null): CHAOS.Portal.Client.ICallState<any>
		{
			if (serviceCaller == null)
				serviceCaller = CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller();

			return serviceCaller.CallService("Tweet/Get", CHAOS.Portal.Client.HttpMethod.Get, { groupLimit: groupLimit, country: country }, true);
		}
	}

	export interface ISearchMatch
	{
		Id:string;
		Text:string;
		ArtistName: string;
		CountryName: string;
		ContestYear: number;
	}

	export interface ISong
	{
		Id: string;
		Title: string;
		ArtistName: string;
		CountryName: string;
		Year: number;
		YoutubeUri:string;
		SpotifyId:string;
		Similarity: ISimilarity;
	}

	export interface ISimilarity
	{
		Type: number;
		Songs: ISongSimilarity[];
	}

	export interface ISongSimilarity
	{
		SongId: string;
		SongTitle: string;
		ArtistName: string;
		CountryName: string;
		Year: number;
		YoutubeUri: string;
		SpotifyId: string;
		Rank: number;
		Distance: number;
		RelativeImportance: string;
	}
}