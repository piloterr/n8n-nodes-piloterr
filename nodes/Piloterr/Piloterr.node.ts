import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { piloterrApiRequest } from './GenericFunctions';

import { enrichmentFields, enrichmentOperations } from './EnrichmentDescription';
import { linkedinFields, linkedinOperations } from './LinkedinDescription';

export class Piloterr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Piloterr',
		name: 'piloterr',
		icon: 'file:piloterr.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ":" + $parameter["operation"]}}',
		description: 'Consume Piloterr API',
		defaults: {
			name: 'Piloterr',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'piloterrApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://piloterr.com/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Enrichment',
						value: 'enrichment',
						description: 'Company API allows you to look up a company by their domain',
					},
					{
						name: 'Linkedin',
						value: 'linkedin',
						description: 'Get in-depth information on LinkedIn professionals, posts, companies, jobs',
					},
				],
				default: 'enrichment',
			},
			...enrichmentOperations,
			...enrichmentFields,
			...linkedinOperations,
			...linkedinFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;
		const qs: IDataObject = {};
		let responseData;
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		for (let i = 0; i < length; i++) {
			try {
				if (resource === 'enrichment') {
					const domain = this.getNodeParameter('domain', i) as string;
					if (operation === 'company') {
						responseData = await piloterrApiRequest.call(
							this,
							'GET',
							`/v2/company?query=${domain}`,
							{},
							qs,
						);
					} else if (operation === 'email pattern') {
						responseData = await piloterrApiRequest.call(
							this,
							'GET',
							`/v2/company/email_pattern?query=${domain}`,
							{},
							qs,
						);
					}
				} else if (resource === 'linkedin') {
					const query = this.getNodeParameter('query', i) as string;
					if (operation === 'company info') {
						responseData = await piloterrApiRequest.call(
							this,
							'GET',
							`/v2/linkedin/company/info?query=${query}`,
							{},
							qs,
						);
					} else if (operation === 'company employee info') {
						responseData = await piloterrApiRequest.call(
							this,
							'GET',
							`/v2/linkedin/company/employee_info?query=${query}`,
							{},
							qs,
						);
					} else if (operation === 'company employee count') {
						const status = this.getNodeParameter('status', i) as string;
						responseData = await piloterrApiRequest.call(
							this,
							'GET',
							`/v2/linkedin/company/employee_count?query=${query}&status=${status}`,
							{},
							qs,
						);
					} else if (operation === 'job search') {
						const page = this.getNodeParameter('page', i) as string;
						responseData = await piloterrApiRequest.call(
							this,
							'GET',
							`/v2/linkedin/job/search?query=${query}&page=${page}`,
							{},
							qs,
						);
					} else if (operation === 'job info') {
						responseData = await piloterrApiRequest.call(
							this,
							'GET',
							`/v2/linkedin/job/info?query=${query}`,
							{},
							qs,
						);
					}
				}
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message, json: {} });
					continue;
				}
				throw error;
			}
		}
		return this.prepareOutputData(returnData);
	}
}
