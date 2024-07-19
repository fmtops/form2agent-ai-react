import FilterListIcon from "@mui/icons-material/FilterList";

export default function OrdersTitle({
  setIsFiltersMobileOpen,
}: {
  setIsFiltersMobileOpen: () => void;
}) {
  return (
    <div className="flex flex-row justify-between">
      Orders
      <button
        onClick={setIsFiltersMobileOpen}
        className={`md:hidden text-md text-text-brand-light px-4 py-[6px] font-medium border-[1px] rounded border-border-brand-light flex gap-1 items-center`}
      >
        <FilterListIcon /> Filters
      </button>
    </div>
  );
}
