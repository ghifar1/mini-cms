import { AppShell, Burger, Group, Header, MediaQuery, Navbar, Text, ThemeIcon, UnstyledButton, useMantineTheme } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutList, QuestionMark } from "tabler-icons-react";

const MainLink = ({ icon, color, label, to }) => {
    const navigate = useNavigate();

    return (
        <UnstyledButton
            onClick={() => navigate(to)}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
            })}
        >
            <Group>
                <ThemeIcon color={color} variant="light">{icon}</ThemeIcon>
                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    )
}

const NavBarComponent = (props) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <MainLink label={"Faq"} icon={<QuestionMark />} to="/a/faq" />
                    <MainLink label={"Regulasi"} icon={<LayoutList />} to="/a/regulation" />
                </Navbar>
            }
            header={
                <Header height={70} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Text>Hol Ciptaker mini cms</Text>
                    </div>
                </Header>
            }
        >
            {props.children}
        </AppShell>
    )
}

export default NavBarComponent;