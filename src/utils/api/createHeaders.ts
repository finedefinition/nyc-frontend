type tokenUser = string | null;
type ContentType = 'application/json' | 'multipart/form-data';

export const createHeaders = (
  tokenUser: tokenUser,
  content: boolean = false
) => {
  const contentType: ContentType = content
    ? 'multipart/form-data'
    : 'application/json';

  const headers: HeadersInit = {
    'Content-Type': contentType,
  };

  if (tokenUser) {
    headers.Authorization = `Bearer ${tokenUser}`;
  }

  return headers;
};
