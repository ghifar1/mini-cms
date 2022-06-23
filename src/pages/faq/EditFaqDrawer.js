import { Button, Drawer, Group, Input, InputWrapper, Select, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import RichTextEditor from "@mantine/rte";
import axios from "axios";
import { useEffect, useState } from "react";
import { Check, X } from "tabler-icons-react";
import { base_url } from "../../config/baseUrl";
import FaqEntity from "../../entity/FaqEntity";

const EditFaqDrawer = ({ data, refreshQuestion }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(FaqEntity);
    const [topic, setTopic] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get(`${base_url}/faq-topic`).then((res) => {
            let dataConvert = []
            res.data?.data?.forEach(data => {
                dataConvert.push({ value: data.id, label: data.title })
            });
            setTopic(dataConvert)
        })
    }, [open])


    const onSubmitEdit = () => {
        setIsLoading(true);
        axios.put(`${base_url}/faq/${selectedQuestion.id}`, selectedQuestion).then((res) => {
            console.log(res);
            setIsLoading(false);
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
            setIsLoading(false);
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
                    setOpen(false); setSelectedQuestion(FaqEntity)
                }}
                title="Edit Faq"
                padding={"xl"}
                size={"xl"}
                position={"left"}
            >
                <Stack>
                    {/* <InputWrapper label="Topic" required>
                        <Input value={selectedQuestion.topic} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, topic: ev.target.value })} />
                    </InputWrapper> */}
                    <Select label="Topic" placeholder="Pick one" data={topic} defaultValue={selectedQuestion.topic_id} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, topic_id: val })} required />
                    <InputWrapper label="Question" required>
                        <Input value={selectedQuestion.question} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, question: ev.target.value })} />
                    </InputWrapper>
                    <InputWrapper label="Answer" required>
                        <RichTextEditor value={selectedQuestion.answer} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, answer: val })} />
                    </InputWrapper>
                    <Group>
                        <Button onClick={onSubmitEdit} loading={isLoading}>Save</Button>
                        <Button onClick={() => { setOpen(false); setSelectedQuestion({}) }}>Cancel</Button>
                    </Group>
                </Stack>
            </Drawer>
        </>
    )
}

export default EditFaqDrawer