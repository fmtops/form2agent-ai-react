import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  IconButton,
  Collapse,
  Card,
  Paper,
  useMediaQuery,
} from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { FrontdeskOrderItem } from "../../models/frontdesk-model";
import SubmitButton from "../common/form/submit-button";
import MenuDisplay from "./partials/MenuDisplay";
import { SmallTableCell } from "../common/mui-styled/styled-tablecell";
import { SmallTableRow } from "../common/mui-styled/styled-tablerow";

export default function FrontDeskView({
  orders,
  remove,
}: {
  orders: FrontdeskOrderItem[];
  remove: (id: number) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const totalSum = orders.reduce(
    (sum, item) => sum + Number(item.item.price) * Number(item.amount),
    0
  );

  return (
    <div>
      <SubmitButton
        value={isMenuOpen ? "Hide menu" : "Open menu"}
        className="my-4"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />
      <div style={{ width: "100%", margin: "0 auto" }}>
        <Collapse in={isMenuOpen} className="mb-4">
          <MenuDisplay />
        </Collapse>

        {orders === undefined || orders?.length === 0 ? (
          <h2>
            Please use the form above or the chat feature to add products to
            your bill.
          </h2>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              border: "1px solid rgba(224, 224, 224, 1)",
            }}
          >
            <Table size={"small"}>
              <TableHead>
                <SmallTableRow>
                  <SmallTableCell>Name</SmallTableCell>
                  <SmallTableCell>Price</SmallTableCell>
                  <SmallTableCell>Amount</SmallTableCell>
                  <SmallTableCell>Total</SmallTableCell>
                  <SmallTableCell>Actions</SmallTableCell>
                </SmallTableRow>
              </TableHead>
              <TableBody>
                {orders?.length > 0 &&
                  orders.map((item: FrontdeskOrderItem, index: number) => (
                    <SmallTableRow key={item.id}>
                      <SmallTableCell>{item.item.name}</SmallTableCell>
                      <SmallTableCell>
                        <span>
                          ${(Number(item.item.price) || 0).toFixed(2)}
                        </span>
                      </SmallTableCell>
                      <SmallTableCell>{item.amount}</SmallTableCell>
                      <SmallTableCell>
                        <span className="font-bold">
                          $
                          {(
                            Number(item.item.price) * Number(item.amount) || 0
                          ).toFixed(2)}
                        </span>
                      </SmallTableCell>
                      <SmallTableCell sx={{ width: "80px" }}>
                        <button
                          className={` p-2  text-button-light`}
                          onClick={() => remove(item.id)}
                        >
                          <DeleteOutline />
                        </button>
                      </SmallTableCell>
                    </SmallTableRow>
                  ))}
              </TableBody>
              <SmallTableRow>
                <SmallTableCell colSpan={4} align="right">
                  <strong>Total Sum:</strong>
                </SmallTableCell>
                <SmallTableCell colSpan={2}>
                  <strong>${totalSum.toFixed(2)}</strong>
                </SmallTableCell>
              </SmallTableRow>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
