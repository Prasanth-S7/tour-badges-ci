import { corsHeaders } from '../constants/cors';

export const createResponse = (data: any, status: number = 200): Response => {
  return Response.json(data, {
    status,
    headers: corsHeaders
  });
};