import { Button, Drawer, Group, Input, InputWrapper, ScrollArea, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Check, X } from "tabler-icons-react";
import { base_url } from "../../config/baseUrl";
import RegulationCategoryEntity from "../../entity/RegulationCategoryEntity";

const AddRegulationCategoryDrawer = () => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [form, setForm] = useState(RegulationCategoryEntity)
    const [isLoading, setIsLoading] = useState(false);
    const slug = "ciptaker-categories";

    const topicColumns = [
        {
            field: 'name',
            headerName: 'Category Name',
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

    const refreshTopic = () => {
        axios.get(`${base_url}/${slug}`).then((res) => {
            setCategory(res.data.data)
        })
    }

    useEffect(() => {
        axios.get(`${base_url}/${slug}`).then((res) => {
            setCategory(res.data.data)
        })
    }, [])

    const onDelete = (id) => {
        setIsLoading(true);
        axios.delete(`${base_url}/${slug}/${id}`, form)
            .then(res => {
                setIsLoading(false);
                refreshTopic();
                showNotification({
                    title: 'Success',
                    autoClose: 5000,
                    icon: <Check />,
                    color: 'green',
                    message: 'Regulation Category has been deleted'
                })

            }).catch(err => {
                setIsLoading(false);
                console.log(err);
                showNotification({
                    title: 'Error',
                    autoClose: 5000,
                    icon: <X/>,
                    color: 'red',
                    message: 'Error occured'
                })
            })
    }

    const onSubmit = () => {
        setIsLoading(true);
        axios.post(`${base_url}/${slug}`, form)
            .then(res => {
                setIsLoading(false);
                refreshTopic();
                setForm(RegulationCategoryEntity)
                showNotification({
                    title: 'Success',
                    autoClose: 5000,
                    icon: <Check />,
                    color: 'green',
                    message: 'Regulation Category has been added'
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
                title="Add Regulation Category"
                padding={"xl"}
                size={"xl"}
                position={"left"}
            >
                <ScrollArea style={{ height: '85vh' }}>
                    <Stack>
                        <InputWrapper label="Category Name" required>
                            <Input value={form.title} onChange={(ev) => setForm({ ...form, name: ev.target.value })} />
                        </InputWrapper>
                        <Group>
                            <Button onClick={onSubmit} loading={isLoading}>Save</Button>
                            <Button onClick={() => { setOpen(false); setForm(RegulationCategoryEntity) }}>Cancel</Button>
                        </Group>
                        <DataGrid sx={{ minHeight: 500 }} columns={topicColumns} rows={category} />
                    </Stack>
                </ScrollArea>

            </Drawer>
        </>
    )
}

export default AddRegulationCategoryDrawer