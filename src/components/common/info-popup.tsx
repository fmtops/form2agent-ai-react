import { Dialog, DialogProps } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import StyledLink from "./styled-link";

export default function InfoPopup({
  title,
  onClose,
  onConfirm,
  confirmText,
  icon,
  children,
  ...rest
}: {
  title: string;
  onClose?: () => void;
  onConfirm?: (() => void) | string; // action or link
  confirmText?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
} & DialogProps) {
  return (
    <Dialog
      maxWidth="sm"
      className="flex items-center justify-center p-2"
      {...rest}
    >
      <div className="p-8 bg-white rounded-[8px] flex flex-col relative w-full outline-none">
        <div className="flex justify-between mb-2">
          <div>{icon}</div>
          <div className="cursor-pointer" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="flex items-center">
          <h2 className="font-medium text-2xl text-gray-800">{title}</h2>
        </div>
        <div className="text-gray-600 mb-6 mt-4">{children}</div>
        {confirmText && (onConfirm || onClose) && (
          <div className="flex">
            {typeof onConfirm === "string" ? (
              <StyledLink linkType="secondary" href={onConfirm}>
                {confirmText}
              </StyledLink>
            ) : (
              <button
                onClick={onConfirm ?? onClose}
                className="border border-blue-500 text-blue-500 rounded-[4px] px-4 py-2 outline-none"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
}
