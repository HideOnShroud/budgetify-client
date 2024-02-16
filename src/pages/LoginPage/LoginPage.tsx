import { Center, VStack, Heading, Input, InputGroup, InputRightElement, Button, Image, Text, Box } from '@chakra-ui/react'
import { useState } from "react";
import LoginBackground from "../../assets/loginBackground.jpg"
import PasswordShow from "../../assets/passwordEye.png"
import "@fontsource/alata"


const LoginPage = () => {
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
                        borderColor={"Black"}
                        _placeholder={{ opacity: 1, color: 'gray.500' }}
                        textColor={"Black"}
                    ></Input>

                    <InputGroup>
                        <Input background={"white"}
                            height={"5vh"}
                            borderColor={"Black"}
                            textColor={"Black"}
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
                    <Button
                        background={"#B9E2E6"}
                        width={"xs"}
                        height={"5vh"}
                    ><Text
                        textColor={'black'}
                        fontWeight={400}>Login</Text></Button>
                </VStack>
            </Center>
        </Box >
    );
}

export default LoginPage;