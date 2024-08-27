type SearchParams = {
  [key: string]: string | string[] | null | boolean;
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams
): string {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null || value === false || value === '') {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((part) => newParams.append(key, part));
    } else if (value === true) {
      newParams.set(key, 'true');
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
