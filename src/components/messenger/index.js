import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import connector from '../../utils/connector';
import { getKeyPrefix } from '../../utils/helper';

import MessagengerHeader from './header';
import MessagengerBody from './body';
import MessagengerFooter from './footer';

import { getActiveConversation } from './selector';
import styles from './messenger.css';

import { getMessages, addMessage } from '../messenger/reducer';

class Messenger extends PureComponent {
    constructor(props) {
        super(props);
        this.onBroadcastedMessage = this.onBroadcastedMessage.bind(this);
    }

    componentDidMount() {
        const key = this.props.activeConversation;
        if (key) {
            this.props.dispatch(getMessages({
                key
            }));
        }
        /* Subscribe to broadcased messages */
        connector.subscribe(this.onBroadcastedMessage);
    }

    componentWillUnmount() {
        connector.unsubscribe(this.onBroadcastedMessage);
    }

    onBroadcastedMessage(data) {
        if (data.act === 'message') {
            const to = data.to,
                  from = data.from,
                  type = data.type,
                  key = type == 'channel' ? getKeyPrefix('channel') + to : getKeyPrefix('private') + from;

            this.props.dispatch(addMessage({
                key,
                message: data
            }));
        }
    }
    
    render() {
      const { conversation, activeConversation } = this.props;
      
      if (!conversation) {
         return (
              <div className={styles.noChannelYet}>
                <i className="far fa-meh-blank"></i> 
                <br /><br />Oops! No Conversation is found! Create a new channel to start chatting.
              </div>
           );
      }
      const messages = conversation.get('messages');
      
      return (
            <div className={styles.rightBar}>
                <MessagengerHeader
                    type = {conversation.get('type')}
                    title = { conversation.get('title') }
                />
                <MessagengerBody
                    messages = { messages }
                />
                <MessagengerFooter
                    activeConversation = {activeConversation}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        conversation: getActiveConversation(state),
        activeConversation: state.getIn(['messenger', 'active'])
    };
};

Messenger.propTypes = {
    conversation: PropTypes.object,
    activeConversation: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(Messenger);