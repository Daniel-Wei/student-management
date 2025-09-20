import Backdrop from '../Backdrop/Backdrop';
import ConfirmModule from './ConfirmModal.module.css';
import StyleModule from '../Style.module.css';

const ConfirmModal = ({confirmText, onConfirmed, onCancelled}) => {
    return <Backdrop>
            <div className={ConfirmModule.confirmModal}>
                <div className={ConfirmModule.confirmText}>
                    {confirmText}
                </div>
            
                <div className={ConfirmModule.confirmModelButtonContainer}>
                    <button className={`${StyleModule.button} ${StyleModule.normalHover}`} 
                            onClick={onConfirmed}>
                        Yes
                    </button>
                    <button className={`${StyleModule.warningHover} ${StyleModule.button}`} 
                            onClick={onCancelled}>
                        No
                    </button>
                </div>
            </div>
        
    </Backdrop>
}

export default ConfirmModal;