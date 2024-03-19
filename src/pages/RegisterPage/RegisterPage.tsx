import { Center, VStack, Heading, Input, InputGroup, InputRightElement, Button, Image, Text, Box } from '@chakra-ui/react'
import { useState } from "react";
import LoginBackground from "../../assets/loginBackground.jpg"
import PasswordShow from "../../assets/passwordEye.png"
import "@fontsource/alata"
import { useUser } from '../../store';


const RegisterPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [isEmailValid, setIsEmailValid] = useState(false)
    const [emailClicked, setEmailClicked] = useState(false)
    const [passwordClicked, setPasswordClicked] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)

    const getUser = useUser((state) => state.addUser)
    const getError = useUser((state) => state.userError)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const user = { ...form }


        await getUser(user)

    }



    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,

        })

        if (e.target.name === "email") {
            setIsEmailValid(!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(e.target.value))

        }
        if (e.target.name === "password") {
            setIsPasswordValid(e.target.value !== "")
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
                        borderColor={emailClicked && isEmailValid ? "Red" : "Black"}
                        focusBorderColor={isEmailValid ? "Red" : ""}
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
                            focusBorderColor={!isPasswordValid ? "Red" : ""}
                            onChange={handleChange}
                            borderColor={passwordClicked && !isPasswordValid ? "Red" : "Black"}

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

                    {getError !== "" ? <Text color={"Red"}>{getError}</Text> : []}


                    <Button
                        background={"#B9E2E6"}
                        width={"xs"}
                        height={"5vh"}
                        onClick={handleSubmit}
                        isDisabled={!isPasswordValid || isEmailValid}
                    >

                        <Text
                            textColor={'black'}
                            fontWeight={400}>Register</Text>
                    </Button>


                </VStack>
            </Center>

        </Box >
    );
}

export default RegisterPage;