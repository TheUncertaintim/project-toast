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
