import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChatItem from './chat-item';
import styles from './leftbar.css';

class LeftBar extends Component {

    constructor(props) {
        super(props);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    }

    toggleMobileMenu(event) {
        if (event.currentTarget.parentNode.style.left == '0px') {
            event.currentTarget.parentNode.style.left= '-160px';
        } else {
            event.currentTarget.parentNode.style.left = '0px';
        }
    }

    render() {
        const { members, channels, userName, onLogout, onChannelForm } = this.props;
        return (
            <div className={styles.leftBar}>
                <div ref={this.menuRef} onClick={this.toggleMobileMenu} className={styles.mobMenu} >
                    <a href="#"><i className="fas fa-bars"></i></a>
                </div>
                <div className={styles.profile}>
                    <div className={styles.profilePic}><i className="fas fa-user"></i></div>
                    <div className={styles.profileText}>{ userName }</div>
                </div>
                <nav>
                    <h5><i className="fas fa-users"></i>&nbsp;Channels <a onClick={onChannelForm}><i className="fas fa-plus-square"></i></a></h5>
                    
                    { channels.map(channel => {
                        return (<ChatItem key={channel.get('id')} item= {channel} type="channel" />);
                    }) }
                    { channels.size == 0 ? (<div className={styles.noData}>You don&apos;t have any channel.</div>) : ''}

                    <h5><i className="fas fa-user-friends"></i>&nbsp;Private Messages</h5>
                    { members.map(member => {
                        return (<ChatItem key={member.get('id')} item= {member} type="private" />);
                    }) }
                    { members.size == 0 ? (<div className={styles.noData}>No members are available.</div>) : ''}
                </nav>
                <a className={styles.logout} onClick={onLogout}><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</a>
            </div>
         );
    }
}

LeftBar.propTypes = {
    members: PropTypes.object,
    channels: PropTypes.object,
    userName: PropTypes.string,
    onLogout: PropTypes.func,
    onChannelForm: PropTypes.func
};
export default LeftBar;