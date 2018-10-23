import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './messenger.css';

import { sendMessage } from '../messenger/reducer';

class MessagengerFooter extends PureComponent {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            content: ''
        };
    }

    onSubmit() {
        if (!this.state.content) return;
        this.props.dispatch(sendMessage({
            key: this.props.activeConversation,
            content: this.state.content
        }));
        this.setState({
            content: ''
        });
    }

    handleOnChange(event) {
        const value = event.target.value;
        this.setState({
            content: value
        });
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            this.onSubmit();
        }
    }
    
    render() {
        return (
             <div className={styles.messageInput}>
                 <input
                    name = "content"
                    value = {this.state.content}
                    onKeyPress = {this.handleKeyPress}
                    onChange = {this.handleOnChange}
                    type = "text"
                    placeholder = "Write your message..."
                 />
                 <button className="submit"><i className="fa fa-paper-plane" onClick = { this.onSubmit }></i></button>
            </div>
        );
    }
}

MessagengerFooter.propTypes = {
    activeConversation: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
}; 

export default connect(dispatch => ({dispatch}))(MessagengerFooter);