import React, { useState } from "react";
import { Input, Box, Button, Text, Divider, Flex, InputGroup, InputRightElement } from "@chakra-ui/react";
import ForgotPasswordLink from "./ForgotPasswordLink";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import { inputStyle, RadioButtonStyle } from "../styles";

interface Props {
    onLogin: (user: User) => void;
}

const RegisterPage: React.FC<Props> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    let url = 'https://localhost:7191/Role/';

    const loginUser = async ({ email, password }: { email: string; password: string }) => {
        try {
            const response = await axios.post(url + 'LoginAndRetrieveUserRoles', { email, password });
            const role = response.data;

            const user: User = {
                email,
                role
            };

            return user;
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const loginMutation = useMutation(loginUser, {
        onSuccess: (data) => {
            console.log('User logged in successfully with roles:', data.role);
            onLogin(data);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });

    return (
        <Box borderRadius="xl" px="37%" h="100%" pt="3%" pb="5%">
            <Box bg="gray.400" px="7%" py="5%" h="100%" boxShadow="lg" borderRadius="xl">
                <Text fontSize="250%" fontWeight="Bold" mb="7%" h="15%">Bejelentkezés</Text>
                <Box px="1%">
                    <Input
                        placeholder="E-mail"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        mb="9%"
                        {...inputStyle}
                    />
                    <InputGroup
                        mb="4%">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Jelszó"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            {...inputStyle}
                        />
                        <InputRightElement alignContent="center" verticalAlign="center" height="100%" mr="1.5%">
                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                                variant="ghost"
                                size="md"
                                fontSize="x-large">
                                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
                <ForgotPasswordLink />
                <Button
                    onClick={() => loginMutation.mutate({ email: username, password: password })}
                    {...RadioButtonStyle} mb="3%"
                    _hover={{
                        bg: "gray.600"
                    }}>Bejelentkezés</Button>
                <Flex flexDir="row" alignItems="center" justifyContent="center">
                    <Divider my="2%" borderColor="gray.800" borderWidth="1px" />
                    <Text mx="5%" textAlign="center" fontSize="130%">vagy</Text>
                    <Divider my="2%" borderColor="gray.800" borderWidth="1px" />
                </Flex>
                <Text fontSize="xl" fontWeight="Bold" mb="5%">Még nincs fiókja?</Text>
                <Button onClick={() => navigate("/register")} {...RadioButtonStyle} bg="gray.200" color="black" mb="5%"
                    _hover={{
                        bg: "gray.300"
                    }}>Regisztráció</Button>
            </Box>
        </Box>
    );
};

export default RegisterPage;
