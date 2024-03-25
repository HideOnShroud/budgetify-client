import { useEffect } from "react";
import { useAccount, useSearch, useTransaction } from "../store";
import { useState } from "react"
import { getCookie, setCookie } from "typescript-cookie"
import Transaction from "./Transaction";


const Transactions = () => {
    const accountId = useAccount((state) => state.accountId);
    const search = useSearch((state) => state.search)
    const transactions = useTransaction((state) => state.transactions)
    const transaction = useTransaction((state) => state.transaction)
    const getTransactions = useTransaction((state) => state.getTransactions)
    const getTransactionType = useTransaction((state) => state.transactionType)


    useEffect(() => {
        getTransactions()

    }, [getTransactions, accountId, transaction])


    return (
        <>
            {/* {transactions.map((item) => type === "Income" ? <Transaction transactionInfo={item}  />)} */}
            {getTransactionType === "Income" ? transactions.filter(item => item.type === "Income").map((item) => <Transaction transactionInfo={item} />)
                : getTransactionType === "Expense" ? transactions.filter(item => item.type === "Expense").map((item) => <Transaction transactionInfo={item} />)
                    : transactions.filter((item) => { return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search) }).map((item) => <Transaction transactionInfo={item} />)}
        </>
    );
}

export default Transactions;