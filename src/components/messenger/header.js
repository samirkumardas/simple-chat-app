import React from 'react';
import PropTypes from 'prop-types';
import styles from './messenger.css';

const MessagengerHeader = ({ title, type }) => {
    const typeGlyph = type == 'channel' ? (<i className="fas fa-users"></i>) : (<i className="fas fa-user"></i>);
    return (
            <div className={styles.messageProfile}>
                <div className={styles.profilePic}>{typeGlyph}</div>
                <div className={styles.profileText}>{ title }</div>
            </div>
    );  
};

MessagengerHeader.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string
}
export default MessagengerHeader;