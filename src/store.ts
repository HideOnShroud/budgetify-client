import { create } from 'zustand'
import { UserInterface } from './entities/UserInterface'
import { AccountInterface } from './entities/AccountInterface'


interface UserStore {
    user: UserInterface

    addUser: (user: UserInterface) => Promise<void>
    getUser: (user: UserInterface) => Promise<void>
    userError: string
}


interface AccountStore {
    accounts: AccountInterface[]

    // addAccount: (account: AccountInterface) => Promise<void>
    getAccounts: () => Promise<void>
    accountId: string
    setAccountId: (accountId: string) => void
    getAccount: (accountId: string) => Promise<void>
    account: AccountInterface
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
                throw new Error('Failed to get account');
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
    }
}))

export { useAccount, useUser }