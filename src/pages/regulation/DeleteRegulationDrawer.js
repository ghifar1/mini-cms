import { Button, Drawer, Group, Input, InputWrapper, NativeSelect, ScrollArea, Select, Stack, Switch, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import RichTextEditor from "@mantine/rte";
import axios from "axios";
import { useEffect, useState } from "react";
import { Check, X } from "tabler-icons-react";
import { base_url } from "../../config/baseUrl";
import FaqEntity from "../../entity/FaqEntity";
import RegulationEntity from "../../entity/RegulationEntity";

const DeleteRegulationDrawer = ({ data, refreshData }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(RegulationEntity);
    const [category, setCategory] = useState([]);
    const [parent, setParent] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const slug = "ciptaker-topics";

    useEffect(() => {
        axios.get(`${base_url}/ciptaker-categories`).then((res) => {
            let dataConvert = []
            res.data?.data?.forEach(data => {
                dataConvert.push({ value: data.id, label: data.name })
            });
            setCategory(dataConvert)
        })

        axios.get(`${base_url}/${slug}`).then((res) => {
            let dataConvert = []
            res.data?.data?.forEach(data => {
                dataConvert.push({ value: data.id, label: data.name })
            });
            setParent(dataConvert)
        })
    }, [open])

    const onSubmitDelete = () => {
        setIsLoading(true);
        axios.delete(`${base_url}/${slug}/${selectedQuestion.id}`).then((res) => {
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
            refreshData()
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
                <ScrollArea style={{ height: '85vh' }}>
                    <Stack>
                        <Group>
                            <Title order={2}>Are you sure you want to delete?</Title>

                        </Group>
                        <Select label="Category" placeholder="Pick one" value={selectedQuestion.category_id} data={category} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, category_id: val })} disabled />
                        <Select label="Topic Parent" placeholder="Pick one" value={selectedQuestion.parent_id ?? ''} data={parent} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, parent_id: val })} disabled />
                        <InputWrapper label="Topic Name" required>
                            <Input value={selectedQuestion.name} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, name: ev.target.value })} disabled />
                        </InputWrapper>
                        <InputWrapper label="UU Topic Name" required>
                            <Input value={selectedQuestion.uu_name} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, uu_name: ev.target.value })} disabled />
                        </InputWrapper>
                        <InputWrapper label="UU Overview" required>
                            <Input value={selectedQuestion.uu_overview} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, uu_overview: ev.target.value })} disabled />
                        </InputWrapper>
                        <InputWrapper label="GUID" required>
                            <Input value={selectedQuestion.guid} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, guid: ev.target.value })} disabled />
                        </InputWrapper>
                        <DatePicker label="Ditetapkan" value={new Date(selectedQuestion.set_on)} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, set_on: val })} disabled />
                        <DatePicker label="Berlaku sejak" value={new Date(selectedQuestion.valid_from)} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, valid_from: val })} disabled />
                        <Switch
                            label="Berlaku sama dengan ditetapkan?"
                            onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, valid_from: ev.currentTarget.checked ? selectedQuestion.set_on : (new Date()) })}
                            disabled
                        />
                        <NativeSelect
                            data={['pemerintah', 'menteri', 'lama']}
                            placeholder="Pick one"
                            label="Pilih jenis peraturan"
                            value={selectedQuestion.jenis}
                            onChange={(val) => setSelectedQuestion({ ...selectedQuestion, jenis: val.currentTarget.value })}
                            disabled
                        />
                        <Switch
                            checked={selectedQuestion.is_revoked}
                            label="Dicabut?"
                            onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, is_revoked: ev.currentTarget.checked })}
                            disabled
                        />
                        <Switch
                            checked={selectedQuestion.is_changed}
                            label="Diubah?"
                            onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, is_changed: ev.currentTarget.checked })}
                            disabled
                        />
                        <Switch
                            checked={selectedQuestion.is_english_avail}
                            label="Tersedia Terjemahan Inggris?"
                            onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, is_english_avail: ev.currentTarget.checked })}
                            disabled
                        />
                        <Group my={15}>
                            <Button onClick={onSubmitDelete} color="red" loading={isLoading}>Delete</Button>
                            <Button onClick={() => {
                                setOpen(false); setSelectedQuestion(RegulationEntity)
                            }}>Cancel</Button>
                        </Group>
                    </Stack>
                </ScrollArea>

            </Drawer>
        </>
    )
}

export default DeleteRegulationDrawer