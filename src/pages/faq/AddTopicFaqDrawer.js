import { Button, Drawer, Group, Input, InputWrapper, Select, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Check, X } from "tabler-icons-react";
import { base_url } from "../../config/baseUrl";
import FaqTopicEntity from "../../entity/FaqTopicEntity";

const AddTopicFaqDrawer = () => {
    const [open, setOpen] = useState(false);
    const [topic, setTopic] = useState([]);
    const [form, setForm] = useState(FaqTopicEntity);
    const [isLoading, setIsLoading] = useState(false);

    const refreshTopic = () => {
        axios.get(`${base_url}/faq-topic`).then((res) => {
            setTopic(res.data.data)
        })
    }

    useEffect(() => {
        axios.get(`${base_url}/faq-topic`).then((res) => {
            setTopic(res.data.data)
        })
    }, [])

    const topicColumns = [
        {
            field: 'title',
            headerName: 'Topic Title',
            flex: 1
        },
        {
            field: 'id',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <Group>
                        <Button size="xs" color="red" onClick={() => onDelete(params.row.id)}>Delete</Button>
                    </Group>
                )
            }
        }
    ]

    const onDelete = (id) => {
        setIsLoading(true);
        axios.delete(`${base_url}/faq-topic/${id}`, form)
            .then(res => {
                setIsLoading(false);
                refreshTopic();
                showNotification({
                    title: 'Success',
                    autoClose: 5000,
                    icon: <Check />,
                    color: 'green',
                    message: 'Faq Topic has been deleted'
                })

            }).catch(err => {
                setIsLoading(false);
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

    const onSubmit = () => {
        setIsLoading(true);
        axios.post(`${base_url}/faq-topic`, form)
            .then(res => {
                setIsLoading(false);
                refreshTopic();
                setForm(FaqTopicEntity)
                showNotification({
                    title: 'Success',
                    autoClose: 5000,
                    icon: <Check />,
                    color: 'green',
                    message: 'Faq Topic has been added'
                })

            }).catch(err => {
                setIsLoading(false);
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
            <Button mb={10} color={"indigo"} onClick={() => setOpen(true)}>Add Topic</Button>
            <Drawer
                opened={open}
                onClose={() => { setOpen(false) }}
                title="Add Faq Topic"
                padding={"xl"}
                size={"xl"}
                position={"left"}
            >
                <Stack>
                    <InputWrapper label="Topic Name" required>
                        <Input value={form.title} onChange={(ev) => setForm({ ...form, title: ev.target.value })} />
                    </InputWrapper>
                    <Group>
                        <Button onClick={onSubmit} loading={isLoading}>Save</Button>
                        <Button onClick={() => { setOpen(false); setForm(FaqTopicEntity) }}>Cancel</Button>
                    </Group>
                    <DataGrid sx={{ minHeight: 500 }} columns={topicColumns} rows={topic} />
                </Stack>
            </Drawer>
        </>
    )
}

export default AddTopicFaqDrawer