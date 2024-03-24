import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { useAccount } from "../store";
import EditDrawer from "./EditDrawer";
import AddDrawer from "./AddDrawer";
import currencies from "../data/currencies";

const AddAccount = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const infoRef = useRef<HTMLButtonElement>(null)
    const addAccount = useAccount((state) => state.addAccount)

    const handleSubmit = async (formData: Record<string, any>) => {
        const updatedData = {
            title: formData.title || "",
            balance: "0.00 " + formData.currency.at(-2),
            currency: formData.currency || "",
            description: formData.description || "",
        };
        addAccount(updatedData)
    }

    const data = {
        "title": "",
        "currency": currencies,
        "description": ""
    }

    return (
        <>
            <Button w={'50%'} textAlign={'start'} placeContent={"start"}
                background={"#B9E2E6"} ref={infoRef} leftIcon={<Box
                    bgColor={"#EE3F19"}
                    borderRadius={'full'}
                    onClick={onOpen}
                    padding={'0.8rem'}>+</Box>}>Add Account</Button>
            <AddDrawer useDisclosure={{ isOpen, onOpen, onClose }} btnRef={infoRef} label={"Add Account"} data={data} onSubmit={handleSubmit} />
        </>
    );
}

export default AddAccount;