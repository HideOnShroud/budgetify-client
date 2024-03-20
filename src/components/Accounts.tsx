import { useEffect } from "react";
import Account from "../components/Account";
import { useAccount } from "../store";
import { useState } from "react"
import { getCookie, setCookie } from "typescript-cookie"

const Accounts = () => {
    const accountId = useAccount((state) => state.accountId);
    const accounts = useAccount((state) => state.accounts)
    const account = useAccount((state) => state.account)
    const getAccounts = useAccount((state) => state.getAccounts)

    useEffect(() => {
        getAccounts()

    }, [getAccounts, accountId, account])


    return (
        <>
            {accounts.map((item) => <Account key={item._id} accountInfo={item} />)}
        </>
    );
}

export default Accounts;