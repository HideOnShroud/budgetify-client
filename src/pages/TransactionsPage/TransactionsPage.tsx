import { Grid, GridItem, HStack, Spacer, VStack, Image, Box, Flex } from "@chakra-ui/react"
import Accounts from "../../components/Accounts"
import Transactions from "../../components/Transactions"
import LoginPage from "../../pages/LoginPage/LoginPage"
import RegisterPage from "../../pages/RegisterPage/RegisterPage"
import Sidebar from "../../components/Sidebar"
import Arrow from "../../assets/arrow.svg"
import ArrowDown from "../../assets/arrowDown.svg"
import SidebarItem from "../../components/SidebarItem"
import currencies from "../../data/currencies"
import { useAccount, useTransaction } from "../../store"
import { TransactionInterface } from "../../entities/TransactionInterface"
import { getCookie } from "typescript-cookie"
import addIcon from "../../assets/plus.svg"
import CircularIcon from "../../components/CircularIcon"
import Search from "../../components/Search"
import { useEffect, useState } from "react"

const TransactionsPage = () => {


    const addAccount = useAccount((state) => state.addAccount)
    const addTransaction = useTransaction((state) => state.addTransaction)

    const setTransactionType = useTransaction((state) => state.setTransactionType)


    const handleTrans = async (formData: Record<string, any>) => {
        const updatedData = {
            type: formData.type || "",
            title: formData.title || "",
            category: formData.category || "",
            amount: formData.amount || "" + formData.currency.at(-2),
            date: formData.date || "",
            payee: formData.payee || "",
            description: formData.description || "",
        }
        addTransaction(updatedData)
    }
    const handleSubmit = async (formData: Record<string, any>) => {
        const updatedData = {
            title: formData.title || "",
            balance: "0.00 " + formData.currency.at(-2),
            currency: formData.currency || "",
            description: formData.description || "",
        }
        addAccount(updatedData)
    }

    const data = {
        "title": "",
        "currency": currencies,
        "description": ""
    }
    const transaction = {
        "type": ["Income", "Expense"],
        "title": "",
        "category": "",
        "amount": "",
        "date": "",
        "payee": "",
        "description": ""
    }
    return (

        <Flex background={"#e9e9e9"}>
            <VStack overflowY="auto" flex={2}>
                <Box style={{ height: "100vh", overflowY: "auto", scrollbarWidth: 'none' }}>
                    <Accounts />
                </Box>
            </VStack>
            <VStack overflowY="auto" flex={3}>
                <Search />
                <Box w={"100%"} style={{ height: "100vh", overflowY: "auto", scrollbarWidth: 'none' }}>
                    <Transactions />
                </Box>
            </VStack>
            <VStack flex={1}>
                <Sidebar data={
                    [
                        <SidebarItem type="Income" icon={<CircularIcon icon={<Image borderRadius={"100%"} p={2} bg="#21C206" src={ArrowDown} />} />} label={"Income"} data={transaction} onSubmit={setTransactionType} />,
                        <SidebarItem type="Expense" icon={<CircularIcon icon={<Image borderRadius={"100%"} p={2} bg="#EE3F19" src={Arrow} />} />} label={"Expenses"} data={transaction} onSubmit={setTransactionType} />,
                        <SidebarItem type="add" icon={<CircularIcon icon={<Image p={2} src={addIcon} />} />} label={"Add Account"} data={data} onSubmit={handleSubmit} />,
                        <SidebarItem type="add" icon={<CircularIcon icon={<Image p={2} src={addIcon} />} />} label={"Add Transaction"} data={transaction} onSubmit={handleTrans} />,

                    ]} />
            </VStack>
        </Flex>
    );
}

export default TransactionsPage;