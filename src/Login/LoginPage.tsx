import React, { useState } from "react";
import { Input, Box, Button, Text, Divider, Flex, InputGroup, InputRightElement } from "@chakra-ui/react";
import ForgotPasswordLink from "./ForgotPasswordLink";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface Props {
    onLogin: (email: string, role: number) => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = () => {
        console.log("Submitted");
    };

    const bgcolor = 'gray.100';
    const outlineColor = 'gray.800';
    const focusColor = "#234150";
    const textColor = 'gray.600';

    const inputStyle = {
        background: bgcolor,
        color: textColor,
        _placeholder: { color: textColor },
        variant: 'outline',
        focusBorderColor: focusColor,
        outlineColor: outlineColor,
        borderRadius: "sm",
        fontSize: "x-large",
        py: "7%"
    };

    const RadioButtonStyle = {
        variant: "solid",
        borderWidth: '1px',
        borderColor: "black",
        borderRadius: 'full',
        boxShadow: 'md',
        size: { base: "sm", md: "lg" },
        w: "100%",
        bg: "#234150",
        color: "gray.200",
        p: "8%",
        fontSize: "3xl"
    };

    return (
        <Box borderRadius="xl" px="37%" h="100%" pt="3%" pb="5%">
            <Box bg="gray.400" px="7%" py="5%" h="100%" boxShadow="lg" borderRadius="xl">
                <Text fontSize="250%" fontWeight="Bold" mb="7%" h="15%">Bejelentkezés</Text>
                <Box px="1%">
                    <Input
                        placeholder="E-mail"
                        value={username}
                        onChange={handleUsernameChange}
                        mb="9%"
                        {...inputStyle}
                    />
                    <InputGroup
                        mb="4%">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Jelszó"
                            value={password}
                            onChange={handlePasswordChange}
                            {...inputStyle}
                        />
                        <InputRightElement alignContent="center" verticalAlign="center" height="100%" mr="1.5%">
                            <Button
                                onClick={handleTogglePasswordVisibility}
                                variant="ghost"
                                size="md"
                                fontSize="x-large">
                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
                <ForgotPasswordLink />
                <Button onClick={handleSubmit} {...RadioButtonStyle} mb="3%">Bejelentkezés</Button>
                <Flex flexDir="row" alignItems="center" justifyContent="center">
                    <Divider my="2%" borderColor="gray.800" borderWidth="1px" />
                    <Text mx="5%" textAlign="center" fontSize="130%">vagy</Text>
                    <Divider my="2%" borderColor="gray.800" borderWidth="1px" />
                </Flex>
                <Text fontSize="xl" fontWeight="Bold" mb="5%">Még nincs fiókja?</Text>
                <Button onClick={handleSubmit} {...RadioButtonStyle} bg="gray.200" color="black" mb="5%">Regisztráció</Button>
            </Box>
        </Box>
    );
};

export default LoginPage;
