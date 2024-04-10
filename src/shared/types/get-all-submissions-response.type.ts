import { IResponse } from './response.type';

export interface IGetAllSubmissionsResponse {
  responses: Array<IResponse>;
  totalResponses: number;
  pageCount: number;
}
