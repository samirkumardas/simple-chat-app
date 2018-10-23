import React from 'react';
import PropTypes from 'prop-types';
import { getNameInitial } from 'utils/helper';
import styles from './messenger.css';

const Message = ({ item }) => {
    return (
            <div className={styles.msgRow}>
               <div className={styles.msgMeta}>
                  <div className={styles.msgThumb}>{ getNameInitial(item.get('fromName')) }</div>
                  <div className={styles.msgUser}>{ item.get('fromName') }</div>
                  <div className={styles.msgTime}>{ item.get('time') }</div>
               </div>
               <p>{ item.get('content') }</p>
           </div>
    );  
};

Message.propTypes = {
    item: PropTypes.object.isRequired
}
export default Message;