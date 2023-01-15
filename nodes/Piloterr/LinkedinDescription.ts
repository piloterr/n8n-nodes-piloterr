import { INodeProperties } from 'n8n-workflow';

export const linkedinOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['linkedin', 'linkedin'],
			},
		},
		options: [
			{
				name: 'Company Employee Count',
				value: 'company employee count',
				description: 'Count employee of a company',
				action: 'Enrich a linkedin company',
			},
			{
				name: 'Company Employee Info',
				value: 'company employee info',
				description: 'Look up employee of a company',
				action: 'Enrich a linkedin company',
			},
			{
				name: 'Company Info',
				value: 'company info',
				description: 'Look up a linkedin company',
				action: 'Enrich a linkedin company',
			},
			{
				name: 'Company Job Info',
				value: 'job info',
				description: 'Get a job info',
				action: 'Enrich a linkedin company',
			},
			{
				name: 'Company Job Seach',
				value: 'job search',
				description: 'Search jobs of a linkedin company',
				action: 'Enrich a linkedin company',
			},
		],
		default: 'company info',
	},
];

export const linkedinFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                 linkedin:company                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		placeholder: 'https://linkedin.com/company/tesla-motors',
		required: true,
		displayOptions: {
			show: {
				resource: ['linkedin'],
				operation: ['company info', 'company employee info', 'company employee count'],
			},
		},
		description:
			'Linkedin company to look up. Format `tesla-motors` or `15564` or `linkedin.com/company/tesla-motors`.',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'string',
		default: '',
		placeholder: 'past',
		required: true,
		displayOptions: {
			show: {
				resource: ['linkedin'],
				operation: ['company employee count'],
			},
		},
		description: 'Parameter to filter past or current employees',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 linkedin:jobs                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		placeholder: '33246798',
		required: true,
		displayOptions: {
			show: {
				resource: ['linkedin'],
				operation: ['job search'],
			},
		},
		description: 'Linkedin company to look up. Format `15564` or `linkedin.com/company/33246798`.',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		placeholder: '3363903747',
		required: true,
		displayOptions: {
			show: {
				resource: ['linkedin'],
				operation: ['job info'],
			},
		},
		description:
			'Linkedin job to look up. Format `3006950185` or `https://www.linkedin.com/jobs/view/3006950185`.',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		required: true,
		displayOptions: {
			show: {
				resource: ['linkedin'],
				operation: ['job search'],
			},
		},
		description: 'Page number to look up',
	},
];
