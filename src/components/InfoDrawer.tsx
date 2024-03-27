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
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader
} from "@chakra-ui/react"
import { AccountInterface } from "../entities/AccountInterface"
import editButton from "../assets/editButton.svg"
import deleteButton from "../assets/deleteButton.svg"
import EditDrawer from "./EditDrawer"
import { useAccount } from "../store"
import { getCookie } from "typescript-cookie"
import React from "react"


interface props {
    useDisclosureP: { isOpen: boolean, onOpen: () => void, onClose: () => void }
    btnRef: React.RefObject<HTMLButtonElement>
    label: String
    items: {} | null
    data: Record<string, any>
    onSubmit: (formData: Record<string, any>) => Promise<void>
    onDelete: () => void

}

const InfoDrawer = ({ useDisclosureP, btnRef, label, items, data, onSubmit, onDelete }: props) => {

    const list: [string, string][] = Object.entries(data)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const alert = useDisclosure()



    return (
        <>
            <Drawer
                size={'md'}
                isOpen={useDisclosureP.isOpen}
                placement='right'
                onClose={useDisclosureP.onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>


                    <DrawerHeader><HStack><Heading size={'lg'} fontWeight={"500"}>{label}</Heading><Spacer />
                        <HStack>
                            <button onClick={() => {
                                onOpen()

                            }}><Image src={editButton} /></button><button
                                onClick={alert.onOpen}><Image src={deleteButton} mr={5} /></button>
                            <DrawerCloseButton size={"xl"} mt={4} />
                        </HStack>
                    </HStack>
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack
                            alignItems={'start'}>
                            {list.map(
                                (item) => ((item[0] != '_id' && item[0] != 'userId' && item[0] != '__v' && item[0] != 'accountId') ?
                                    <><Grid templateColumns={'repeat(5,1fr)'}
                                        w={"100%"}
                                        textAlign={'start'}>
                                        <GridItem gridColumnStart={1}
                                            colSpan={2}>

                                            <Heading size={'md'}>{item[0].charAt(0).toUpperCase() + item[0].slice(1) + ':'}</Heading>
                                        </GridItem>
                                        <GridItem gridColumnStart={3}
                                            colSpan={3}
                                        >

                                            <Heading
                                                fontWeight={'md'}
                                                size={'md'}>{item[1]}</Heading>
                                        </GridItem>
                                    </Grid>
                                        <Divider
                                            colorScheme={"black"} />
                                    </> : ""))}
                        </VStack>
                    </DrawerBody>


                </DrawerContent>
                < EditDrawer
                    useDisclosure={{ isOpen, onOpen, onClose }
                    }
                    btnRef={btnRef}
                    label={"Edit Account"}
                    data={data}
                    pop={['_id', 'balance', "userId", "__v", "accountId"]}
                    onSubmit={onSubmit} />
            </Drawer >


            <AlertDialog
                isOpen={alert.isOpen}
                onClose={alert.onClose}
                leastDestructiveRef={btnRef}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete {label}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete {label}?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={() => {
                                onDelete()
                                alert.onClose()
                            }} ml={3}>
                                Yes
                            </Button>
                            <Button bg={"#B9E2E6"} ref={btnRef} onClick={alert.onClose}>
                                No
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

export default InfoDrawer;