import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import useDetectDevice from "../../../hooks/useDetectDevice";

export type DatepickerComponentProps = {
  handleDateChange: (date: Date | null) => void;
  value: string | undefined;
  label?: string;
  hasDefaultColor?: boolean;
};
export const DatepickerComponent = ({
  handleDateChange,
  value,
  label,
  hasDefaultColor,
}: DatepickerComponentProps) => {
  const { isAndroid, isIOS } = useDetectDevice();
  const mobileDatePicker = isAndroid() || isIOS() ? " dateInputCalc-1" : "";

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        className={`text-text-placeholder-light ${mobileDatePicker} `}
        aria-label={label}
        onChange={handleDateChange}
        value={value === "" || value === undefined ? null : new Date(value)}
        label={label}
        slotProps={{
          field: { clearable: true },
          textField: {
            fullWidth: true,
            sx: {
              "& .MuiOutlinedInput-root": {
                "& fieldset": hasDefaultColor
                  ? {}
                  : {
                      borderColor: "rgb(243 244 246)",
                    },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
