import { IGetAllSubmissionsResponse } from '../shared/types/get-all-submissions-response.type';

export interface IGetAllSubmissionsOptions {
  limit?: number;
  afterDate?: string;
  beforeDate?: string;
  offset?: number;
  status: 'in_progress' | 'finished';
  includeEditLink: boolean;
  sort: 'asc' | 'desc';
}

async function getAllSubmissions(formId: string, options: IGetAllSubmissionsOptions) {
  let FILLOUT_RESPONSES_URL = `${process.env.FILLOUT_BASE_URL}/v1/api/forms/${formId}/submissions`;

  const queryParams = new URLSearchParams(options as unknown as Record<string, string>).toString();
  if (queryParams) {
    FILLOUT_RESPONSES_URL += `?${queryParams}`;
  }

  let getAllSubmissionResponse: IGetAllSubmissionsResponse = await fetch(FILLOUT_RESPONSES_URL, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
    }),
  })
    .then((e) => e.json())
    .catch((error) => {
      console.error('Something went wrong while fetching responses', error);
      throw error;
    });

  return getAllSubmissionResponse;
}

export const filloutService = { getAllSubmissions };
