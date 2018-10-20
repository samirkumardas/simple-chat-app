import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.css';

class Modal extends PureComponent {

    constructor(props) {
        super(props);
    }
  
    render() {
         if (!this.props.showModal) return '';
         const {title, closeBtnLable, saveBtnLabel, showClose, onHideModel } = this.props;
         const close = showClose ? (<button onClick = {onHideModel} type="button" className="close"><span>&times;</span></button>) : '';
         const closeBtn = showClose ? (<button onClick = {onHideModel} type="button" className="btn btn-secondary">{ closeBtnLable }</button>) : '';
         const modalCls = `modal ${styles.displayModal}`;
         const Content = this.props.content;
         
         return (
             <div className={styles.modalOverlay}>
                <div className={modalCls}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                       <div className="modal-header">
                        <h5 className="modal-title">{ title }</h5>
                           { close }
                       </div>
                       <div className="modal-body">
                         <Content />
                       </div>
                       <div className="modal-footer">
                         { closeBtn }
                         <button onClick={this.props.onSubmit} type="button" className="btn btn-primary">{ saveBtnLabel }</button>
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
         );
    }
}

Modal.defaultProps = {
  title: 'Your Modal',
  closeBtnLable: 'Close',
  saveBtnLabel: 'Save',
  showClose: true
};

Modal.propTypes = {
    showClose: PropTypes.bool,
    showModal: PropTypes.bool,
    title: PropTypes.string,
    closeBtnLable: PropTypes.string,
    saveBtnLabel: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onHideModel: PropTypes.func,
    content: PropTypes.func.isRequired,
    render: PropTypes.func
};
export default Modal;