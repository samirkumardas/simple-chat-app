import React from 'react';
//import PropTypes from 'prop-types';
import styles from './conversations.css';

const Conversations = () => {
    return (
            <div className={styles.leftBar}>
                <div className={styles.mobMenu}>
                    <a href="#"><i className="fas fa-bars"></i></a>
                </div>
                <div className={styles.profile}>
                    <div className={styles.profilePic}><i className="fas fa-user"></i></div>
                    <div className={styles.profileText}>Test user</div>
                </div>
                <nav>
                    <h5><i className="fas fa-users"></i>&nbsp;Groups</h5>
                    <div className={styles.listItem}><i className="far fa-comment"></i>&nbsp; Group 1</div>
                    <div className={styles.listItem}><i className="far fa-comment"></i>&nbsp;Group 2</div>
                    <div className={styles.listItem}><i className="far fa-comment"></i>&nbsp;Group 3</div>
                    <div className={styles.listItem}><i className="far fa-comment"></i>&nbsp;Group 4</div>
                    <h5><i className="fas fa-user-friends"></i>&nbsp;Friends</h5>
                    <div className={styles.listItem}><i className="far fa-comment"></i>&nbsp;Samir</div>
                    <div className={styles.listItem}><i className="far fa-comment"></i>&nbsp;Dipti</div>
                </nav>
            </div>
    );  
};

export default Conversations;