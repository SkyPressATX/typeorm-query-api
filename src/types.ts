export interface IQuery {
  deleted?: boolean;
  desc?: string;
  limit?: number;
  load?: string;
  select?: string;
  skip?: number;
  sort?: string;
  [key: string]: any;
}
