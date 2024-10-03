import { Drawer, DrawerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MAX_CONTENT_WIDTH } from "../../consts/resolutions.consts";
import { NAV_DRAWER_WIDTH } from "../../consts/sidenav.consts";

type StyledNavDrawerProps = {
  shouldShowContent: boolean;
};

const StyledNavDrawer = styled(
  ({
    shouldShowContent: isResHigherThanMobile,
    ...rest
  }: DrawerProps & StyledNavDrawerProps) => <Drawer {...rest} />
)(({ shouldShowContent }) => ({
  width: NAV_DRAWER_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: shouldShowContent ? NAV_DRAWER_WIDTH : "100%",
    boxSizing: "border-box",
  },
}));

const MainDrawerCont = styled(
  ({
    isResHigherThanTablet,
    children,
    ...rest
  }: {
    isResHigherThanTablet: boolean;
    children: any;
  }) => <main {...rest}>{children}</main>
)<{
  isResHigherThanTablet: boolean;
}>(({ isResHigherThanTablet }) => ({
  maxWidth: MAX_CONTENT_WIDTH,
  margin: "0 auto",
  flexGrow: 1,
  padding: isResHigherThanTablet ? 32 : 24,
}));

export default StyledNavDrawer;
export { MainDrawerCont };
