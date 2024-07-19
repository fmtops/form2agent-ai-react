import CheckIcon from "@mui/icons-material/Check";

export type ProgressBarProps = {
  steps: string[];
  currentStep: number;
};

export const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  return (
    <div className="flex items-center gap-8 flex-wrap">
      {steps.map((step: string, index: number) => (
        <div key={step} className="flex items-center justify-center gap-2">
          <span
            className={`rounded-full h-6 w-6 text-sm flex items-center justify-center
                ${
                  currentStep >= index + 1
                    ? "bg-bg-brand-contrast-light text-white"
                    : "bg-bg-disabled-secondary-light text-text-disabled-light"
                }`}
          >
            {currentStep > index + 1 ? (
              <CheckIcon sx={{ width: 16, height: 16 }} />
            ) : (
              index + 1
            )}
          </span>
          <span
            className={`flex self-center text-sm ${
              currentStep >= index + 1
                ? " text-text-primar-light font-medium"
                : " text-text-secondary-light"
            }`}
          >
            {step}
          </span>
          {index + 1 < steps.length && (
            <div
              className={`ml-6 flex self-center w-5 border-t border-border-primary-light`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};
