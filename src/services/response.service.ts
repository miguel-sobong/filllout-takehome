import { IResponse } from '../shared/types/response.type';
import { IGetAllSubmissionsOptions, filloutService } from './fillout.service';

export interface IResponseFilter {
  id: string;
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
  value: number | string;
}

export interface IGetFilteredResponsesOptions extends IGetAllSubmissionsOptions {
  filters: IResponseFilter[];
}

interface IGetFilteredResponseResult {
  responses: Array<IResponse>;
  totalResponses: number;
  pageCount: number;
}

async function getFilteredResponses(formId: string, options: IGetFilteredResponsesOptions): Promise<IGetFilteredResponseResult> {
  // removing limit and offset here since we are tasked to do a local paginate
  let { filters, limit, offset, ...getAllSubmissionOptions } = options;

  const getAllSubmissionResponse = await filloutService.getAllSubmissions(formId, getAllSubmissionOptions);

  const optionFilters = options.filters;
  const formResponses = getAllSubmissionResponse.responses;

  let filteredResponses = formResponses.filter((response) => {
    const formQuestions = response.questions;

    return optionFilters.every((filter) => {
      const filteredQuestion = formQuestions.find((question) => question.id === filter.id);
      if (!filteredQuestion) {
        return false;
      }

      const answer = filteredQuestion.value;
      switch (filter.condition) {
        case 'equals': {
          return answer === filter.value;
        }
        case 'does_not_equal': {
          return answer !== filter.value;
        }
        case 'greater_than': {
          return answer > filter.value;
        }
        case 'less_than': {
          return answer < filter.value;
        }
      }
    });
  });

  let pageCount = 1;

  if (limit) {
    pageCount = Math.ceil(filteredResponses.length / limit);

    if (!offset) {
      filteredResponses = filteredResponses.slice(0, limit);
    } else {
      let start = limit * offset;
      filteredResponses = filteredResponses.slice(start, start + limit);
    }
  }

  return { pageCount, responses: filteredResponses, totalResponses: filteredResponses.length };
}

export const responseService = { getFilteredResponses };
