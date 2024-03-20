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


interface props {
    useDisclosure: { isOpen: boolean, onOpen: () => void, onClose: () => void }
    btnRef: React.RefObject<HTMLButtonElement>
    label: String
    items: {} | null
    data: AccountInterface

}

const InfoDrawer = ({ useDisclosure, btnRef, label, items, data }: props) => {

    const list: [string, string][] = Object.entries(data)



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
                        <Image src={editButton} /><Image src={deleteButton} mr={5} />
                        <DrawerCloseButton size={"xl"} mt={4} />
                    </HStack>
                </HStack>
                </DrawerHeader>

                <DrawerBody>
                    <VStack
                        alignItems={'start'}>
                        {list.map(
                            (item) => ((item[0] != '_id' && item[0] != 'userId' && item[0] != '__v') ?
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

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={useDisclosure.onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue'>Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    );
}

export default InfoDrawer;