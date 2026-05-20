import type {
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	IAuthenticateGeneric,
	INodeProperties,
} from "n8n-workflow";

export class ApifyApi implements ICredentialType {
	name = "apifyApi";

	displayName = "Apify API";

	icon: Icon = "file:../nodes/RedditCommentScraper/redditCommentScraper.svg";

	documentationUrl = "https://docs.apify.com/platform/integrations/n8n";

	properties: INodeProperties[] = [
		{
			displayName: "API Token",
			name: "apiToken",
			type: "string",
			typeOptions: {
				password: true,
			},
			default: "",
			required: true,
			description: "Apify API token from Apify Console > Settings > Integrations.",
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: "generic",
		properties: {
			headers: {
				Authorization: "=Bearer {{$credentials.apiToken}}",
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: "https://api.apify.com/v2",
			url: "/users/me",
		},
	};
}
