import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getActiveConversation } from './selector';
import styles from './messenger.css';

class Messenger extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }
    
    render() {
      const { userName, conversation } = this.props;
      
      if (!conversation) {
         return (
              <div className={styles.noChannelYet}>
                <i className="far fa-meh-blank"></i> 
                <br /><br />Oops! No Conversation is found! Create a new channel to start chatting.
              </div>
           );
      } 

      return (
            <div className={styles.rightBar}>
                <div className={styles.messageProfile}>
                    <div className={styles.profilePic}><i className="fas fa-user"></i></div>
                    <div className={styles.profileText}> { userName }</div>
                </div>
                <div className={styles.messageWrapper}>
                   <div className={styles.message}>
                       <div className={styles.msgMeta}>
                          <div className={styles.msgThumb}>S</div>
                          <div className={styles.msgUser}>Samir</div>
                          <div className={styles.msgTime}>10/12/2018 12:11 PM</div>
                       </div>
                       <p>Don’t want your columns to simply stack in some grid tiers. 
                       Use a combination of different classes for each tier as needed.
                       See the example below for a better idea of how it all works.</p>
                   </div>

                   <div className={styles.message}>
                       <div className={styles.msgMeta}>
                          <div className={styles.msgThumb}>S</div>
                          <div className={styles.msgUser}>Samir</div>
                          <div className={styles.msgTime}>10/12/2018 12:11 PM</div>
                       </div>
                       <p>Don’t want your columns to simply stack in some grid tiers. 
                       Use a combination of different classes for each tier as needed.
                       See the example below for a better idea of how it all works.</p>
                   </div>
                   
                </div>
                <div className={styles.messageInput}>
                    <input type="text" placeholder="Write your message..." />
                    <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loader: state.get('loader'),
        modal: state.get('modal'),
        userName: state.getIn(['account', 'userName']),
        members: state.getIn(['account', 'members']),
        channels: state.getIn(['account', 'channels']),
        conversation: getActiveConversation(state)
    };
};

Messenger.propTypes = {
    loader: PropTypes.bool,
    modal: PropTypes.bool,
    members: PropTypes.object,
    channels: PropTypes.object,
    userName: PropTypes.string,
    conversation: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(Messenger);