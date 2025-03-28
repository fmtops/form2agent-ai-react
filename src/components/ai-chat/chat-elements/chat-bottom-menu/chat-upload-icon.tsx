import { CloudUploadOutlined } from "@mui/icons-material";
import { SupportedFileExtensions } from "../../../../consts/files";
import { useState } from "react";
import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import CameraPopup from "../../../common/camera-popup";
import useDetectDevice from "../../../../hooks/useDetectDevice";

export default function ChatUploadIcon({
  handleFileUpload,
  fileInputRef,
  onFileChange,
  onCameraPictureTaken,
}: {
  handleFileUpload: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (e: any) => void;
  onCameraPictureTaken: (imageSrc: string) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const { isMobile } = useDetectDevice();
  const isMenuOpen = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloudClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile()) {
      handleFileUpload();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleSelectFileClick = () => {
    handleFileUpload();
    handleClose();
  };

  const handleUseCameraClick = () => {
    setIsCameraOpen(true);
    handleClose();
  };

  const onPicTaken = (imageSrc: string) => {
    onCameraPictureTaken(imageSrc);
    setIsCameraOpen(false);
  };
  return (
    <>
      <CameraPopup
        open={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onConfirm={onPicTaken}
      />
      <div id="chat-upload-button" className="p-2">
        <IconButton onClick={handleCloudClick} sx={{ padding: "0px " }}>
          <CloudUploadOutlined
            className={`cursor-pointer text-fg-secondary-light`}
          />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          disableScrollLock
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleSelectFileClick}>Select File</MenuItem>
          <MenuItem onClick={handleUseCameraClick}>Use Camera</MenuItem>
        </Menu>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onFileChange}
          accept={Object.values(SupportedFileExtensions).join(",")}
        />
      </div>
    </>
  );
}
