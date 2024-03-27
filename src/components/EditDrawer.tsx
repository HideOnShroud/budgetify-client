import {
    Grid, GridItem, Heading, Circle, Button, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    VStack,
    HStack,
    Image,
    Divider,
    Spacer,
    Select
} from "@chakra-ui/react"
import { AccountInterface } from "../entities/AccountInterface"
import editButton from "../assets/editButton.svg"
import deleteButton from "../assets/deleteButton.svg"
import { useEffect, useState } from "react"
import { useAccount } from "../store"
import { getCookie } from "typescript-cookie"
import InputMUI from "./InputMUI/InputMUI"
import currencies from "../data/currencies"

interface props {
    useDisclosure: { isOpen: boolean, onOpen: () => void, onClose: () => void }
    btnRef: React.RefObject<HTMLButtonElement>
    label: String
    data: Record<string, any>
    pop: string[]
    onSubmit: (formData: Record<string, any>) => Promise<void>
}

const EditDrawer = ({ useDisclosure, btnRef, label, data, pop, onSubmit }: props) => {



    const [form, setForm] = useState(data)
    const [formCopy, setFormCopy] = useState(data);

    useEffect(() => {
        const initialFormCopy = { ...form }
        for (const key in initialFormCopy) {
            if (key.includes("currency")) {
                initialFormCopy[key] = currencies
            }
            if (key.includes("type")) {
                initialFormCopy[key] = ["Income", "Expense"]
            }
        }
        setFormCopy(initialFormCopy)
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onSubmit(form);
        useDisclosure.onClose()

    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    }

    return (
        <Drawer
            size={'md'}
            isOpen={useDisclosure.isOpen}
            placement='right'
            onClose={useDisclosure.onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>


                <DrawerHeader><HStack><Heading size={'lg'} fontWeight={"500"}>{label}</Heading><Spacer />
                    <HStack>

                        <DrawerCloseButton size={"xl"} mt={4} />
                    </HStack>
                </HStack>
                </DrawerHeader>

                <DrawerBody>
                    <VStack
                        alignItems={'start'}>
                        {Object.entries(formCopy).map(([key, value]) =>
                            pop.includes(key) ? null : (
                                typeof value === "object" ? <Select name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    key={key}>
                                    <option>{key}</option>
                                    {
                                        value.map((vale: string) => <option key={vale} value={vale}>{vale}</option>)}
                                </Select> :
                                    <InputMUI
                                        type={key === "ammount" ? "number" : "text"}
                                        placeholder={key}
                                        key={key}
                                        value={form[key]}
                                        name={key}
                                        onChange={handleChange}
                                    />

                            )
                        )}

                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={useDisclosure.onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue'
                        onClick={
                            handleSubmit
                        }>Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    );
}

export default EditDrawer;