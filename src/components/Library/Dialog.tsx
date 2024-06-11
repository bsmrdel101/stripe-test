import { generateClasses, parseClasses } from "@/scripts/tools/utils";
import React, { useEffect, useRef } from "react";
import Draggable from "./Draggable";
import Button from "./Button";

interface Props {
  children: React.ReactNode
  className?: string
  variant?: ('default')[]
  title?: string
  closeOnOutsideClick?: boolean
  width?: number
  height?: number
  maxHeight?: string
  open?: boolean
  setOpen?: (open: boolean) => void
  x?: number
  y?: number
}


export default function Dialog({ children, className, variant, title, closeOnOutsideClick, width, height, maxHeight, open, setOpen, x, y, ...props }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const classes = generateClasses(className, variant, 'dialog');

  useEffect(() => {
    bindEventListeners();
  }, []);
  
  const bindEventListeners = () => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDialog();
      }
    };
  
    if (closeOnOutsideClick) {
      window.addEventListener('click', handleOutsideClick);
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }
  };

  const closeDialog = () => {
    setOpen(false);
  };
    

  return (
    <Draggable handle=".dialog__handlebar" y={y} x={x}>
      <dialog open={open} ref={ref} className="dialog" style={{ width: width, height: height }}>
        <div className="dialog__handlebar draggable"></div>
        <div
          {...parseClasses(classes)}
          {...props}
        >
          <h3 className="dialog__title">{ title }</h3>
          <Button variant={["X"]} onClick={closeDialog}>X</Button>
          <div className="dialog__content" style={{ maxHeight: maxHeight }}>
            { children }
          </div>
        </div>
      </dialog>
    </Draggable>
  );
}
