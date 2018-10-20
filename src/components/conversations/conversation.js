import React from 'react';
import PropTypes from 'prop-types';
import styles from './conversations.css';
import { Link } from "react-router-dom";

const Conversation = ({ item, type }) => {
    const to = `messages/${type}${item.get('id')}`; 
    return (
        <div className={styles.listItem}><i className="far fa-comment"></i>&nbsp; <Link to={to}>{ item.get('name') }</Link></div>
    );  
};

Conversation.propTypes = {
    item: PropTypes.object,
    type: PropTypes.string
};

export default Conversation;