import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { ReactComponentElement, useRef } from "react";
import { useAccount } from "../store";
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

// const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     await onSubmit(form);
//     useDisclosure.onClose()
//     setForm(data)

// }

const SidebarItem = ({ type, label, data, onSubmit, icon }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const infoRef = useRef<HTMLButtonElement>(null)



    return (
        <>
            <Button w={'80%'} h={"5%"} mb={"2"} borderRadius={"xl"} textAlign={'start'} placeContent={"start"}
                onClick={type === "add" ? onOpen : () => onSubmit(type)}
                background={type === "add" ? "#B9E2E6" : "#F9F9F9"} ref={infoRef} leftIcon={icon}>{label}</Button>
            {type === "add" ? <AddDrawer useDisclosure={{ isOpen, onOpen, onClose }} btnRef={infoRef} label={label} data={data} onSubmit={onSubmit as ((formData: Record<string, any>) => Promise<void>)} /> : null}
        </>
    );
}

export default SidebarItem;