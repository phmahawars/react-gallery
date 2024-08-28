import { useEffect, useState } from "react";

function ToastMessage({ message, state }) {
  const [show, setShow] = useState("");
  useEffect(() => {
    setTimeout(() => {
      state("");
    }, 5000);
  }, []);
  return (
    <div
      className={`toast align-items-center position-fixed show`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ top: "5%", right: "1%", zIndex: "999999" }}
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

export default ToastMessage;
