import ReactDOM from "react-dom";
import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      {children}
    </div>,
    document.body,
  );
};

export default Modal;
