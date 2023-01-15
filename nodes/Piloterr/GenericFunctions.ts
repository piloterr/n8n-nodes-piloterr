import { OptionsWithUri } from 'request';

import {
    IExecuteFunctions,
    IExecuteSingleFunctions,
    IHookFunctions,
    ILoadOptionsFunctions,
} from 'n8n-core';

import { IDataObject, NodeApiError } from 'n8n-workflow';

export async function piloterrApiRequest(
    this: IHookFunctions | IExecuteFunctions | IExecuteSingleFunctions | ILoadOptionsFunctions,
    method: string,
    resource: string,
    body: any = {},
    qs: IDataObject = {},
    uri?: string,
    option: IDataObject = {},
): Promise<any> {
    const credentials = await this.getCredentials('piloterrApi');
    let options: OptionsWithUri = {
        method,
        qs,
        body,
        uri: uri ?? `https://piloterr.com/api${resource}&x_api_key=${credentials.apiKey}`,
        json: true,
    };
    options = Object.assign({}, options, option);
    if (Object.keys(options.body).length === 0) {
        delete options.body;
    }
    try {
        return await this.helpers.request(options);
    } catch (error) {
        throw new NodeApiError(this.getNode(), error);
    }
}
