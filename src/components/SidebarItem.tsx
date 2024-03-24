import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { useAccount } from "../store";
import EditDrawer from "./EditDrawer";
import AddDrawer from "./AddDrawer";
import currencies from "../data/currencies";

interface Props {
    label: String
    data: Record<string, any>
    onSubmit: (formData: Record<string, any>) => Promise<void>
}

const SidebarItem = ({ label, data, onSubmit }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const infoRef = useRef<HTMLButtonElement>(null)



    return (
        <>
            <Button w={'50%'} textAlign={'start'} placeContent={"start"}
                background={"#B9E2E6"} ref={infoRef} leftIcon={<Box
                    bgColor={"#f9f9f9"}
                    borderRadius={'full'}
                    onClick={onOpen}
                    color={"#B9E2E6"}
                    padding={'0.8rem'}
                    fontSize={'xl'}>+</Box>}>{label}</Button>
            <AddDrawer useDisclosure={{ isOpen, onOpen, onClose }} btnRef={infoRef} label={label} data={data} onSubmit={onSubmit} />
        </>
    );
}

export default SidebarItem;