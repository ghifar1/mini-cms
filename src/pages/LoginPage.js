import { Button, Card, Container, PasswordInput, Stack, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "tabler-icons-react";
import Cookies from 'universal-cookie';
import cryptojs from "crypto-js"

const LoginPage = () => {
    const [pass, setPass] = useState("")
    const navigate = useNavigate();
    const cookie = new Cookies()
    const loginPass = process.env.REACT_APP_LOGIN_PASS

    const onLogin = () => {
        if (pass !== loginPass) {
            return showNotification({
                title: 'Password salah',
                color: 'red',
                autoClose: 5000,
                icon: <X />,
            })
        } else {
            showNotification({
                title: 'Berhasil Login',
                color: 'green',
                autoClose: 5000,
                icon: <Check />,
            })
            cookie.set("biskuit", cryptojs.AES.encrypt("kepoo yaaaa", "biskuit123").toString(), {path: '/'})
            return navigate("/a/faq")
        }
    }

    return (
        <Container>
            <Stack justify={"center"} sx={{ height: '100vh' }}>
                <Card sx={{ backgroundColor: '#93CAED' }}>
                    <Title order={2} align="center">Login</Title>
                    <Stack sx={{ margin: 2 }}>
                        <PasswordInput
                            label="Password"
                            value={pass}
                            onChange={(val) => setPass(val.currentTarget.value)}
                            required
                        />
                        <Button onClick={onLogin} fullWidth>Login</Button>
                    </Stack>
                </Card>
            </Stack>
        </Container>
    )
}

export default LoginPage;