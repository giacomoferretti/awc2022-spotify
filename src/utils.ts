// Reference: https://stackoverflow.com/a/69904130
const buildParams = (data: any) => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((value) => params.append(key, value.toString()));
    } else {
      params.append(key, (value as any).toString());
    }
  });

  return params.toString();
};
