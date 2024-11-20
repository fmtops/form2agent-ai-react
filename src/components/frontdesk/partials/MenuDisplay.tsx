import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Menu } from "../../../models/frontdesk-context-model";

const MenuDisplay: React.FC = () => {
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
      {Menu.map((item, index) => (
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
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.category}
                </Typography>
              </div>
              <Typography
                variant="h6"
                component="div"
                sx={{ alignSelf: "flex-start" }}
              >
                ${item.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuDisplay;
