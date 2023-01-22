import { INodeProperties } from 'n8n-workflow';

export const enrichmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['enrichment'],
			},
		},
		options: [
			{
				name: 'Company',
				value: 'company',
				description: 'Look up a company by their domain',
				action: 'Company domain',
			},
			{
				name: 'Email Pattern',
				value: 'email pattern',
				description: 'Look up email patterns for a company',
				action: 'Email pattern',
			},
		],
		default: 'company',
	},
];

export const enrichmentFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                 enrichment:company                         */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'gucci.com',
		displayOptions: {
			show: {
				resource: ['enrichment'],
				operation: ['company'],
			},
		},
		description: 'The domain to look up',
	},

	/* -------------------------------------------------------------------------- */
	/*                                 enrichment:email pattern                   */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'gucci.com',
		displayOptions: {
			show: {
				resource: ['enrichment'],
				operation: ['email pattern'],
			},
		},
		description: 'The domain to look up',
	},
];
