import { createAction, createReducer } from 'redux-act';
import { fromJS, Map, List } from 'immutable';

import { getKeyPrefix } from '../../utils/helper';
/* Request action */
export const sendMessage =  createAction('SEND_MESSAGE');
export const getMessages =  createAction('GET_MESSAGES');

/* Setter actions */
export const addMessage =  createAction('ADD_MESSAGE');
export const setMessages =  createAction('SET_MESSAGES');
export const setActiveConversation =  createAction('SET_ACTIVE_CONVERSATION');
export const setDefaultConversation =  createAction('SET_DEFAULT_CONVERSATION');

const doAddMessage = (state, payload) => {
    let conversations = state.get('conversations'),
        key = payload.key,
        message = payload.message,
        conversation = conversations.get(key);

    conversation = conversation.update('messages', messages => messages.push(Map(message)));
    conversations = conversations.set(key, conversation);
    return state.set('conversations', conversations);
};

const doSetMessages = (state, payload) => {
    let key = payload.key,
        messages = payload.messages;
    return state.setIn(['conversations', key, 'messages'], fromJS(messages));
};

const doAddConversation = (state, payload) => {
    let conversations = state.get('conversations'),
        key = payload.key,
        conversation = conversations.get(key);

    if (!conversation) {
        conversation =  Map({
            key,
            title: payload.title,
            type: payload.type,
            messages: List([])
        });
        conversations = conversations.set(key, conversation);
        return state.set('conversations', conversations);
    }
    return state;
};

const makeActive = (state, payload) => {
    state = state.set('active', payload.key);
    state = doAddConversation(state, payload);
    return state;
};

const makeDefaultActive = (state, channel) => {
    if (!state.get('active')) {
        const payload = {
            key: getKeyPrefix('channel') + channel.id,
            title: channel.name,
            type: 'channel'
        };
        return makeActive(state, payload);
    }
    
    return state;
};

const initialState = fromJS({
    conversations: {},
    active: ''
});

const messenger = createReducer({
    [addMessage]: (state, payload) => doAddMessage(state, payload),
    [setMessages]: (state, payload) => doSetMessages(state, payload),
    [setActiveConversation]: (state, payload) => makeActive(state, payload),
    [setDefaultConversation]: (state, payload) => makeDefaultActive(state, payload)
}, initialState);

export default messenger;