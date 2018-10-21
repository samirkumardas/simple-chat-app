import { createSelector } from 'reselect';

const conversationsSelector = state => state.getIn(['messenger', 'conversations']);
const activeSelector = state => state.getIn(['messenger', 'active']);

export const getActiveConversation = createSelector(
    conversationsSelector,
    activeSelector,
    (conversations, active) => {
        return conversations.get(active);
    }
);