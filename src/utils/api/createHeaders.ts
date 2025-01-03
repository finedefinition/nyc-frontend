type tokenUser = string | null;
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type ContentType = 'application/json' | 'multipart/form-data';

export const createHeaders = (
  tokenUser: tokenUser = '',
  method: RequestMethod,
  content: boolean = false
) => {
  const contentType: ContentType = content
    ? 'multipart/form-data'
    : 'application/json';
  const headers: HeadersInit = {
    'Content-Type': contentType,
  };

  if (
    tokenUser &&
    (method === 'GET' || method === 'DELETE' || method === 'POST')
  ) {
    headers.Authorization = `Bearer ${tokenUser}`;
  }

  return headers;
};
