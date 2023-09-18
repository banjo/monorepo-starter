// I want to export sidemenu so I can use it like this:

import { Category } from "./category";
import { Divider } from "./divider";
import { Item } from "./item";
import { Menu } from "./menu";
import { SubMenu } from "./sub-menu";

export const SideMenu = {
    Menu: Menu,
    Category,
    Divider,
    Item,
    SubMenu,
};
