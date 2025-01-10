type TokenUser = string | null;

export const createHeaders = (
  tokenUser: TokenUser,
  isMultipart: boolean = false
): HeadersInit => {
  const headers: HeadersInit = {};

  if (!isMultipart) {
    headers['Content-Type'] = 'application/json';
  }

  if (tokenUser) {
    headers['Authorization'] = `Bearer ${tokenUser}`;
  }

  return headers;
};
