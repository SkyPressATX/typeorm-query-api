import { newQuery } from '../src';

export async function handler(event: any): Promise<any> {
  const query = newQuery(event.queryStringParameters);
  console.log('QUERY PARAMS', JSON.stringify(query));

  return { hello: 'BMO' };
}
