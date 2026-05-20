import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from "n8n-workflow";
import {
	ApplicationError,
	NodeConnectionTypes,
	NodeOperationError,
	sleep as n8nSleep,
} from "n8n-workflow";

const APIFY_API_BASE_URL = "https://api.apify.com/v2";
const DEFAULT_ACTOR_ID = "Newbs/reddit-comment-scraper";

const TERMINAL_RUN_STATUSES = new Set(["SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"]);

export class RedditCommentScraper implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Reddit Comment Scraper",
		name: "redditCommentScraper",
		icon: "file:redditCommentScraper.svg",
		group: ["transform"],
		version: 1,
		subtitle: '={{$parameter["operation"] === "startRunOnly" ? "Start run" : "Run and get comments"}}',
		description: "Run the Reddit Comment Scraper Apify Actor and return Reddit comments to n8n.",
		defaults: {
			name: "Reddit Comment Scraper",
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: "apifyApi",
				required: true,
			},
		],
		properties: [
			{
				displayName: "Operation",
				name: "operation",
				type: "options",
				noDataExpression: true,
				options: [
					{
						name: "Run and Get Comments",
						value: "runAndGetComments",
						description: "Start the Actor, wait for completion, and return dataset rows",
						action: 'Run the actor and get comments',
					},
					{
						name: "Start Run Only",
						value: "startRunOnly",
						description: "Start the Actor and return run metadata without waiting for results",
						action: 'Start an actor run',
					},
				],
				default: "runAndGetComments",
			},
			{
				displayName: "Actor ID",
				name: "actorId",
				type: "string",
				default: DEFAULT_ACTOR_ID,
				required: true,
				description: "Apify Actor ID. Use username/actor-name or username~actor-name.",
			},
			{
				displayName: "Reddit Post URLs",
				name: "postUrls",
				type: "string",
				typeOptions: {
					rows: 4,
				},
				default:
					"https://www.reddit.com/r/AskReddit/comments/ovihp9/what_city_would_you_never_ever_ever_live_in/",
				required: true,
				description: 'One or more Reddit post URLs, separated by new lines or commas',
			},
			{
				displayName: "Maximum Comments",
				name: "maxComments",
				type: "number",
				typeOptions: {
					minValue: 1,
					maxValue: 5000,
				},
				default: 500,
				description: 'Maximum number of comments to collect per Reddit post',
			},
			{
				displayName: "Include Nested Replies",
				name: "includeReplies",
				type: "boolean",
				default: true,
				description: 'Whether to collect nested replies and preserve thread context',
			},
			{
				displayName: "Sort Comments By",
				name: "sortBy",
				type: "options",
				options: [
					{ name: "Best", value: "best" },
					{ name: "Controversial", value: "controversial" },
					{ name: "New", value: "new" },
					{ name: "Old", value: "old" },
					{ name: "Q&A", value: "qa" },
					{ name: "Top", value: "top" },
				],
				default: "top",
				description: 'Comment sort order before collection',
			},
			{
				displayName: "Maximum Concurrent Posts",
				name: "maxConcurrency",
				type: "number",
				typeOptions: {
					minValue: 1,
					maxValue: 4,
				},
				default: 2,
				description: 'Maximum Reddit posts processed at the same time',
			},
			{
				displayName: "Use Apify Proxy",
				name: "useApifyProxy",
				type: "boolean",
				default: true,
				description: 'Whether to run the Actor with Apify Proxy configured',
			},
			{
				displayName: "Proxy Group",
				name: "proxyGroup",
				type: "options",
				displayOptions: {
					show: {
						useApifyProxy: [true],
					},
				},
				options: [
					{ name: "Residential", value: "RESIDENTIAL" },
					{ name: "Datacenter", value: "DATACENTER" },
				],
				default: "RESIDENTIAL",
				description: 'Apify Proxy group used by the Actor',
			},
			{
				displayName: "Proxy Country",
				name: "proxyCountry",
				type: "string",
				displayOptions: {
					show: {
						useApifyProxy: [true],
					},
				},
				default: "US",
				description: 'Two-letter country code for Apify Proxy, for example US, GB, DE, or FR',
			},
			{
				displayName: "Dataset Item Limit",
				name: "datasetItemLimit",
				type: "number",
				displayOptions: {
					show: {
						operation: ["runAndGetComments"],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 5000,
				},
				default: 1000,
				description: 'Maximum number of dataset rows returned to n8n after the Actor finishes',
			},
			{
				displayName: "Wait for Finish Seconds",
				name: "waitForFinishSeconds",
				type: "number",
				displayOptions: {
					show: {
						operation: ["runAndGetComments"],
					},
				},
				typeOptions: {
					minValue: 10,
					maxValue: 7200,
				},
				default: 900,
				description: 'Maximum time this n8n node waits for the Actor run to finish',
			},
			{
				displayName: "Poll Interval Seconds",
				name: "pollIntervalSeconds",
				type: "number",
				displayOptions: {
					show: {
						operation: ["runAndGetComments"],
					},
				},
				typeOptions: {
					minValue: 2,
					maxValue: 60,
				},
				default: 5,
				description: 'How often n8n checks the Apify Actor run status',
			},
			{
				displayName: "Build Tag",
				name: "buildTag",
				type: "string",
				default: "latest",
				description: 'Apify Actor build tag to run',
			},
			{
				displayName: "Memory MB",
				name: "memoryMbytes",
				type: "number",
				typeOptions: {
					minValue: 512,
					maxValue: 4096,
				},
				default: 1024,
				description: 'Memory allocated to the Actor run',
			},
			{
				displayName: "Actor Timeout Seconds",
				name: "actorTimeoutSeconds",
				type: "number",
				typeOptions: {
					minValue: 60,
					maxValue: 7200,
				},
				default: 1800,
				description: 'Maximum runtime allowed for the Apify Actor run',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const inputItems = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < inputItems.length; itemIndex++) {
			const operation = this.getNodeParameter("operation", itemIndex) as string;
			const actorId = this.getNodeParameter("actorId", itemIndex) as string;
			const actorInput = buildActorInput(this, itemIndex);
			const run = await startActorRun.call(this, actorId, actorInput, itemIndex);

			if (operation === "startRunOnly") {
				returnData.push({
					json: normalizeRunOutput(run, actorId),
					pairedItem: { item: itemIndex },
				});
				continue;
			}

			const finishedRun = await waitForRunToFinish.call(this, run, itemIndex);

			if (finishedRun.status !== "SUCCEEDED") {
				throw new NodeOperationError(
					this.getNode(),
					`Apify Actor run ${finishedRun.id} finished with status ${finishedRun.status}.`,
					{ itemIndex },
				);
			}

			const datasetId = stringValue(finishedRun.defaultDatasetId);
			if (!datasetId) {
				returnData.push({
					json: {
						...normalizeRunOutput(finishedRun, actorId),
						resultCount: 0,
						message: "Actor run succeeded but did not produce a default dataset.",
					},
					pairedItem: { item: itemIndex },
				});
				continue;
			}

			const datasetItems = await fetchDatasetItems.call(this, datasetId, itemIndex);

			if (datasetItems.length === 0) {
				returnData.push({
					json: {
						...normalizeRunOutput(finishedRun, actorId),
						apifyDatasetId: datasetId,
						resultCount: 0,
					},
					pairedItem: { item: itemIndex },
				});
				continue;
			}

			for (const datasetItem of datasetItems) {
				returnData.push({
					json: {
						...datasetItem,
						apifyActorId: actorId,
						apifyRunId: stringValue(finishedRun.id),
						apifyDatasetId: datasetId,
					},
					pairedItem: { item: itemIndex },
				});
			}
		}

		return [returnData];
	}
}

function buildActorInput(executeFunctions: IExecuteFunctions, itemIndex: number): IDataObject {
	const postUrls = parsePostUrls(
		executeFunctions.getNodeParameter("postUrls", itemIndex) as string,
		executeFunctions,
		itemIndex,
	);
	const useApifyProxy = executeFunctions.getNodeParameter("useApifyProxy", itemIndex) as boolean;
	const maxComments = clampNumber(
		executeFunctions.getNodeParameter("maxComments", itemIndex) as number,
		1,
		5000,
	);
	const maxConcurrency = clampNumber(
		executeFunctions.getNodeParameter("maxConcurrency", itemIndex) as number,
		1,
		4,
	);

	const actorInput: IDataObject = {
		postUrls,
		maxComments,
		includeReplies: executeFunctions.getNodeParameter("includeReplies", itemIndex) as boolean,
		sortBy: executeFunctions.getNodeParameter("sortBy", itemIndex) as string,
		maxConcurrency,
	};

	if (useApifyProxy) {
		actorInput.proxy = {
			useApifyProxy: true,
			apifyProxyGroups: [executeFunctions.getNodeParameter("proxyGroup", itemIndex) as string],
			apifyProxyCountry: executeFunctions.getNodeParameter("proxyCountry", itemIndex) as string,
		};
	}

	return actorInput;
}

async function startActorRun(
	this: IExecuteFunctions,
	actorId: string,
	actorInput: IDataObject,
	itemIndex: number,
): Promise<IDataObject> {
	const actorIdForUrl = actorIdToUrlSegment(actorId);
	const options: IHttpRequestOptions = {
		method: "POST",
		url: `${APIFY_API_BASE_URL}/acts/${actorIdForUrl}/runs`,
		qs: {
			build: this.getNodeParameter("buildTag", itemIndex) as string,
			memory: this.getNodeParameter("memoryMbytes", itemIndex) as number,
			timeout: this.getNodeParameter("actorTimeoutSeconds", itemIndex) as number,
		},
		body: actorInput,
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(this, "apifyApi", options);
	return extractApiData(response, "start Actor run");
}

async function waitForRunToFinish(
	this: IExecuteFunctions,
	run: IDataObject,
	itemIndex: number,
): Promise<IDataObject> {
	const runId = stringValue(run.id);
	if (!runId) {
		throw new NodeOperationError(this.getNode(), "Apify did not return a run ID.", { itemIndex });
	}

	const waitForFinishSeconds = clampNumber(
		this.getNodeParameter("waitForFinishSeconds", itemIndex) as number,
		10,
		7200,
	);
	const pollIntervalSeconds = clampNumber(
		this.getNodeParameter("pollIntervalSeconds", itemIndex) as number,
		2,
		60,
	);
	const deadline = Date.now() + waitForFinishSeconds * 1000;

	let latestRun = run;

	while (!TERMINAL_RUN_STATUSES.has(stringValue(latestRun.status))) {
		if (Date.now() > deadline) {
			throw new NodeOperationError(
				this.getNode(),
				`Timed out waiting for Apify Actor run ${runId} after ${waitForFinishSeconds} seconds.`,
				{ itemIndex },
			);
		}

		await sleep(pollIntervalSeconds * 1000);

		const response = await this.helpers.httpRequestWithAuthentication.call(this, "apifyApi", {
			method: "GET",
			url: `${APIFY_API_BASE_URL}/actor-runs/${encodeURIComponent(runId)}`,
			json: true,
		});
		latestRun = extractApiData(response, "get Actor run");
	}

	return latestRun;
}

async function fetchDatasetItems(
	this: IExecuteFunctions,
	datasetId: string,
	itemIndex: number,
): Promise<IDataObject[]> {
	const limit = clampNumber(
		this.getNodeParameter("datasetItemLimit", itemIndex) as number,
		1,
		5000,
	);
	const response = await this.helpers.httpRequestWithAuthentication.call(this, "apifyApi", {
		method: "GET",
		url: `${APIFY_API_BASE_URL}/datasets/${encodeURIComponent(datasetId)}/items`,
		qs: {
			clean: true,
			format: "json",
			limit,
		},
		json: true,
	});

	if (!Array.isArray(response)) {
		return [];
	}

	return response.filter((item): item is IDataObject => item && typeof item === "object");
}

function normalizeRunOutput(run: IDataObject, actorId: string): IDataObject {
	return {
		apifyActorId: actorId,
		apifyRunId: stringValue(run.id),
		apifyStatus: stringValue(run.status),
		apifyDatasetId: stringValue(run.defaultDatasetId),
		startedAt: run.startedAt,
		finishedAt: run.finishedAt,
		stats: run.stats,
	};
}

function extractApiData(response: unknown, action: string): IDataObject {
	if (!response || typeof response !== "object") {
		throw new ApplicationError(`Apify API returned an empty response while trying to ${action}.`);
	}

	const typedResponse = response as IDataObject;
	const data = typedResponse.data;

	if (!data || typeof data !== "object") {
		return typedResponse;
	}

	return data as IDataObject;
}

function parsePostUrls(
	rawValue: string,
	executeFunctions: IExecuteFunctions,
	itemIndex: number,
): string[] {
	const urls = rawValue
		.split(/[\n,]+/)
		.map((url) => url.trim())
		.filter(Boolean);

	if (urls.length === 0) {
		throw new NodeOperationError(thisNode(executeFunctions), "Add at least one Reddit post URL.", {
			itemIndex,
		});
	}

	for (const url of urls) {
		if (!/^https:\/\/www\.reddit\.com\/r\/[^/]+\/comments\/[^/]+\/.*$/i.test(url)) {
			throw new NodeOperationError(
				thisNode(executeFunctions),
				`Invalid Reddit post URL: ${url}`,
				{ itemIndex },
			);
		}
	}

	return [...new Set(urls)];
}

function actorIdToUrlSegment(actorId: string): string {
	return encodeURIComponent(actorId.trim().replace("/", "~"));
}

function stringValue(value: unknown): string {
	return typeof value === "string" ? value : "";
}

function clampNumber(value: number, min: number, max: number): number {
	const normalized = Number(value);
	if (!Number.isFinite(normalized)) return min;
	return Math.max(min, Math.min(max, normalized));
}

function sleep(milliseconds: number): Promise<void> {
	return n8nSleep(milliseconds);
}

function thisNode(executeFunctions: IExecuteFunctions) {
	return executeFunctions.getNode();
}
