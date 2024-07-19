import { ReactNode, useState } from "react";
import SideNav from "../../components/sidenav/sidenav";
import useResolutionCheck from "../../hooks/useResolutionCheck";
import BurgerButton from "../../components/sidenav/burger-button";
import StyledNavDrawer, {
  MainDrawerCont,
} from "../../components/sidenav/nav-drawer";

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
  const { isResHigherThanMobile } = useResolutionCheck();
  const [isNavbarOpen, setIsNavbarOpen] = useState(isResHigherThanMobile);

  return (
    <div
      className={
        "flex min-h-screen transition-all duration-500 ease-in-out overflow-y-auto bg-white text-black"
      }
    >
      <StyledNavDrawer
        isResHigherThanMobile={isResHigherThanMobile}
        variant={"persistent"}
        anchor="left"
        hideBackdrop
        open={isNavbarOpen}
      >
        <SideNav setIsNavbarOpen={setIsNavbarOpen} />
      </StyledNavDrawer>
      <MainDrawerCont
        isResHigherThanMobile={isResHigherThanMobile}
        open={isNavbarOpen}
      >
        <div className={"flex-grow bg-white"}>
          <BurgerButton
            isVisible={isNavbarOpen}
            onClick={() => setIsNavbarOpen(true)}
          />
          {children}
        </div>
      </MainDrawerCont>
    </div>
  );
};

export default MainLayout;
