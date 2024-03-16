/* generated using openapi-typescript-codegen -- do no edit */

/* istanbul ignore file */

/* tslint:disable */

/* eslint-disable */
import type { IApiContentRouteModel } from './IApiContentRouteModel';
export type IApiContentResponseModel = {
    readonly cultures?: Record<string, IApiContentRouteModel>;
    readonly name?: string | null;
    readonly createDate?: string;
    readonly updateDate?: string;
    route?: IApiContentRouteModel;
    readonly id?: string;
    readonly contentType?: string;
    readonly properties?: Record<string, any>;
};

