import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { emailConfig } from "../../configs/configs";

export default function TrialThankYouDialogContent({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div
      id="trial-thank-you-dialog-content"
      className="pt-8 pb-8 flex flex-col gap-1"
    >
      <div>
        <div className="flex justify-between items-center">
          <CheckCircleOutlineIcon className="!fill-emerald" />
          <CloseIcon
            onClick={onClose}
            className="cursor-pointer text-fg-primary-light"
          />
        </div>
        <h2 className="text-2xl p-0 pt-4">Thank you!</h2>
      </div>
      <div className="px-0 py-0">
        <span className="text-text-secondary-light">
          <p>
            We’ve just sent a link to your email to start your free trial of
            Form2Agent.
          </p>
          <br />
          <p className="font-bold">What’s Next?</p>
          <br />
          <p>
            <span className="font-bold">1. Check Your Inbox:</span> Look for an
            email from Form2Agent. If you don’t see it, check your spam or
            promotions folder.
          </p>
          <p>
            <span className="font-bold">2. Click the Link:</span> Open the email
            and click on the “Start Your Free Trial” link.
          </p>
          <p>
            <span className="font-bold">3. Start Exploring:</span> Dive into the
            powerful features of Form2Agent and start streamlining your
            workflow.
          </p>
          <br />
          <p>
            If you have any questions or don’t receive the email within a few
            minutes, please contact our support team at{" "}
            <a
              className="text-text-brand-light"
              href={`mailto:${emailConfig.SUPPORT_EMAIL}`}
            >
              {emailConfig.SUPPORT_EMAIL}
            </a>
            .
          </p>
        </span>
      </div>
    </div>
  );
}
