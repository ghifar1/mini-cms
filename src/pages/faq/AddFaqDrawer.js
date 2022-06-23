import { Button, Drawer, Group, Input, InputWrapper, Select, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import RichTextEditor from "@mantine/rte";
import axios from "axios";
import { useEffect, useState } from "react";
import { Check, X } from "tabler-icons-react";
import { base_url } from "../../config/baseUrl";
import FaqEntity from "../../entity/FaqEntity";

const AddFaqDrawer = ({ refreshQuestion }) => {
    const [open, setOpen] = useState(false);
    const [topic, setTopic] = useState([]);
    const [form, setForm] = useState(FaqEntity)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get(`${base_url}/faq-topic`).then((res) => {
            let dataConvert = []
            res.data?.data?.forEach(data => {
                dataConvert.push({ value: data.id, label: data.title })
            });
            setTopic(dataConvert)
        })
    }, [])

    const onSubmit = () => {
        setIsLoading(true);
        axios.post(`${base_url}/faq`, form)
            .then(res => {
                console.log(res);
                setIsLoading(false);
                setOpen(false);
                setForm({
                    topic_id: '',
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
            <Button mb={10} color={"indigo"} onClick={() => { setOpen(true) }} >Add Faq</Button>
            <Drawer
                opened={open}
                onClose={() => { setOpen(false) }}
                title="Add Faq"
                padding={"xl"}
                size={"xl"}
                position={"left"}
            >
                <Stack>
                    {/* <InputWrapper label="Topic" required>
                        <Input value={form.topic} onChange={(ev) => setForm({ ...form, topic: ev.target.value })} />
                    </InputWrapper> */}
                    <Select label="Topic" placeholder="Pick one" data={topic} onChange={(val) => setForm({ ...form, topic_id: val })} required />
                    <InputWrapper label="Question" required>
                        <Input value={form.question} onChange={(ev) => setForm({ ...form, question: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper label="Answer" required>
                        <RichTextEditor value={form.answer} onChange={(val) => setForm({ ...form, answer: val })} />
                    </InputWrapper>
                    <Group>
                        <Button onClick={onSubmit} loading={isLoading}>Save</Button>
                        <Button onClick={() => { setOpen(false); setForm({}) }}>Cancel</Button>
                    </Group>
                </Stack>
            </Drawer>
        </>
    )
}

export default AddFaqDrawer;