import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

const Backdrop = (props) => {
  const navigate = useNavigate();
  return <div className={classes.backdrop} onClick={() => navigate("/")} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const element = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, element)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        element
      )}
    </>
  );
};

export default Modal;
