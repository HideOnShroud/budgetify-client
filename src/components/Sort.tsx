import { Menu, MenuButton, MenuList, MenuItem, MenuIcon, Image, Box } from "@chakra-ui/react";
import { useSearch } from "../store";
import { useState } from "react";
import sortIcon from "../assets/sort.svg"
import sortIconU from "../assets/sortU.svg"


const Sort = () => {

    const setSort = useSearch((state) => state.setSort)
    const [sortName, setSortName] = useState("")
    const [sortDisplay, setSortDisplay] = useState(Number)


    return (


        <Menu>
            <MenuButton pb={1}>
                <MenuIcon><Image src={sortDisplay === 1 ? sortIcon : sortDisplay === 2 ? sortIconU : sortIcon} />
                </MenuIcon> {sortName != "" ? sortName : "Set Sort"}
            </MenuButton>

            <MenuList>
                <MenuItem onClick={() => {
                    setSort("")
                    setSortName("Sort By")

                    setSortDisplay(1)

                }}>Sort By</MenuItem>

                <MenuItem onClick={() => {
                    setSort("newToOld")
                    setSortName("Creation Date")
                    setSortDisplay(1)
                }}><Image src={sortIcon} /> Date</MenuItem>
                <MenuItem onClick={() => {
                    setSort("oldToNew")
                    setSortName("Creation Date")
                    setSortDisplay(2)
                }
                }><Image src={sortIconU} /> Date</MenuItem>
            </MenuList>
        </Menu>

    );
}

export default Sort;