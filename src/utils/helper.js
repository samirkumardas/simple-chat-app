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

export const storage = {
    set(key, value) {
        localStorage.setItem(key, value);
    },
    get(key) {
        return localStorage.getItem(key);
    },
    remove(key) {
        localStorage.removeItem(key);
    }
};

export const getChatURL = (id, type) => {
    const prefix = getKeyPrefix(type);
    return `/messages/${prefix}${id}`;
}

export const getKeyPrefix = (type) => {
    return type == 'channel' ? 'C' : 'P';
}

export const getTypeFromKey = (key) => {
    const type = key.toString().charAt(0) == 'C' ? 'channel' : 'private';
    return {
        type,
        id: key.slice(1)
    };
}

export const getNameInitial = (name) => {
    return name.charAt(0).toUpperCase();
}