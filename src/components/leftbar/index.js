import React from 'react';
import PropTypes from 'prop-types';

import ChatItem from './chat-item';
import styles from './leftbar.css';

const LeftBar = ({ channels, members, userName, onLogout, onChannelForm }) => {
    return (
            <div className={styles.leftBar}>
                <div className={styles.mobMenu}>
                    <a href="#"><i className="fas fa-bars"></i></a>
                </div>
                <div className={styles.profile}>
                    <div className={styles.profilePic}><i className="fas fa-user"></i></div>
                    <div className={styles.profileText}>{ userName }</div>
                </div>
                <nav>
                    <h5><i className="fas fa-users"></i>&nbsp;Channels <a onClick={onChannelForm}><i className="fas fa-plus-square"></i></a></h5>
                    
                    { channels.map(channel => {
                        return (<ChatItem key={channel.get('id')} item= {channel} type="C" />);
                    }) }
                    { channels.size == 0 ? (<div className={styles.noData}>You don&apos;t have any channel.</div>) : ''}

                    <h5><i className="fas fa-user-friends"></i>&nbsp;Private Messages</h5>
                    { members.map(member => {
                        return (<ChatItem key={member.get('id')} item= {member} type="P" />);
                    }) }
                    { members.size == 0 ? (<div className={styles.noData}>No members are available.</div>) : ''}
                </nav>
                <a className={styles.logout} onClick={onLogout}><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</a>
            </div>
    );  
};

LeftBar.propTypes = {
    members: PropTypes.object,
    channels: PropTypes.object,
    userName: PropTypes.string,
    onLogout: PropTypes.func,
    onChannelForm: PropTypes.func
};

export default LeftBar;