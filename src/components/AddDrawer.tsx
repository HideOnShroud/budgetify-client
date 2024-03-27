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
import { useEffect, useState } from "react"
import { useAccount } from "../store"
import InputMUI from "./InputMUI/InputMUI"
import currencies from "../data/currencies"

interface props {
    useDisclosure: { isOpen: boolean, onOpen: () => void, onClose: () => void }
    btnRef: React.RefObject<HTMLButtonElement>
    label: String
    data: Record<string, any>
    onSubmit: (formData: Record<string, any>) => Promise<void>
}

const AddDrawer = ({ useDisclosure, btnRef, label, data, onSubmit }: props) => {

    const [form, setForm] = useState(data)

    const [formCopy, setFormCopy] = useState(data);
    const [isTitle, setIsTitle] = useState(true)
    const [isCurrency, setIsCurrency] = useState(true)
    const [isAmount, setIsAmount] = useState(true)
    const [isPayee, setIsPayee] = useState(true)
    const [isType, setIsType] = useState(true)
    const [isCategory, setIsCategory] = useState(true)

    useEffect(() => {
        setFormCopy({ ...form });
    }, []);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onSubmit(form);
        useDisclosure.onClose()
        setForm(data)

    }


    const handleChange = (e: any) => {

        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (!Object.keys(form).includes("currency")) {
            setIsCurrency(false);
        }
        if (!Object.keys(form).includes("amount")) {
            setIsAmount(false);
        }
        if (!Object.keys(form).includes("payee")) {
            setIsPayee(false);
        }
        if (!Object.keys(form).includes("type")) {
            setIsType(false);
        }
        if (!Object.keys(form).includes("category")) {
            setIsCategory(false);
        }

        if (e.target.name == "title") {
            setIsTitle(e.target.value == "")
        }
        if (e.target.name == "currency") {
            if (typeof e.target.value == "object") {
                setIsCurrency(true)
            }
            setIsCurrency(e.target.value == "")
        }
        if (e.target.name == "type") {
            if (typeof e.target.value == "object") {
                setIsType(true)
            }
            setIsType(e.target.value == "")
        }
        if (e.target.name == "amount") {
            setIsAmount(e.target.value == "")
        }
        if (e.target.name == "category") {
            setIsCategory(e.target.value == "")
        }
        if (e.target.name == "payee") {
            setIsPayee(e.target.value == "")
        }

        console.log(form)
        // console.log(data)

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
                    <VStack alignItems="start">
                        {Object.entries(formCopy).map(([key, value]) => (
                            typeof value === "object" ? (
                                console.log(form[key]),
                                <Select
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    key={key}
                                > <option value={""}>{key.at(0)?.toUpperCase() + key.slice(1)}</option>
                                    {value.map((val: string) => (
                                        <option key={val} value={val}>{val}</option>
                                    ))}
                                </Select>
                            ) : (
                                console.log(form[key]),
                                key.includes("date") ? (
                                    <Input
                                        placeholder="Select Date and Time"
                                        size="md"
                                        value={form[key]}
                                        key={key}
                                        name={key}
                                        onChange={handleChange}
                                        type="datetime-local"
                                    />
                                ) : (
                                    console.log("title: " + isTitle + "| payee: " + isPayee + "| amount: " + isAmount + "| cate: " + isCategory + "| cur: " + isCurrency + "| type" + isType),
                                    <InputMUI
                                        type={key === "amount" ? "number" : "text"}
                                        placeholder={key}
                                        key={key}
                                        value={form[key]}
                                        name={key}
                                        onChange={handleChange
                                        }
                                    />

                                )
                            )
                        ))}
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={useDisclosure.onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue'
                        isDisabled={isTitle || isAmount || isCategory || isCurrency || isPayee || isType}
                        onClick={handleSubmit}>Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    );
}

export default AddDrawer;