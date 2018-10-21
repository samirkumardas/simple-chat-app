import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.css';

class Modal extends PureComponent {

    constructor(props) {
        super(props);
    }
  
    render() {
         if (!this.props.showModal) return '';
         const {title, onCloseModel, props } = this.props;
         const close = (<button onClick = {onCloseModel} type="button" className="close"><span>&times;</span></button>);
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
                         <Content {...props} />
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
  props: {}
};

Modal.propTypes = {
    showModal: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.func.isRequired,
    props: PropTypes.object,
    onCloseModel: PropTypes.func
};
export default Modal;