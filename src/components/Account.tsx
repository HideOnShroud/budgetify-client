import {
    Grid, GridItem, Heading, Circle, Button, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import { AccountInterface } from "../entities/AccountInterface";
import { getCookie, setCookie } from 'typescript-cookie'
import { useAccount } from "../store";
import { useState, useRef } from "react";
import InfoDrawer from "./InfoDrawer";
import EditDrawer from "./EditDrawer";


interface props {
    accountInfo: AccountInterface

}

const Account = ({ accountInfo }: props) => {
    const setAccountId = useAccount((state) => state.setAccountId)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [hover, setHover] = useState(Boolean)
    const infoRef = useRef<HTMLButtonElement>(null)


    const updateAccount = useAccount((state) => state.editAccount)

    const handleSubmit = async (formData: Record<string, any>) => {
        const updatedData = {
            title: formData.title || "",
            currency: formData.currency || "",
            description: formData.description || "",
        };
        updateAccount(getCookie("accountId")!!, updatedData)
    }
    const deleteAccount = useAccount((state) => state.deleteAccount)



    return (
        <>
            <Grid
                templateRows='repeat(2,0fr)'
                templateColumns='repeat(5,1fr)'
                overflow='hidden'
                mb='12'
                p='4'
                borderRadius='2xl'
                bgGradient='linear(to-br, #FA777F,#E16CD0, #72AFED)'
                textColor="#F8F8F8"
                maxW='md'
                boxShadow="5px 10px 20px 0px #00000040"
                opacity={accountInfo._id !== getCookie("accountId") ? "40%" : undefined}
                onClick={() => {
                    setCookie("accountId", accountInfo._id)
                    setAccountId(accountInfo._id)

                }}
                onPointerEnter={() => {
                    setHover(true)
                }}
                onPointerLeave={() => { setHover(false) }}
            >
                <GridItem rowSpan={1} colSpan={3}>
                    <Heading
                        pb={5}
                        size="xl"
                        fontWeight="sm"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                    >
                        {accountInfo.title}
                    </Heading>
                </GridItem>
                <GridItem rowSpan={1} colSpan={4}>
                    <Heading
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        fontWeight="sm"
                        pb={6}
                        size="3xl"
                    >
                        {accountInfo.balance.slice(0, -1)}
                    </Heading>
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} rowStart={1} colStart={5}>
                    <Circle bg="white" padding="12px 25px 12px 25px">
                        <Heading
                            bgGradient="linear(to-br, #FA777F,#E16CD0, #72AFED)"
                            bgClip="text"
                            fontWeight={400}
                            size="3xl"
                        >
                            {accountInfo.currency.at(-2)}
                        </Heading>
                    </Circle>
                </GridItem>
                {hover ? <GridItem rowSpan={1} colSpan={1} rowStart={2} colStart={5}>
                    <Grid
                        textAlign={'center'} mt={8} gap={'px'}>
                        <GridItem><Button ref={infoRef} onClick={onOpen}>Info</Button></GridItem>
                    </Grid>
                </GridItem > : []}
            </Grid >
            <InfoDrawer useDisclosureP={{ isOpen, onOpen, onClose }} btnRef={infoRef} label={
                "Account Information"} items={null} data={accountInfo} onSubmit={handleSubmit} onDelete={() => deleteAccount(getCookie("accountId")!!)} />


        </>
    )
}

export default Account;