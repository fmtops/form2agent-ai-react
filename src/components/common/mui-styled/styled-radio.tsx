import styled from "styled-components";
import Radio, { RadioProps } from "@mui/material/Radio";

const StyledRadio = styled((props: RadioProps) => (
  <Radio
    sx={{
      color: "#D1D5DB",
      "&.Mui-checked": {
        color: "#687EFF",
      },
    }}
    {...props}
  />
))({});

export default StyledRadio;
