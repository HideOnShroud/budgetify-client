import { create } from 'zustand'
import { UserInterface } from './entities/UserInterface'
import { AccountInterface } from './entities/AccountInterface'
import { TransactionInterface } from './entities/TransactionInterface'


interface UserStore {
    user: UserInterface

    addUser: (user: UserInterface) => Promise<void>
    getUser: (user: UserInterface) => Promise<void>
    userError: string
}


interface AccountStore {
    accounts: AccountInterface[]

    addAccount: (formData: {
        title: String,
        currency: String,
        description: String
    }) => Promise<void>
    getAccounts: () => Promise<void>
    accountId: string
    setAccountId: (accountId: string) => void
    getAccount: (accountId: string) => Promise<void>
    account: AccountInterface
    editAccount: (accountId: string, account: { title: String, currency: String, description: String }) => Promise<void>
    deleteAccount: (accountId: string) => void
}

interface TransactionStore {
    transactions: TransactionInterface[]
    addTransaction: (formData: {
        type: string,
        title: string,
        category: string,
        amount: string,
        date: string,
        payee: string,
        description: string,
    }) => Promise<void>
    getTransactions: () => Promise<void>
    transactionId: string
    setTransactionId: (transactionId: string) => void
    setTransactionType: (transactionType: String) => void
    getTransaction: (accountId: string) => Promise<void>
    transaction: TransactionInterface
    editTransaction: (transactionId: string, transaction: {
        type: string,
        title: string,
        category: string,
        amount: string,
        date: string,
        payee: string,
        currency: string,
        description: string,
    }) => Promise<void>
    deleteTransaction: (accountId: string) => void
    transactionType: String
}


interface SearchStore {
    search: string,
    setSearch: (search: string) => void
}

const useUser = create<UserStore>((set) => ({
    user: {
        email: JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').email,
        password: JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token
    },

    userError: "",

    addUser: async (user: { email: string, password: string }) => {
        try {
            const response = await fetch('http://localhost:6969/api/user/register', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token}`

                }
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            const data: UserInterface = await response.json()
            set({ user: data })
            localStorage.setItem("user", JSON.stringify(data))

            console.log("done")
            set({ userError: "" })
        } catch (error) {
            console.error(error)
            set({ userError: "Email Already Used" })
        }
    },
    getUser: async (user: { email: string, password: string }) => {
        try {
            const response = await fetch('http://localhost:6969/api/user/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token}`

                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            const data: UserInterface = await response.json();
            set({ user: data })
            localStorage.setItem("user", JSON.stringify(data))
            console.log("got user")
            set({ userError: "" })
        } catch (error) {
            console.error(error);
            set({ userError: "User Not Found Check Your Credentials" })

        }
    },

}))



const useAccount = create<AccountStore>((set) => ({
    accounts: [],
    accountId: "",
    account: <AccountInterface>{},
    addAccount: async (formData: {
        title: String,
        currency: String,
        description: String
    }) => {
        try {
            const response = await fetch('http://localhost:6969/api/', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',

                },
                credentials: 'include'

            });
            if (!response.ok) {
                throw new Error('Failed to add Account');
            }
            const data: AccountInterface = await response.json()
            set({ account: data })
            localStorage.setItem("user", JSON.stringify(data))

            console.log("done")
        } catch (error) {
            console.error(error)
        }
    },


    getAccounts: async () => {
        try {
            const response = await fetch('http://localhost:6969/api/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token}`

                },
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Failed to get accounts');
            }
            const data: AccountInterface[] = await response.json()
            set({ accounts: data })
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    },
    setAccountId: (accountId: string) => {
        set({ accountId: accountId })
    },
    getAccount: async (accountId: string) => {
        try {
            const response = await fetch('http://localhost:6969/api/' + accountId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token}`

                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to get Account');
            }
            const data: AccountInterface = await response.json();

            set({ account: data })
        } catch (error) {
            console.error(error);

        }
    },
    editAccount: async (accountId: string, account: { title: String, currency: String, description: String }) => {
        try {
            const response = await fetch('http://localhost:6969/api/' + accountId, {
                method: 'PATCH',
                body: JSON.stringify(account),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token}`

                },
                credentials: 'include'

            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            const data: AccountInterface = await response.json()
            set({ account: data })


            console.log("done")

        } catch (error) {
            console.error(error)

        }
    },
    deleteAccount: async (accountId: string) => {
        try {
            const response = await fetch('http://localhost:6969/api/' + accountId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',

                },
                credentials: 'include'


            })

            if (response.ok) {
                await useAccount.getState().getAccounts()
            }
        } catch {
            console.log("error")
        }
    }

}))


const useTransaction = create<TransactionStore>((set) => ({
    transactions: [],
    transactionId: "",
    transactionType: "",
    transaction: <TransactionInterface>{},
    addTransaction: async (formData: {
        type: string,
        title: string,
        category: string,
        amount: string,
        date: string,
        payee: string,
        description: string,
    }) => {
        try {
            const response = await fetch('http://localhost:6969/api/transactions', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',

                },
                credentials: 'include'

            });
            if (!response.ok) {
                throw new Error('Failed to add transaction');
            }
            const data: TransactionInterface = await response.json()
            set({ transaction: data })
            localStorage.setItem("user", JSON.stringify(data))

            console.log("done")
        } catch (error) {
            console.error(error)
        }
    },
    getTransactions: async () => {
        try {
            const response = await fetch('http://localhost:6969/api/transactions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Failed to get transactions');
            }
            const data: TransactionInterface[] = await response.json()
            set({ transactions: data })
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    },
    setTransactionId: (transactionId: string) => {
        set({ transactionId: transactionId })
    },
    setTransactionType: (transactionType: String) => {
        set({ transactionType: transactionType })
        console.log(transactionType)
    },
    getTransaction: async (transactionId: string) => {
        try {
            const response = await fetch('http://localhost:6969/api/transactions/' + transactionId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token}`

                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to get Transaction');
            }
            const data: TransactionInterface = await response.json();

            set({ transaction: data })
        } catch (error) {
            console.error(error);

        }
    },

    editTransaction: async (transactionId: string, transaction: {
        type: string,
        title: string,
        category: string,
        amount: string,
        date: string,
        payee: string,
        currency: string,
        description: string,
    }) => {
        try {
            const response = await fetch('http://localhost:6969/api/transactions/' + transactionId, {
                method: 'PATCH',
                body: JSON.stringify(transaction),
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token}`

                },
                credentials: 'include'

            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            const data: TransactionInterface = await response.json()
            set({ transaction: data })


            console.log("done")

        } catch (error) {
            console.error(error)

        }
    },

    deleteTransaction: async (transactionId: string) => {
        try {
            const response = await fetch('http://localhost:6969/api/transactions/' + transactionId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',

                },
                credentials: 'include'


            })

            if (response.ok) {
                await useTransaction.getState().getTransactions()
            }
        } catch {
            console.log("error")
        }
    }





}))

const useSearch = create<SearchStore>((set) => ({
    search: "",
    setSearch: (search: string) => {
        set({ search: search })
        console.log(search)
    }
}))

export { useAccount, useUser, useTransaction, useSearch }