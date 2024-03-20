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
    Spacer
} from "@chakra-ui/react"
import { AccountInterface } from "../entities/AccountInterface"
import editButton from "../assets/editButton.svg"
import deleteButton from "../assets/deleteButton.svg"
import { useState } from "react"
import { useAccount } from "../store"
import { getCookie } from "typescript-cookie"

interface props {
    useDisclosure: { isOpen: boolean, onOpen: () => void, onClose: () => void }
    btnRef: React.RefObject<HTMLButtonElement>
    label: String
    data: AccountInterface
    pop: {}
}

const EditDrawer = ({ useDisclosure, btnRef, label, data, pop }: props) => {

    const list: [string, string][] = Object.entries(data)
    const popList: string[] = Object.values(pop)
    const editThing = useAccount((state) => state.editAccount)

    const [form, setForm] = useState({
        title: data.title,
        currency: data.currency,
        description: data.description
    })


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const user = { ...form }
        const accountId = getCookie("accountId")!!

        await editThing(accountId, user)

    }

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,

        })

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
                        {list.map(
                            (item) => ((!popList.includes(item[0])) ?
                                <><Input key={item[0]} value={form.description.toString()} name={item[0]} onChange={handleChange} /></> : ""))}
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={useDisclosure.onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue'
                        onClick={handleSubmit}>Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    );
}

export default EditDrawer;