import { Drawer, DrawerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NAV_DRAWER_WIDTH } from "../../consts/sidenav.consts";

type StyledNavDrawerProps = {
  isResHigherThanMobile: boolean;
};

const StyledNavDrawer = styled(
  ({ isResHigherThanMobile, ...rest }: DrawerProps & StyledNavDrawerProps) => (
    <Drawer {...rest} />
  )
)(({ isResHigherThanMobile }) => ({
  width: NAV_DRAWER_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: isResHigherThanMobile ? NAV_DRAWER_WIDTH : "100%",
    boxSizing: "border-box",
  },
}));

const MainDrawerCont = styled(
  ({
    isResHigherThanMobile,
    children,
    ...rest
  }: {
    isResHigherThanMobile: boolean;
    children: any;
  }) => <main {...rest}>{children}</main>,
  {
    shouldForwardProp: (prop) => prop !== "open",
  }
)<{
  open?: boolean;
  isResHigherThanMobile: boolean;
}>(({ theme, open, isResHigherThanMobile }) => ({
  flexGrow: 1,
  padding: isResHigherThanMobile ? 24 : 16,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${NAV_DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default StyledNavDrawer;
export { MainDrawerCont };
