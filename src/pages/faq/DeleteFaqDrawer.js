import { Button, Drawer, Group, Input, InputWrapper, Select, Stack, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import RichTextEditor from "@mantine/rte";
import axios from "axios";
import { useEffect, useState } from "react";
import { Check, X } from "tabler-icons-react";
import { base_url } from "../../config/baseUrl";
import FaqEntity from "../../entity/FaqEntity";

const DeleteFaqDrawer = ({ data, refreshQuestion }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(FaqEntity);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitDelete = () => {
        setIsLoading(true);
        axios.delete(`${base_url}/faq/${selectedQuestion.id}`).then((res) => {
            console.log(res);
            showNotification({
                title: 'Success',
                autoClose: 5000,
                icon: <Check />,
                color: 'green',
                message: 'Faq has been deleted'
            })
            setIsLoading(false);
            setOpen(false);
            refreshQuestion()
        }).catch((err) => {
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
            <Button size="xs" onClick={() => { setOpen(true); setSelectedQuestion(data) }}>Delete</Button>
            <Drawer
                opened={open}
                onClose={() => {
                    setOpen(false); setSelectedQuestion(FaqEntity)
                }}
                title="Delete Faq"
                padding={"xl"}
                size={"xl"}
            >
                <Group>
                    <Title order={2}>Are you sure you want to delete?</Title>

                </Group>
                <InputWrapper label="Topic">
                    <Input value={selectedQuestion?.Topic?.title} disabled />
                </InputWrapper>
                <InputWrapper label="Question">
                    <Input value={selectedQuestion.question} disabled />
                </InputWrapper>
                <InputWrapper label="Answer">
                    <RichTextEditor value={selectedQuestion.answer} readOnly />
                </InputWrapper>
                <Group my={15}>
                    <Button onClick={onSubmitDelete} color="red" loading={isLoading}>Delete</Button>
                    <Button onClick={() => {
                        setOpen(false); setSelectedQuestion(FaqEntity)
                    }}>Cancel</Button>
                </Group>
            </Drawer>
        </>
    )
}

export default DeleteFaqDrawer