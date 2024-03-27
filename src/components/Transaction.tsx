import { Box, Card, CardBody, CardFooter, CardHeader, Center, HStack, Heading, Image, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { TransactionInterface } from "../entities/TransactionInterface";
import Arrow from "../assets/arrow.svg"
import { useRef } from "react"
import ArrowDown from "../assets/arrowDown.svg"
import { useTransaction } from "../store";
import { getCookie, setCookie } from 'typescript-cookie'
import InfoDrawer from "./InfoDrawer";


interface props {
    transactionInfo: TransactionInterface
}

const Transaction = ({ transactionInfo }: props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const infoRef = useRef<HTMLButtonElement>(null)

    const updateAccount = useTransaction((state) => state.editTransaction)

    const date = new Date(transactionInfo.date)
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(-2)}`
    const handleSubmit = async (formData: Record<string, any>) => {
        const updatedData = {

            type: formData.type || "",
            title: formData.title || "",
            category: formData.category || "",
            amount: formData.amount || "",
            date: formData.date || "",
            payee: formData.payee || "",
            currency: formData.currency || "",
            description: formData.description || "",
        };
        updateAccount(transactionInfo._id, updatedData)
    }
    const deleteAccount = useTransaction((state) => state.deleteTransaction)

    return (
        <>

            <Card
                mb={8}
                width={"100%"}
                bgColor={"#F9F9F9"}
                direction={"row"}
                onClick={onOpen}>
                <CardHeader
                    w={"25%"}
                    mt={4}
                    mb={4}
                    ml={4}
                    mr={0}
                    borderRadius={"xl"}
                    backgroundColor={"#E9E9E9"}>
                    <Center h={"100%"}>

                        <Heading
                            fontSize={"2xl"}>{transactionInfo.category}</Heading>
                    </Center>

                </CardHeader>
                <CardBody>
                    <VStack gap={2}
                        align={"start"}>
                        <Heading
                            fontSize={"2xl"}
                            fontWeight={'400'}>{transactionInfo.title}</Heading>
                        <HStack>

                            {transactionInfo.type === "Expense" ? <HStack> <Box
                                bgColor={"#EE3F19"}
                                borderRadius={'full'}
                                padding={'0.8rem'}><Image src={Arrow}></Image></Box>
                                <Text fontSize={'large'}>Expenses + </Text> </HStack> : <HStack><Box bgColor={"#21C206"} borderRadius={'full'}
                                    padding={'0.8rem'}> <Image src={ArrowDown}></Image></Box><Text fontSize={'large'}>Income +</Text></HStack>}

                            <Text fontSize={'large'}>{formattedDate} + </Text>
                            <Text fontSize={'large'}>{transactionInfo.payee}</Text>
                        </HStack>
                    </VStack>
                </CardBody>
                <CardFooter>
                    <Box
                    >
                        {transactionInfo.type === "Expense" ?
                            <Text textColor={"#EE3F19"} fontSize={'3xl'}>-{String(transactionInfo.amount)}{String(transactionInfo.currency.at(-2))}</Text> :
                            <Text textColor={"#21C206"} fontSize={'3xl'}>{String(transactionInfo.amount)}{String(transactionInfo.currency.at(-2))}</Text>}
                    </Box>
                </CardFooter>
            </Card>
            <InfoDrawer useDisclosureP={{ isOpen, onOpen, onClose }} btnRef={infoRef} label={
                "Account Information"} items={null} data={transactionInfo} onSubmit={handleSubmit} onDelete={() => deleteAccount(transactionInfo._id)} />


        </>

    );
}

export default Transaction;