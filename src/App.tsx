import { Grid, GridItem, HStack, Spacer, VStack, Image, Box } from "@chakra-ui/react"
import Accounts from "./components/Accounts"
import Transactions from "./components/Transactions"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import Sidebar from "./components/Sidebar"
import Arrow from "../src/assets/arrow.svg"
import ArrowDown from "../src/assets/arrowDown.svg"
import SidebarItem from "./components/SidebarItem"
import currencies from "./data/currencies"
import { useAccount, useTransaction } from "./store"
import { TransactionInterface } from "./entities/TransactionInterface"
import { getCookie } from "typescript-cookie"


function App() {
  const addAccount = useAccount((state) => state.addAccount)
  const addTransaction = useTransaction((state) => state.addTransaction)
  const handleTrans = async (formData: Record<string, any>) => {
    const updatedData = {
      type: formData.type || "",
      title: formData.title || "",
      category: formData.category || "",
      amount: formData.amount || "" + formData.currency.at(-2),
      date: formData.date || "",
      payee: formData.payee || "",
      currency: getCookie('cur')!!,
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
    <>

      {/* <LoginPage /> */}
      <Grid gridTemplateColumns={'repeat(4,1fr)'}>
        <GridItem colSpan={1}>

          <VStack>
            <Accounts />
          </VStack>
        </GridItem>


        <GridItem colSpan={2}>
          <VStack>
            <Transactions />
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <VStack>
            <Sidebar data={[<SidebarItem label={"Add Account"} data={data} onSubmit={handleSubmit} />, <SidebarItem label={"Add Transaction"} data={transaction} onSubmit={handleTrans} />]} />
          </VStack>
        </GridItem>
      </Grid>
    </>
  )
}

export default App
