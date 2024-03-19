import { create } from 'zustand'
import { UserInterface } from './entities/UserInterface'


interface UserStore {
    user: UserInterface

    addUser: (user: UserInterface) => Promise<void>
    getUser: (user: UserInterface) => Promise<void>
    userError: string
}

const useUser = create<UserStore>((set) => ({
    user: {
        email: JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').email,
        password: JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token
    },

    userError: "",

    addUser: async (user: { email: string, password: string }) => {
        try {
            const response = await fetch('http://localhost:6969/api/user/signup', {
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
            set({ userError: "" })
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

export default useUser