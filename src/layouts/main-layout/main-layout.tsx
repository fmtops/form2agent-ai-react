import { ReactNode, useEffect } from "react";
import SideNav from "../../components/sidenav/sidenav";
import useResolutionCheck from "../../hooks/useResolutionCheck";
import BurgerButton from "../../components/sidenav/burger-button";
import StyledNavDrawer, {
  MainDrawerCont,
} from "../../components/sidenav/nav-drawer";
import CookiePopup from "../../components/common/cookie-popup";
import { useLayout } from "../../contexts/LayoutContext";

type MainLayoutProps = {
  children: ReactNode;
};
/**
 *
 * @param children - children components
 * @returns the main layout component
 * @description Used to render the main layout of the application with side navigation
 *
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  const { shouldShowContent, isResHigherThanTablet } = useResolutionCheck();
  const { isNavbarExpanded, setIsNavbarExpanded } = useLayout();

  useEffect(() => {
    setIsNavbarExpanded(isResHigherThanTablet);
  }, []);

  const mainLayoutClasses = `flex min-h-screen transition-all duration-500 ease-in-out overflow-y-auto 
    bg-white text-black ${isNavbarExpanded ? "ml-nav-width max-content-with-nav-bp:ml-0" : ""}`;

  return (
    <div className={mainLayoutClasses}>
      <MainDrawerCont isResHigherThanTablet={isResHigherThanTablet}>
        <StyledNavDrawer
          shouldShowContent={shouldShowContent}
          variant={"persistent"}
          anchor="left"
          hideBackdrop
          open={isNavbarExpanded}
        >
          <SideNav setIsNavbarOpen={setIsNavbarExpanded} />
        </StyledNavDrawer>
        <div className={"flex-grow bg-white"}>
          <BurgerButton
            isVisible={isNavbarExpanded}
            onClick={() => setIsNavbarExpanded(true)}
          />
          {children}
        </div>
      </MainDrawerCont>
      <CookiePopup />
    </div>
  );
};

export default MainLayout;
