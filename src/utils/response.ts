import { getCorsHeaders } from '../constants/cors';

export const createResponseFactory = (env: any) => {
  const corsHeaders = getCorsHeaders(env);
  
  return (data?: any, status: number = 200): Response => {
    return Response.json(data, {
      status,
      headers: corsHeaders
    });
  };
};