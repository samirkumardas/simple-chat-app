import React from 'react';
import PropTypes from 'prop-types';
import styles from './loader.css';

const Loader = ({ showLoader }) => {

	return showLoader ? (
           <div className={styles.overlay}>
			<div className={styles.ripple}>
              <div></div>
              <div></div>
            </div>
            </div> ) : '';
};

Loader.propTypes = {
    showLoader: PropTypes.bool.isRequired
};

export default Loader;