import React from "react";
import Button from "../Button";
import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [textMsg, setTextMsg] = React.useState("");
  const [selectedVariant, setSelectedVariant] = React.useState(
    VARIANT_OPTIONS[0]
  );
  const [toastList, setToastList] = React.useState([]);

  function handleFormSubmit(e) {
    e.preventDefault();
    // push the msg to the list
    var newList = [...toastList];
    newList.push({
      id: crypto.randomUUID(),
      msg: textMsg,
      variant: selectedVariant,
    });
    setToastList(newList);
    // reset the form
    setTextMsg("");
    setSelectedVariant(VARIANT_OPTIONS[0]);
  }

  function handleToastDismiss(id) {
    var toastIndex = toastList.findIndex((toast) => toast.id === id);
    if (toastIndex !== -1) {
      var newList = [...toastList];
      newList.splice(toastIndex, 1);
      setToastList(newList);
    }
  }
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf toasts={toastList} handleDismiss={handleToastDismiss} />
      <form onSubmit={handleFormSubmit}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                value={textMsg}
                onChange={(e) => setTextMsg(e.target.value)}
                className={styles.messageInput}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((option) => (
                <label htmlFor={`variant-${option}`} key={option}>
                  <input
                    id={`variant-${option}`}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={selectedVariant === option}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button type="submit">Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
