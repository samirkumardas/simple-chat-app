//import CONSTANTS from '../config/constants';
export const getAPIRequestHeader = (payload, id) => {
    return {
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json;charset=utf-8'
        },
        credentials: 'same-origin',
        cache: 'no-cache',
        mode: 'cors',
        method: id ? 'PATCH' : 'POST'
    };
}

const load = () => {
    let cookies = {};
    document.cookie.split(';').forEach(function(e) {
        let key,
            value;
        [key,value] = e.split('=');
        cookies[key.trim()] = value.trim();
    });
    return cookies;
}
let cookies = load();
export const cookie = {
    set(key, value) {
        document.cookie = `${key}=${value}`;
    },
    get(key) {
        return cookies[key] ? cookies[key] : '';
    },
    refresh() {
        cookies = load();
    }
};