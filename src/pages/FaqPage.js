import { Button, Container, Drawer, Group, Input, InputWrapper, Stack, TextInput, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { base_url } from "../config/baseUrl";
import { DataGrid } from '@mui/x-data-grid';
import RichTextEditor from "@mantine/rte";
import { showNotification } from "@mantine/notifications";
import { Check, Cross, X } from "tabler-icons-react";

const AddDrawer = ({ refreshQuestion }) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        topic: '',
        question: '',
        answer: ''
    })

    const onSubmit = () => {
        axios.post(`${base_url}/faq`, form)
            .then(res => {
                console.log(res);
                setOpen(false);
                setForm({
                    topic: '',
                    question: '',
                    answer: ''
                })
                showNotification({
                    title: 'Success',
                    autoClose: 5000,
                    icon: <Check />,
                    color: 'green',
                    message: 'Faq has been added'
                })
                refreshQuestion()
            }).catch(err => {
                console.log(err);
                showNotification({
                    title: 'Error',
                    autoClose: 5000,
                    icon: <X />,
                    color: 'red',
                    message: 'Error occured'
                })
            })
    }

    return (
        <>
            <Button mb={10} color={"indigo"} onClick={() => { setOpen(true) }} >Add Data</Button>
            <Drawer
                opened={open}
                onClose={() => { setOpen(false) }}
                title="Add Faq"
                padding={"xl"}
                size={"xl"}
                position={"left"}
            >
                <Stack>
                    <InputWrapper label="Topic" required>
                        <Input value={form.topic} onChange={(ev) => setForm({ ...form, topic: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper label="Question" required>
                        <Input value={form.question} onChange={(ev) => setForm({ ...form, question: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper label="Answer" required>
                        <RichTextEditor value={form.answer} onChange={(val) => setForm({ ...form, answer: val })} />
                    </InputWrapper>
                    <Group>
                        <Button onClick={onSubmit}>Save</Button>
                        <Button onClick={() => { setOpen(false); setForm({}) }}>Cancel</Button>
                    </Group>
                </Stack>
            </Drawer>
        </>
    )
}

const DeleteDrawer = ({ data, refreshQuestion }) => {
    const [selectedQuestion, setSelectedQuestion] = useState({
        id: '',
        topic: '',
        question: '',
        answer: ''
    });
    const [open, setOpen] = useState(false);

    const onSubmitDelete = () => {
        axios.delete(`${base_url}/faq/${selectedQuestion.id}`).then((res) => {
            console.log(res);
            showNotification({
                title: 'Success',
                autoClose: 5000,
                icon: <Check />,
                color: 'green',
                message: 'Faq has been deleted'
            })
            setOpen(false);
            refreshQuestion()
        }).catch((err) => {
            console.log(err);
            showNotification({
                title: 'Error',
                autoClose: 5000,
                icon: <X />,
                color: 'red',
                message: 'Error occured'
            })
        })


    }

    return (
        <>
            <Button size="xs" onClick={() => { setOpen(true); setSelectedQuestion(data) }}>Delete</Button>
            <Drawer
                opened={open}
                onClose={() => {
                    setOpen(false); setSelectedQuestion({
                        id: '',
                        topic: '',
                        question: '',
                        answer: ''
                    })
                }}
                title="Delete Faq"
                padding={"xl"}
                size={"xl"}
            >
                <Group>
                    <Title order={2}>Are you sure you want to delete?</Title>

                </Group>
                <InputWrapper label="Topic">
                    <Input value={selectedQuestion.topic} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, topic: ev.target.value })} disabled />
                </InputWrapper>
                <InputWrapper label="Question">
                    <Input value={selectedQuestion.question} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, question: ev.target.value })} disabled />
                </InputWrapper>
                <InputWrapper label="Answer">
                    <RichTextEditor value={selectedQuestion.answer} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, answer: val })} readOnly />
                </InputWrapper>
                <Group my={15}>
                    <Button onClick={onSubmitDelete} color="red">Delete</Button>
                    <Button onClick={() => {
                        setOpen(false); setSelectedQuestion({
                            id: '',
                            topic: '',
                            question: '',
                            answer: ''
                        })
                    }}>Cancel</Button>
                </Group>
            </Drawer>
        </>
    )
}

const FaqDrawer = ({ data, refreshQuestion }) => {
    const [selectedQuestion, setSelectedQuestion] = useState({
        id: '',
        topic: '',
        question: '',
        answer: ''
    });
    const [open, setOpen] = useState(false);

    const onSubmitEdit = () => {
        axios.put(`${base_url}/faq/${selectedQuestion.id}`, selectedQuestion).then((res) => {
            console.log(res);
            setOpen(false);
            showNotification({
                title: 'Success',
                autoClose: 5000,
                icon: <Check />,
                color: 'green',
                message: 'Faq has been updated'
            })
            refreshQuestion()
        }).catch((err) => {
            console.log(err.response)
            showNotification({
                title: 'Error',
                autoClose: 5000,
                icon: <X />,
                color: 'red',
                message: 'Error occured'
            })
        })
    }

    return (
        <>
            <Button size="xs" onClick={() => { setOpen(true); setSelectedQuestion(data) }}>Edit</Button>
            <Drawer
                opened={open}
                onClose={() => {
                    setOpen(false); setSelectedQuestion({
                        id: '',
                        topic: '',
                        question: '',
                        answer: ''
                    })
                }}
                title="Edit Faq"
                padding={"xl"}
                size={"xl"}
                position={"left"}
            >
                <Stack>
                    <InputWrapper label="Topic" required>
                        <Input value={selectedQuestion.topic} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, topic: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper label="Question" required>
                        <Input value={selectedQuestion.question} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, question: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper label="Answer" required>
                        <RichTextEditor value={selectedQuestion.answer} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, answer: val })} />
                    </InputWrapper>
                    <Group>
                        <Button onClick={onSubmitEdit}>Save</Button>
                        <Button onClick={() => { setOpen(false); setSelectedQuestion({}) }}>Cancel</Button>
                    </Group>
                </Stack>
            </Drawer>
        </>
    )
}


const FaqPage = () => {
    const [listQuestion, setListQuestion] = useState([]);
    const columns = [
        { field: 'topic', headerName: 'Topic', flex: 2 },
        { field: 'question', headerName: 'Question', flex: 2 },
        {
            field: 'id',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Group>
                        <FaqDrawer data={params.row} refreshQuestion={refreshQuestion} />
                        <DeleteDrawer data={params.row} refreshQuestion={refreshQuestion} />
                    </Group>
                )
            }
        }
    ]

    const refreshQuestion = () => {
        axios.get(`${base_url}/faq`).then((res) => {
            setListQuestion(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`${base_url}/faq`).then((res) => {
            setListQuestion(res.data.data);
            console.log(res.data);
        })
    }, [])

    return (
        <Container>
            <AddDrawer refreshQuestion={refreshQuestion} />
            <DataGrid sx={{ minHeight: 500 }} columns={columns} rows={listQuestion} />
        </Container>
    )
}

export default FaqPage;