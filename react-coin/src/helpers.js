export const handleResponse = (response) => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
}
