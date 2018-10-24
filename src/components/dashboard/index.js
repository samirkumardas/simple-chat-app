import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, matchPath } from 'react-router-dom';

import Loader from '../loader';
import Notice from '../notice';
import Modal from '../modal';
import Channel from '../form/channel';
import LeftBar from '../leftbar';
import Messenger from '../messenger';
import styles from './dashboard.css'; 

import { getTypeFromKey } from '../../utils/helper';
import { showModal, hideModal } from '../modal/reducer';
import { myChannelsReq, membersReq, addChannelReq, doLogout } from '../dashboard/reducer';
import { setActiveConversation } from '../messenger/reducer';

class Dashboard extends PureComponent {
    
    constructor(props) {
        super(props);
        this.onModalSubmit = this.onModalSubmit.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            modalContent: Channel,
            modalTitle: 'Add Channel'
        };
    }
    componentDidMount() {
        this.props.dispatch(myChannelsReq());
        this.props.dispatch(membersReq());
    }
    componentDidUpdate() {
        /*  redirect to a conversation by default */
        const matcher = { path: '/messages', exact: true, strict: false };
        if (matchPath(this.props.history.location.pathname, matcher)) {
            if (this.props.activeConversation) {
                this.props.history.replace(`/messages/${this.props.activeConversation}`);
            }
        }

        /* update active conversation */
        if (this.props.activeConversation 
            && this.props.match.params.key
            && this.props.activeConversation != this.props.match.params.key) {
            const key = this.props.match.params.key,
                  { type, id } = getTypeFromKey(key);

            if ((type == 'channel' && this.props.channels.size != 0)
                || (type == 'private' && this.props.members.size != 0)) {
                const payload = {
                    key,
                    type,
                    title: this.getConversationTitle(id, type)
                };
                this.props.dispatch(setActiveConversation(payload));
            }
        }
    }
    getConversationTitle(id, type) {
        const items = type == 'channel' ? this.props.channels : this.props.members;
        let title = '';
        items.map(item => {
            if (item.get('id') == id) {
                title = item.get('name');
            }
        });
        return title;
    }
    onModalSubmit(values) {
        const members = values.get('members').map(member => member.id);
        this.props.dispatch(addChannelReq({
            name: values.get('name'),
            purpose: values.get('purpose'),
            members: members
        }));
    }
    toggleModal() {
        if (this.props.modal) {
            this.props.dispatch(hideModal());
        } else {
            this.props.dispatch(showModal());
        }
    }
    onLogout() {
        this.props.dispatch(doLogout());
    }

    render() {
        
        if (!this.props.loginState) return <Redirect to="/" />;
        if (this.props.loader && !this.props.modal) return <Loader showLoader={this.props.loader} />;

        const { channels, members, userName } = this.props;
        const modalProps = { members, loader: this.props.loader, onSubmit: this.onModalSubmit };

        return (
             <div className={styles.dashboard}>
                <Notice />
                <Modal
                    title = {this.state.modalTitle}
                    content = {this.state.modalContent}
                    props = {modalProps}
                    showModal = {this.props.modal}
                    onCloseModel = {this.toggleModal}
                />
                <LeftBar
                    channels = {channels}
                    members = {members}
                    userName = {userName}
                    onLogout = {this.onLogout}
                    onChannelForm = {this.toggleModal}
                />
                <Messenger key={this.activeConversation} />
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
        channels: state.getIn(['account', 'channels']),
        activeConversation: state.getIn(['messenger', 'active'])
    };
};

Dashboard.propTypes = {
    loader: PropTypes.bool,
    modal: PropTypes.bool,
    loginState: PropTypes.bool.isRequired,
    members: PropTypes.object,
    channels: PropTypes.object,
    userName: PropTypes.string,
    activeConversation: PropTypes.string,
    history: PropTypes.object,
    match: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(Dashboard);