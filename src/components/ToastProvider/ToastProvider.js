import React from "react";

export const ToastContext = React.createContext("");

export function ToastProvider({ children }) {
  const [toastList, setToastList] = React.useState([]);

  const handleToastDismiss = React.useCallback(
    function (id) {
      var toastIndex = toastList.findIndex((toast) => toast.id === id);
      if (toastIndex !== -1) {
        var newList = [...toastList];
        newList.splice(toastIndex, 1);
        setToastList(newList);
      }
    },
    [toastList]
  );

  const handleToastCreate = React.useCallback(
    function (newToast) {
      const newList = [...toastList];
      newList.push(newToast);
      setToastList(newList);
    },
    [toastList]
  );

  function handleEscapeKey(e) {
    if (e.code === "Escape") {
      setToastList([]);
    }
  }

  React.useEffect(() => {
    // Allow using ESC key to clear all the toasts
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toastList,
        handleToastCreate,
        handleToastDismiss,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
