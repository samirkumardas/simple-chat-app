import React from 'react';
import PropTypes from 'prop-types';
import styles from './leftbar.css';
import { Link } from "react-router-dom";

import { getChatURL } from '../../utils/helper';

const ChatItem = ({ item, type }) => {
    const to = getChatURL(item.get('id'), type);
    return (
        <div className={styles.listItem}><i className="far fa-comment"></i>&nbsp; <Link to={to}>{ item.get('name') }</Link></div>
    );  
};

ChatItem.propTypes = {
    item: PropTypes.object,
    type: PropTypes.string
};

export default ChatItem;