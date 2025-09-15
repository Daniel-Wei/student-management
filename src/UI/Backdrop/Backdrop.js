import { createPortal } from "react-dom";
import BackdropModule from "./Backdrop.module.css";

const backdropContainer = document.getElementById('backdropContainer');

const Backdrop = ({ children }) => {
    return createPortal((<div className={BackdropModule.backdrop}>
        { children }
    </div>), backdropContainer);
}

export default Backdrop;