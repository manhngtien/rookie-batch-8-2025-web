import ReactDOM from "react-dom";
import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">{children}</div>,
    document.body
  );
};

export default Modal;