import { svgIconIds, svgSpritePath } from "@/constants/svg-icons";
import type { SvgIconName } from "@/types/svg-icon";
import type { SVGProps } from "react";

type SvgIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: SvgIconName;
  title?: string;
};

export default function SvgIcon({
  name,
  title,
  className,
  ...props
}: SvgIconProps) {
  const titleId = title ? `${name}-icon-title` : undefined;

  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-labelledby={titleId}
      className={className}
      focusable="false"
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <use href={`${svgSpritePath}#${svgIconIds[name]}`} />
    </svg>
  );
}
