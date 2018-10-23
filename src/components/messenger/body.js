import React from 'react';
import PropTypes from 'prop-types';

import Message from './message';
import styles from './messenger.css';

const MessagengerBody = ({ messages }) => {
    return (
            <div className={styles.messageWrapper}>
               { messages.map(message => {
                    return (<Message key={message.get('id')} item= {message} />);
                }) }
            </div>
    );  
};

MessagengerBody.propTypes = {
    messages: PropTypes.object.isRequired
}
export default MessagengerBody;