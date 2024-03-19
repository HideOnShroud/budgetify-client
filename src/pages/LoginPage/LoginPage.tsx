import { Center, VStack, Heading, Input, InputGroup, InputRightElement, Button, Image, Text, Box } from '@chakra-ui/react'
import { useState } from "react";
import LoginBackground from "../../assets/loginBackground.jpg"
import PasswordShow from "../../assets/passwordEye.png"
import "@fontsource/alata"
import useUser from '../../store';


const LoginPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [invalidEmail, setInvalidEmail] = useState(true)
    const [emailClicked, setEmailClicked] = useState(false)
    const [passwordClicked, setPasswordClicked] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(true)
    const [error, setError] = useState("")

    const getUser = useUser((state) => state.getUser)
    const getError = useUser((state) => state.userError)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const user = { ...form }


        await getUser(user)
        setError(getError)


    }

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,

        })
        if (e.target.name === "email") {
            setInvalidEmail(!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(e.target.value))

        }
        if (e.target.name === "password") {
            setInvalidPassword(e.target.value === "" ? true : false)
        }
    }

    // passwordShow
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Box
            height={"100vh"}
            width={"full"}
            backgroundImage={LoginBackground}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundPosition={"center"}

        >
            <Center
                height={"full"}
            >
                <VStack
                    padding={"48px"}
                    borderRadius={"md"}
                    gap={"4vh"}
                    background={'rgba(255, 255, 255, 0.8)'}
                >
                    <Heading
                        size={"xl"}
                        as={"h1"}
                        style={{ fontFamily: 'Alata', fontWeight: '400' }}
                        textColor={"black"}
                    >
                        Budgetify
                    </Heading>
                    <Input
                        height={"5vh"}
                        placeholder="Email"
                        borderColor={emailClicked && invalidEmail ? "Red" : "Black"}
                        focusBorderColor={invalidEmail ? "Red" : ""}
                        name="email"
                        onClick={() => setEmailClicked(true)}
                        onChange={handleChange}
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        textColor={"Black"}
                    ></Input>

                    <InputGroup>
                        <Input background={"white"}
                            height={"5vh"}
                            textColor={"Black"}
                            name="password"
                            focusBorderColor={invalidPassword ? "Red" : ""}
                            onChange={handleChange}
                            borderColor={passwordClicked && invalidPassword ? "Red" : "Black"}

                            onClick={() => setPasswordClicked(true)}
                            type={show ? 'text' : 'password'}
                            _placeholder={{ opacity: 1, color: 'gray.500' }}

                            placeholder='Enter password'
                        />
                        <InputRightElement h="5vh" width='4.5rem'>

                            <Button h={'1.75rem'} size={'xs'}
                                onClick={handleClick}>
                                <Image
                                    src={PasswordShow}
                                    height={'inherit'}></Image>
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {error != "" ? <Text color={"Red"}>{error}</Text> : []}
                    {!invalidPassword && !invalidEmail ?
                        <Button
                            background={"#B9E2E6"}
                            width={"xs"}
                            height={"5vh"}
                            onClick={handleSubmit}
                        ><Text
                            textColor={'black'}
                            fontWeight={400}>Login</Text></Button> : <Button
                                background={"grey"}
                                width={"xs"}
                                height={"5vh"}
                                isActive={true}
                            ><Text
                                textColor={'black'}
                                fontWeight={400}>Login</Text></Button>}
                </VStack>
            </Center>

        </Box >
    );
}

export default LoginPage;