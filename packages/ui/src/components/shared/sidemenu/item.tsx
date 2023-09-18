import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../badge";
import { IconType } from "../icons";
import { Tooltip } from "../tooltip";

type ItemProps = {
    title: string;
    Icon?: IconType;
    image?: string | null;
    url: string;
    selected: boolean;
    highlight?: boolean;
    notification?: ReactNode;
    notificationTooltip: string;
    onClick?: () => void;
};

export const Item: FC<ItemProps> = ({
    title,
    Icon,
    notification,
    notificationTooltip,
    url,
    image,
    selected = false,
    highlight = false,
    onClick,
}) => {
    const selectedClasses = selected
        ? "bg-slate-100 dark:bg-slate-800"
        : "hover:bg-slate-50 dark:hover:bg-slate-900";

    const highlightClasses = highlight ? "font-semibold" : "";

    return (
        <Link
            to={url}
            onClick={onClick}
            className={`flex relative h-10 w-full md:w-72 cursor-pointer items-center justify-between gap-4 rounded
            px-4 md:px-6 text-foreground
            ${selectedClasses}
            ${highlightClasses}
            `}
        >
            <div className="flex items-center gap-4 relative overflow-hidden">
                <span className="w-6 h-6 ">
                    {Icon && <Icon className="w-6 h-6" />}
                    {image && <img src={image} className="h-6 w-6 max-w-none" />}
                </span>
                <Tooltip tooltip={title}>
                    <span className="text-lg md:text-sm truncate w-full md:w-36">{title}</span>
                </Tooltip>
            </div>

            <Badge className="" show={Boolean(notification)} tooltip={notificationTooltip}>
                {notification}
            </Badge>
        </Link>
    );
};