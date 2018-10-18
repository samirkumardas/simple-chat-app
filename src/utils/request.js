import 'whatwg-fetch';

export default function request(url, option) {
   return window.fetch(url, option)
      .catch(handleError) 
      .then(checkStatus)
      .then(parseJSON)
      .catch(error => {
        throw error;
      });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    return response.json().then(json => {
        return window.Promise.reject({
            status: response.status,
            message: json.error ? json.error.message : (json.message ? json.message : '')
        });
    });
}

function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response.json();
}

function handleError(error) {
    throw error;
}