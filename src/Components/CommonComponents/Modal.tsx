import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";
import { observer } from "mobx-react";

import mainStore from "../../Store/ModalStore";

const Modal=observer(({ children, isOpen, style }:{children:JSX.Element,isOpen:boolean,style:string}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) {
      return dialogRef.current?.showModal();
    }
    dialogRef.current?.close();
  }, [isOpen]);
  return createPortal(
    <>
      <div className={mainStore.isDarkMode ? "dark" : ""}>
        <dialog className={style} ref={dialogRef}>
          {children}
        </dialog>
      </div>
    </>,
    document.getElementById("Modal")
  );
})
export default Modal
