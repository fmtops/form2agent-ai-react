import FilterListIcon from "@mui/icons-material/FilterList";
import { useLayout } from "../../contexts/LayoutContext";

export default function OrdersTitle({
  setAreFiltersOpenOnMobile,
}: {
  setAreFiltersOpenOnMobile: () => void;
}) {
  const { isChatExpanded, isNavbarExpanded } = useLayout();

  // On larger screens, filters are always visible, the toggle need not be displayed
  const filtersButtonRespClasses =
    isChatExpanded && isNavbarExpanded
      ? "lg-chat:hidden"
      : isChatExpanded
        ? "md-chat:hidden"
        : isNavbarExpanded
          ? "lg:hidden"
          : "md:hidden";

  const filtersButtonClasses = `${filtersButtonRespClasses} text-md text-text-brand-light px-4 py-[6px] font-medium border-[1px] rounded border-border-brand-light flex gap-1 items-center`;

  return (
    <div className="flex flex-row justify-between">
      Orders
      <button
        onClick={setAreFiltersOpenOnMobile}
        className={filtersButtonClasses}
      >
        <FilterListIcon /> Filters
      </button>
    </div>
  );
}
