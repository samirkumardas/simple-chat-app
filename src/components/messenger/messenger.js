import React from 'react';
//import PropTypes from 'prop-types';
import styles from './messenger.css';

const Messenger = () => {
    return (
        <div className={styles.rightBar}>
            <div className={styles.messageProfile}>
                <div className={styles.profilePic}><i className="fas fa-user"></i></div>
                <div className={styles.profileText}>Test user</div>
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
};

export default Messenger;