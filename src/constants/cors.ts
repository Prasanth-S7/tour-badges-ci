export const getCorsHeaders = (env: any) => ({
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Origin': env.ENVIRONMENT === 'development' ? '*' : env.ALLOWED_ORIGINS,
  'Access-Control-Max-Age': '86400',
});