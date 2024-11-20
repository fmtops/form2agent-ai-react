import { InputAdornment, TextField } from "@mui/material";
import { AmountFilterType } from "../../../models/ecommerce-model";

export default function AmountFilter({
  value,
  handleAmountChange,
  name,
  shouldRenderDollarSign = true,
}: {
  value: Partial<AmountFilterType>;
  handleAmountChange: ({ min, max }: { min?: number; max?: number }) => void;
  name?: string;
  shouldRenderDollarSign?: boolean;
}) {
  // TODO add validation to ensure min is less than max
  return (
    <div className="font-medium text-md">
      {name ?? "Total Amount"}
      <div className="flex gap-4 mt-3">
        <TextField
          placeholder="Min"
          variant="outlined"
          size="small"
          className="w-1/2"
          value={value.min || ""}
          type="number"
          InputProps={{
            startAdornment: shouldRenderDollarSign && (
              <InputAdornment position="start">$</InputAdornment>
            ),
          }}
          onChange={(e) => {
            handleAmountChange({
              min: parseInt(e.target.value),
            });
          }}
        />
        <TextField
          placeholder="Max"
          variant="outlined"
          size="small"
          className="w-1/2"
          type="number"
          value={value.max || ""}
          InputProps={{
            startAdornment: shouldRenderDollarSign && (
              <InputAdornment position="start">$</InputAdornment>
            ),
          }}
          onChange={(e) => {
            handleAmountChange({
              max: parseInt(e.target.value),
            });
          }}
        />
      </div>
    </div>
  );
}
