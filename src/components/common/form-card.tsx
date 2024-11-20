import { OverridableComponent } from "@mui/material/OverridableComponent";
import StyledLink from "./styled-link";
import { SvgIconTypeMap } from "@mui/material";

export default function FormCard({
  title,
  description,
  Icon,
  buttonTitle,
  linkProps,
}: {
  title: string;
  description: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  buttonTitle: string;
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) {
  return (
    <div
      className={`flex flex-col py-8 justify-between px-6 rounded border-[1px] w-full border-border-primary-light text-text-primary-light`}
    >
      <div>
        <Icon />
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
