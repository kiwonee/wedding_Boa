import { useEffect } from "react";
import { createPortal } from "react-dom";

const getLock = () => {
  if (!window.__MODAL_LOCK__) {
    window.__MODAL_LOCK__ = { count: 0, scrollY: 0 };
  }
  return window.__MODAL_LOCK__;
};

const applyLock = () => {
  const lock = getLock();
  lock.count += 1;
  if (lock.count > 1) return;
  lock.scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.body.classList.add("modal-open");
  document.documentElement.classList.add("modal-open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${lock.scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
};

const releaseLock = () => {
  const lock = getLock();
  lock.count = Math.max(0, lock.count - 1);
  if (lock.count !== 0) return;
  document.body.classList.remove("modal-open");
  document.documentElement.classList.remove("modal-open");
  const y = lock.scrollY || 0;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo(0, y);
};

const Modal = ({
  isOpen,
  onClose,
  children,
  mystyle = {},
  closeOnBackdrop = true,
  fullscreen = false,
}) => {
  const open = !!isOpen?.isopen;

  useEffect(() => {
    if (!open) return;
    applyLock();
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      releaseLock();
    };
  }, [open, onClose]);

  if (!open) return null;

  if (fullscreen) {
    return createPortal(
      <div className="modal-fullscreen">{children}</div>,
      document.body
    );
  }

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (!closeOnBackdrop) return;
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="modal-card"
        style={mystyle}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
