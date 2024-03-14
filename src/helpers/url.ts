export const applyRouteParams = (
  url: string,
  params: Record<string, string | number>,
): string => {
  let result = url;
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      result = result.replace(`:${key}`, params[key].toString());
    }
  });
  return result;
};
