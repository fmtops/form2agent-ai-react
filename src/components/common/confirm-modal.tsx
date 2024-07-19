import { Modal, ModalProps } from "@mui/material";
import React from "react";

/**
 * @param title - title of the modal
 * @param onConfirm - function to handle the confirm event
 * @param onCancel - function to handle the cancel event
 * @param confirmText - text to display on the confirm button
 * @param cancelText - text to display on the cancel button
 * @param children - children to be rendered inside the modal
 * @param rest - rest of the modal props Material UI Modal
 * @returns ConfirmModal component
 * @description Modal component with confirm and cancel buttons.
 */
export default function ConfirmModal({
  title,
  onConfirm,
  onCancel,
  confirmText = "Allow",
  cancelText = "Don't allow",
  children,
  ...rest
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
} & ModalProps) {
  return (
    <Modal className="flex items-center justify-center p-2" {...rest}>
      <div className="p-8 bg-white rounded-[4px] flex flex-col ">
        <h2 className=" font-medium text-xl text-text-primary-light ">
          {title}
        </h2>
        {children}
        <div className="flex gap-2">
          <button
            className="text-text-brand-light border-border-brand-light font-medium min-h-10 border rounded-[4px] px-8 py-[6px]"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-bg-brand-contrast-light min-h-10 font-medium text-white rounded-[4px] px-8 py-[6px]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
