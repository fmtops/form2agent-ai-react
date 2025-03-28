import { Dialog, DialogProps } from "@mui/material";
import React, { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Webcam from "react-webcam";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

export default function CameraPopup({
  onClose,
  onConfirm,
  icon,
  ...rest
}: {
  onClose: () => void;
  onConfirm: (imageSrc: string) => void;
  icon?: React.ReactNode;
} & DialogProps) {
  const webcamRef = React.useRef<Webcam>(null);
  const [permissionDenied, setPermissionDenied] = useState(true);
  const handleUserMediaError = useCallback((error: any) => {
    if (
      error.name === "NotAllowedError" ||
      error.name === "PermissionDeniedError"
    ) {
      console.error("User denied camera access");
      setPermissionDenied(true);
    }
  }, []);

  const handleUserMedia = useCallback(() => {
    setPermissionDenied(false);
  }, []);
  const takePicturePressed = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc === null) return;
      onConfirm(imageSrc);
    }
  };
  return (
    <Dialog
      maxWidth="md"
      className="flex items-center justify-center p-2 "
      {...rest}
    >
      <div className="p-8 bg-white rounded-[8px] flex flex-col relative w-full outline-none h-[600px] min-w-[565px]">
        <div className="flex justify-between mb-2">
          <div>{icon}</div>
          <div className="cursor-pointer" onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="flex items-center">
          <h2 className="font-medium text-2xl text-gray-800">
            Use your camera to take pictures
          </h2>
        </div>
        {permissionDenied && (
          <div className="flex items-center justify-center w-full bg-bg-primary-solid-light">
            <div className="flex flex-col items-center justify-center rounded-md w-[500px] h-96 bg-bg-primary-solid-light text-center">
              <CameraAltOutlinedIcon
                style={{ fontSize: "48px", color: "white" }}
              />
              <p className="mt-4 text-white text-lg font-medium">
                Please allow camera access
              </p>
            </div>
          </div>
        )}
        <div
          className="min-h-[400px]"
          style={{ display: permissionDenied ? "none" : "" }}
        >
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
            mirrored
            style={{
              width: "100%",
              maxWidth: "500px",
              marginBottom: "1rem",
            }}
          />
        </div>
        {!permissionDenied && (
          <div className="flex">
            <button
              onClick={takePicturePressed}
              className="border border-blue-500 text-blue-500 rounded-[4px] px-4 py-2 outline-none"
            >
              Take a picture
            </button>
          </div>
        )}
      </div>
    </Dialog>
  );
}
