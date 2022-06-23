import { Button, Container, Drawer, Group, Input, InputWrapper, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { base_url } from "../../config/baseUrl";
import { DataGrid } from '@mui/x-data-grid';
import RichTextEditor from "@mantine/rte";
import { showNotification } from "@mantine/notifications";
import { Check, Cross, X } from "tabler-icons-react";
import AddFaqDrawer from "./AddFaqDrawer";
import DeleteFaqDrawer from "./DeleteFaqDrawer";
import EditFaqDrawer from "./EditFaqDrawer";
import AddTopicFaqDrawer from "./AddTopicFaqDrawer";

const FaqPage = () => {
    const [listQuestion, setListQuestion] = useState([]);
    const columns = [
        {
            field: 'Topic.title',
            headerName: 'Topic',
            flex: 2,
            valueGetter: (params) => {
                return params.row.Topic.title
            }
        },
        { field: 'question', headerName: 'Question', flex: 2 },
        {
            field: 'id',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Group>
                        <EditFaqDrawer data={params.row} refreshQuestion={refreshQuestion} /> 
                        <DeleteFaqDrawer data={params.row} refreshQuestion={refreshQuestion} />
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
            <Title my={5}>FAQ</Title>
            <Group>
                <AddFaqDrawer refreshQuestion={refreshQuestion} />
                <AddTopicFaqDrawer/>
            </Group>
            <DataGrid sx={{ minHeight: 500 }} columns={columns} rows={listQuestion} />
        </Container>
    )
}

export default FaqPage;