import StyledLink from "./styled-link";

export default function FormCard({
  title,
  description,
  icon,
  buttonTitle,
  linkProps,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
  buttonTitle: string;
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) {
  return (
    <div
      className={`flex flex-col py-8 justify-between px-6 rounded border-[1px] w-full border-border-primary-light text-text-primary-light`}
    >
      <div>
        {icon}
        <div className="mt-4 ">
          <h2 className={`text-lg font-medium text-text-primary-light`}>
            {title}
          </h2>
          <p className={`text-text-secondary-light`}>{description}</p>
        </div>
      </div>

      <StyledLink className="px-6 w-fit mt-6 font-medium" {...linkProps}>
        {buttonTitle}
      </StyledLink>
    </div>
  );
}
