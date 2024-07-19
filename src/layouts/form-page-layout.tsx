import React from "react";
import SubmitButton from "../components/common/form/submit-button";
import SuccessFormModal from "../components/common/success-form-modal";
import useResolutionCheck from "../hooks/useResolutionCheck";
/**
 * @param title - title of the form
 * @param subTitle - subtitle of the form
 * @param children - form elements
 * @param onSubmit - function to call on form default submit button, if not provided, the submit button will not be rendered
 * @param chatElement - chat element
 * @param isChatOpen - chat open status
 * @param isSuccessModalOpen - success modal open status
 * @param onCloseModal - function to call on modal close
 * @param containerWidth - width of the container. Overrides the default width
 * @returns the component to wrap form with default page layout
 * @description Used to render form inside the default page layout for forms
 */
export default function FormPageLayout({
  title,
  subTitle,
  children,
  onSubmit,
  chatElement,
  isChatOpen,
  isSuccessModalOpen,
  onCloseModal,
  containerWidth,
}: {
  title: string | React.ReactNode;
  subTitle?: string;
  onSubmit?: () => void;
  children: React.ReactNode;
  chatElement: React.ReactNode;
  isChatOpen: boolean;
  isSuccessModalOpen?: boolean;
  onCloseModal?: () => void;
  containerWidth?: string;
}) {
  const { isResHigherThanMobile, isLaptopResolution } = useResolutionCheck();

  const width =
    isLaptopResolution || (isResHigherThanMobile && isChatOpen)
      ? "calc(100% - 387px)"
      : "";
  return (
    <div className={`flex bg-gray-100 text-black`}>
      <div style={{ width: containerWidth || width }} className={`p-6 pr-4`}>
        <h1 className="text-2xl mb-2">{title}</h1>
        <p className="mb-8 text-textSecondary">{subTitle}</p>
        {children}
        {onSubmit && <SubmitButton onClick={onSubmit} />}
      </div>
      {chatElement}
      <SuccessFormModal
        onClose={() => (onCloseModal ? onCloseModal() : null)}
        isVisible={Boolean(isSuccessModalOpen)}
      />
    </div>
  );
}
