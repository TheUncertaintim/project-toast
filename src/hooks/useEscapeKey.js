import React from "react";

export default function useEscapeKey(callback) {
  React.useEffect(() => {
    function handleEscapeKey(e) {
      if (e.code === "Escape") {
        callback();
      }
    }
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [callback]);
}
