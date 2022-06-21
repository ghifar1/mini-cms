import { Button, Card, Container, PasswordInput, Stack, Title } from "@mantine/core";

const LoginPage = () => {
    return (
        <Container>
            <Stack justify={"center"} sx={{ height: '100vh' }}>
                <Card sx={{ backgroundColor: '#93CAED' }}>
                    <Title order={2} align="center">Login</Title>
                    <Stack sx={{margin: 2}}>
                        <PasswordInput 
                            label="Password"
                            required
                        />
                        <Button fullWidth>Login</Button>
                    </Stack>
                </Card>
            </Stack>
        </Container>
    )
}

export default LoginPage;