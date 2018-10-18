import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './notice.css';
import { removeNotice } from './reducer';

class Notice extends PureComponent {
    
    constructor(props) {
        super(props);
        this.closeNotice = this.closeNotice.bind(this);
    }

    componentDidUpdate() {
        this.clearTimer();
        this.timer = window.setTimeout(()=>{
            this.closeNotice();
        }, 4000);
    }

    closeNotice() {
        this.clearTimer();
        this.props.dispatch(removeNotice());
    }

    clearTimer() {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = undefined;
        }
    }

    render() {

        const classAlert = this.props.notice.type === 'error' ? 'alert alert-danger' : 'alert alert-success';
        const classGlyph = this.props.notice.type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';

        return ( !this.props.notice.message ? '' :
            <div onClick={this.closeNotice} className ={styles.notice}>
                <div className={classAlert}>
                    <i className={classGlyph}></i>&nbsp;
                    {this.props.notice.message}
                    <button type="button" className="close" data-dismiss="alert">×</button>
                </div>
            </div>
        );  
    }
        
}

const mapStateToProps = (state) => {
    return {
        notice: state.get('notice').toJS()
    };
};

Notice.propTypes = {
    notice: PropTypes.any,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(Notice);