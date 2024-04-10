import { getFilteredResponsesHandler } from './../handlers/get-filtered-responses.handler';
import { asyncHandler } from './../utils/async-handler.util';
import express from 'express';

const router = express.Router();

router.get(`/:formId/filteredResponses`, asyncHandler(getFilteredResponsesHandler));

export const responsesRouter = router;
