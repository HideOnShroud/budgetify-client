import SidebarItem from "./SidebarItem"
import { SidebarItemInterface } from "../entities/SidebarItemInterface";
import { ReactComponentElement } from "react";

interface Props {
    data: ReactComponentElement<any>[]
}

const Sidebar = ({ data }: Props) => {
    return (
        <>
            {data.map((item) =>
                item
            )}

        </>
    );
}

export default Sidebar;