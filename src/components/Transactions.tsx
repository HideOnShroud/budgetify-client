import { useEffect } from "react";
import { useAccount, useTransaction } from "../store";
import { useState } from "react"
import { getCookie, setCookie } from "typescript-cookie"
import Transaction from "./Transaction";

const Transactions = () => {
    const accountId = useAccount((state) => state.accountId);
    const transactions = useTransaction((state) => state.transactions)
    const transaction = useTransaction((state) => state.transaction)
    const getTransactions = useTransaction((state) => state.getTransactions)

    useEffect(() => {
        getTransactions()

    }, [getTransactions, accountId, transaction])


    return (
        <>
            {transactions.map((item) => <Transaction transactionInfo={item} />)}
        </>
    );
}

export default Transactions;