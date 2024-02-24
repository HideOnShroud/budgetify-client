import { create } from 'zustand'
import { UserInterface } from './entities/UserInterface'


interface UserStore {
    user: UserInterface,
    addUser: (user: { email: string, password: string }) => Promise<void>
    getUser: (user: { email: string, password: string }) => Promise<void>
}

const useUser = create<UserStore>((set) => ({
    user: {
        email: JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').email,
        token: JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token
    },
    addUser: async (user: { email: string, password: string }) => {
        try {
            const response = await fetch('http://localhost:6969/api/user/signup', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token}`

                }
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            const data: UserInterface = await response.json();
            set({ user: data })
            localStorage.setItem("user", JSON.stringify(data))

            console.log("done")
        } catch (error) {
            console.error(error);
        }
    },
    getUser: async (user: { email: string, password: string }) => {
        try {
            const response = await fetch('http://localhost:6969/api/user/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{"email":"", "token":""}').token}`

                }
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }
            const data: UserInterface = await response.json();
            set({ user: data })
            localStorage.setItem("user", JSON.stringify(data))
            console.log("done")
        } catch (error) {
            console.error(error);
        }
    },

}))

export default useUser