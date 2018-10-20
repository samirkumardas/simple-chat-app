import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from '../loader';
import Notice from '../notice';
import Modal from '../modal';
import Channel from '../form/channel';
import Conversations from '../conversations/conversations';
import Messenger from '../messenger/messenger';
import styles from './dashboard.css';

import { myChannelsReq, membersReq, doLogout } from '../dashboard/reducer';

class Dashboard extends PureComponent {
    
    constructor(props) {
        super(props);
        this.onModalSubmit = this.onModalSubmit.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.showChannelAddForm = this.showChannelAddForm.bind(this);
        this.onHideModel = this.onHideModel.bind(this);
        this.state = {
            modalContent: Channel,
            showModal: false
        };
    }
    componentDidMount() {
        this.props.dispatch(myChannelsReq());
        this.props.dispatch(membersReq());
    }
    onModalSubmit() {

    }
    showChannelAddForm() {
        this.setState({
            showModal: true,
            modalContent: Channel
        });
    }
    onHideModel() {
        this.setState({
            showModal: false,
            modalContent: Channel
        });
    }
    onLogout() {
        this.props.dispatch(doLogout());
    }

    render() {
        
        if (!this.props.loginState) return <Redirect to="/" />;
        if (this.props.loader) return <Loader showLoader={this.props.loader} />;

        const { channels, members, userName } = this.props;
        return (
             <div className={styles.dashboard}>
                <Notice />
                <Modal
                    content = {this.state.modalContent}
                    onSubmit = {this.onModalSubmit}
                    showModal = {this.state.showModal}
                    onHideModel = {this.onHideModel}
                />
                <Conversations
                    channels = {channels}
                    members = {members}
                    userName = {userName}
                    onLogout = {this.onLogout}
                    showChannelForm = {this.showChannelAddForm}
                />
                <Messenger />
              </div> 
         );
    }
}

const mapStateToProps = (state) => {
    return {
        loader: state.get('loader'),
        modal: state.get('modal'),
        loginState: state.getIn(['account', 'loginState']),
        userName: state.getIn(['account', 'userName']),
        members: state.getIn(['account', 'members']),
        channels: state.getIn(['account', 'channels'])
    };
};

Dashboard.propTypes = {
    loader: PropTypes.bool,
    modal: PropTypes.bool,
    loginState: PropTypes.bool.isRequired,
    members: PropTypes.object,
    channels: PropTypes.object,
    userName: PropTypes.string,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(Dashboard);