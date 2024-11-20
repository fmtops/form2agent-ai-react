import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import {
  UploadButton,
  VisuallyHiddenInput,
} from "../../consts/helpdesk.consts";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";

export default function ImageUpload({
  previewText,
  uploadText,
  setImage,
  image,
}: {
  previewText: string;
  uploadText: string;
  setImage: (image: string) => void;
  image?: string;
}) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please upload a valid image file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const imageURL = reader.result as string;
        setImage(imageURL);
        setErrorMessage(null); // Clear error if any
      };
      reader.onerror = () => {
        setErrorMessage("Error reading file.");
      };
      reader.readAsDataURL(file); // Converts image to base64 with data URL prefix
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <UploadButton
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<BackupOutlinedIcon />}
          className="bg-green-200 w-fit"
        >
          {uploadText}
          <input
            accept="image/*"
            type="file"
            id="image-upload"
            className="hidden"
            onChange={handleImageUpload}
          />
        </UploadButton>
      </Grid>

      {errorMessage && (
        <Grid item xs={12}>
          <Typography color="error">{errorMessage}</Typography>
        </Grid>
      )}

      {image && (
        <Grid item xs={12}>
          <Typography variant="body2">{previewText}</Typography>
          <img
            src={image}
            alt="Uploaded preview"
            className="max-w-full h-auto"
          />
        </Grid>
      )}
    </Grid>
  );
}
