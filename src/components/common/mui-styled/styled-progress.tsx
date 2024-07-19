import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

type StyledProgressProps = {
  barColor?: string;
  value: number;
};

const StyledProgress = styled(LinearProgress)<StyledProgressProps>(
  ({ barColor, value }) => ({
    opacity: value <= 0 ? 0 : 1,
    transition: "opacity .2s linear",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#E9E8FF",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barColor || "#263080",
      transition: "transform .04s linear",
    },
  })
);

export default StyledProgress;
