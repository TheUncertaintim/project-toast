import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts, handleDismiss }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <li className={styles.toastWrapper} key={toast.id}>
          <Toast
            variant={toast.variant}
            onDismiss={() => handleDismiss(toast.id)}
          >
            {toast.msg}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
