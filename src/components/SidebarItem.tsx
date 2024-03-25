import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { ReactComponentElement, useRef, useState } from "react";
import { useAccount, useTransaction } from "../store";
import EditDrawer from "./EditDrawer";
import AddDrawer from "./AddDrawer";
import currencies from "../data/currencies";

interface Props {
    type: String
    label: String

    data: Record<string, any>
    onSubmit: ((formData: Record<string, any>) => Promise<void>) | ((transactionType: String) => void)
    icon: ReactComponentElement<any>
}


const SidebarItem = ({ type, label, data, onSubmit, icon }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const infoRef = useRef<HTMLButtonElement>(null)
    const filter = useTransaction((state) => state.transactionType)



    return (
        <>
            <Button w={'80%'} h={"5%"} mb={"2"} borderRadius={"xl"} textAlign={'start'} placeContent={"start"}
                onClick={type === "add" ? onOpen : () => (type === filter ? onSubmit("") : onSubmit(type))}
                background={type === "add" ? "#B9E2E6" : "#F9F9F9"} ref={infoRef} leftIcon={icon}>{label}</Button>
            {type === "add" ? <AddDrawer useDisclosure={{ isOpen, onOpen, onClose }} btnRef={infoRef} label={label} data={data} onSubmit={onSubmit as ((formData: Record<string, any>) => Promise<void>)} /> : null}
        </>
    );
}

export default SidebarItem;