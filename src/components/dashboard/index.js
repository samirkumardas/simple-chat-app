import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '../loader';
import Notice from '../notice';
import Conversations from '../conversations/conversations';
import Messenger from '../messenger/messenger';
import styles from './dashboard.css';



class Dashboard extends PureComponent {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //this.props.dispatch(fetchSlotsReq());
    }

    render() {
        if (!this.props.loginState) return <Redirect to="/" />;
        
        return (
             <div className={styles.dashboard}>
                <Notice />
                <Loader showLoader={this.props.loader} />
                <Conversations />
                <Messenger />
              </div> 
         );
    }
}

const mapStateToProps = (state) => {
    return {
        loader: state.get('loader'),
        loginState: state.getIn(['account', 'loginState'])
    };
};

Dashboard.propTypes = {
    loader: PropTypes.bool,
    loginState: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

Dashboard.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(Dashboard);