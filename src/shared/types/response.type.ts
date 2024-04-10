import { ICalculation } from './calculation.type';
import { IQuestion } from './question.type';
import { IUrlParameter } from './url-parameter.type';

export interface IResponse {
  questions: IQuestion[];
  calculations: ICalculation[];
  urlParameters: IUrlParameter[];
  quiz: {
    score: number;
    maxScore: number;
  };
  submissionId: string;
  submissionTime: string;
}
