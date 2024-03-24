import { JSXElementConstructor, ReactElement } from "react"

export interface SidebarItemInterface {
    type: number,
    icon: ReactElement<any, string | JSXElementConstructor<any>>,
    text: string
}