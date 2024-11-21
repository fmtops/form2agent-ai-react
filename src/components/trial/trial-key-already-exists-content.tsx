import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StyledLink from "../common/styled-link";

export default function TrialKeyAlreadyExistsDialogContent({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="pt-8 pb-8 flex flex-col gap-1">
      <div>
        <div className="flex justify-between items-center">
          <CalendarTodayIcon color="primary" />
          <CloseIcon
            onClick={onClose}
            className="cursor-pointer text-fg-primary-light"
          />
        </div>
        <h2 className="text-2xl p-0 pt-4">Let’s talk!</h2>
      </div>
      <div className="px-0 py-0">
        <div className="flex flex-col gap-6">
          <span className="text-text-secondary-light">
            It looks like you've already explored our app with the free trial.
            If you're interested in diving deeper, schedule a meeting with
            us—we’d be happy to give you a full walkthrough.
          </span>
          <StyledLink
            href="https://calendar.app.google/6jaKPZD9oa9xHDty5"
            target="_blank"
            linkType="secondary"
          >
            Schedule a meeting
          </StyledLink>
        </div>
      </div>
    </div>
  );
}
