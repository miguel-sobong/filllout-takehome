import { RequestHandler } from 'express';
import { IGetFilteredResponsesOptions, IResponseFilter, responseService } from '../services/response.service';
import Joi from 'joi';
import { joiDefaultOptions } from '../shared/constants/joi-default-options';
import { IGetAllSubmissionsResponse } from '../shared/types/get-all-submissions-response.type';

interface IRequestInterface extends IGetFilteredResponsesOptions {
  formId: string;
}

const FILTER_RESPONSE_REQUEST_SCHEMA = Joi.object<IResponseFilter>({
  id: Joi.string().required(),
  condition: Joi.string().allow('equals', 'does_not_equal', 'greater_than', 'less_than').required(),
  value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
});

// let fillout handle the default values so we have one source of truth
const GET_FILTERED_RESPONSE_HANDLER_REQUEST_SCHEMA = Joi.object<IRequestInterface>({
  formId: Joi.string().required(),
  filters: Joi.array().items(FILTER_RESPONSE_REQUEST_SCHEMA).required(),
  limit: Joi.number().optional(),
  afterDate: Joi.date().iso(),
  beforeDate: Joi.date().iso(),
  offset: Joi.number().optional(),
  status: Joi.string().allow('in_progress', 'finished'),
  sort: Joi.string().allow('asc', 'desc'),
  includeEditLink: Joi.boolean(),
}).options(joiDefaultOptions);

export const getFilteredResponsesHandler: RequestHandler<any, IGetAllSubmissionsResponse | string, any, any> = async (req, res) => {
  const { error, value } = GET_FILTERED_RESPONSE_HANDLER_REQUEST_SCHEMA.validate({ ...req.body, formId: req.params.formId });
  if (error) {
    res.status(400).send(error.message);
    throw error;
  }

  const { formId, ...filter } = value;
  const filteredFormResponses = await responseService.getFilteredResponses(formId, filter);

  res.send(filteredFormResponses);
};
