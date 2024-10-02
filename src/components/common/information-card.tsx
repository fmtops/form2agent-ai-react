import StyledLink from "./styled-link";

export default function InformationCard({
  title,
  buttonTitle,
  image,
  linkProps,
}: {
  title: string;
  buttonTitle: string;
  image: string;
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) {
  return (
    <div
      className={`flex flex-col py-8 px-6 rounded border-[1px] w-full border-border-primary-light text-text-primary-light`}
    >
      <div className="flex-1 flex flex-col">
        <h2 className={`text-lg min-h-14 font-medium text-text-primary-light`}>
          {title}
        </h2>
        <StyledLink className="px-6 w-fit mt-6 mb-8 font-medium" {...linkProps}>
          {buttonTitle}
        </StyledLink>
      </div>
      <img src={image} alt={title} className="w-full object-contain" />
    </div>
  );
}
