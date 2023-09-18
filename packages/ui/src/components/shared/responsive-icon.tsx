import { noop } from "@banjoanton/utils";
import { FC } from "react";
import { cn } from "../../utils";
import { IconSize, IconType, iconSizeMapper } from "./icons";
import { Tooltip } from "./tooltip";

type FilterIconProps = {
    Icon: IconType;
    tooltip?: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    size?: IconSize;
    enableTooltip?: boolean;
};

export const ResponsiveIcon: FC<FilterIconProps> = ({
    Icon,
    disabled,
    onClick = noop,
    tooltip,
    enableTooltip = false,
    size = "sm",
    className,
}) => {
    return (
        <Tooltip tooltip={tooltip} enabled={enableTooltip}>
            <Icon
                className={cn(
                    `${iconSizeMapper[size]} 
                    active:opacity-40 
                    ${disabled ? "opacity-30" : "cursor-pointer hover:opacity-70 outline-none"}`,
                    className
                )}
                onClick={disabled ? noop : onClick}
                disabled={disabled ?? false}
            />
        </Tooltip>
    );
};
