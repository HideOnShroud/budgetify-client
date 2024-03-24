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
    Select,
} from "@chakra-ui/react"
import { AccountInterface } from "../entities/AccountInterface"
import editButton from "../assets/editButton.svg"
import deleteButton from "../assets/deleteButton.svg"
import { useState } from "react"
import { useAccount } from "../store"
import { getCookie } from "typescript-cookie"
import InputMUI from "./InputMUI/InputMUI"

interface props {
    useDisclosure: { isOpen: boolean, onOpen: () => void, onClose: () => void }
    btnRef: React.RefObject<HTMLButtonElement>
    label: String
    data: Record<string, any>
    onSubmit: (formData: Record<string, any>) => Promise<void>
}

const AddDrawer = ({ useDisclosure, btnRef, label, data, onSubmit }: props) => {



    const [form, setForm] = useState(data)


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onSubmit(form);
        useDisclosure.onClose()
        setForm(data)

    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        console.log(data)

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
                        {Object.entries(form).map(([key, value]) =>
                            typeof value === "object" ? <Select name={key} onChange={handleChange} key={key}>{
                                value.map((vale: string) => <option value={vale}>{vale}</option>,
                                    console.log(value))}
                            </Select>
                                :

                                (console.log(value),

                                    // <Input
                                    //     key={key}
                                    //     value={value}
                                    //     name={key}
                                    //     onChange={handleChange}
                                    // />
                                    // ,
                                    <InputMUI placeholder={key} key={key}
                                        value={value}
                                        name={key}
                                        onChange={handleChange} />
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

export default AddDrawer;