import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Message from './message';
import styles from './messenger.css';

class MessagengerBody extends PureComponent {
    constructor(props) {
        super(props);
        this.messengerBodyRef = React.createRef();
        this.lastUser = '';
    }

    componentDidUpdate(prevPros) {
        this.messengerBodyRef.current.scrollTop = this.messengerBodyRef.current.scrollHeight;
        if (prevPros.activeConversation != this.props.activeConversation) {
            this.lastUser = 0;
        }
    }

    render() {
        const messages = this.props.messages;
        return (
            <div ref={this.messengerBodyRef} className={styles.messageWrapper}>
               { messages.valueSeq().map((message, index) => {
                    let showUser = false;
                    if (this.lastUser !== message.get('from') || index == 0) {
                        this.lastUser = message.get('from');
                        showUser = true;
                    }
                    return (<Message key={message.get('id')} item= {message} showUser = {showUser} />);
                }) }
            </div>
        );
    }
}


MessagengerBody.propTypes = {
    messages: PropTypes.object.isRequired,
    activeConversation: PropTypes.string
}
export default MessagengerBody;