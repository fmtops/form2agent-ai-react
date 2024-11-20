import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Menu } from "../../models/frontdesk-context-model";
import { AddItemType } from "../../models/add-item-model";
import ImageUpload from "../common/image-upload";
import { DeleteOutline } from "@mui/icons-material";

export default function AddItemView({
  items,
  remove,
  setImage,
}: {
  items: AddItemType[];
  remove: (id: string) => void;
  setImage: (id: string, image: string) => void;
}) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 2,
      }}
    >
      {items.map((item, index) => (
        <Grid
          item
          key={index}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              boxShadow: "none",
              border: "1px solid rgba(224, 224, 224, 1)",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <div className="flex flex-row justify-between items-center">
                  <Typography variant="h6" component="div">
                    #{item.id}
                  </Typography>
                  <button
                    className={` p-2 text-button-light`}
                    onClick={() => remove(item.id!)}
                  >
                    <DeleteOutline />
                  </button>
                </div>

                <Typography variant="body2" color="text.secondary">
                  Name: {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Amount: {item.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {item.price}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="pb-2"
                >
                  Barcode: {item.barcode}
                </Typography>
                <ImageUpload
                  previewText="Product preview"
                  uploadText="Upload image"
                  setImage={(image) => setImage(item.id!, image)}
                  image={item.image}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
