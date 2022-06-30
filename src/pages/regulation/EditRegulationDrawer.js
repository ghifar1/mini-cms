import { Button, Drawer, Group, Input, InputWrapper, NativeSelect, ScrollArea, Select, Stack, Switch } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import RichTextEditor from "@mantine/rte";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Check, X } from "tabler-icons-react";
import { base_url } from "../../config/baseUrl";
import emptyNulled from "../../config/emptyNulled";
import FaqEntity from "../../entity/FaqEntity";
import RegulationEntity from "../../entity/RegulationEntity";

const EditRegulationDrawer = ({ data, refreshData}) => {
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


    const onSubmitEdit = () => {
        setIsLoading(true);
        emptyNulled(selectedQuestion)
        axios.put(`${base_url}/${slug}/${selectedQuestion.id}`, selectedQuestion).then((res) => {
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
            refreshData()
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
                title="Edit Regulation"
                padding={"xl"}
                size={"xl"}
                position={"left"}
            >
                <ScrollArea style={{ height: '85vh' }}>
                    <Stack>
                        {/* <InputWrapper label="Topic" required>
                        <Input value={selectedQuestion.topic} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, topic: ev.target.value })} />
                    </InputWrapper> */}
                       <Select label="Category" placeholder="Pick one" value={selectedQuestion.category_id} data={category} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, category_id: val })} required />
                        <Select label="Topic Parent" placeholder="Pick one" value={selectedQuestion.parent_id ?? ''} data={parent} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, topic_id: val })} />
                        <InputWrapper label="Topic Name" required>
                            <Input value={selectedQuestion.name} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, name: ev.target.value })} />
                        </InputWrapper>
                        <InputWrapper label="UU Topic Name" required>
                            <Input value={selectedQuestion.uu_name} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, uu_name: ev.target.value })} />
                        </InputWrapper>
                        <InputWrapper label="UU Overview" required>
                            <Input value={selectedQuestion.uu_overview} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, uu_overview: ev.target.value })} />
                        </InputWrapper>
                        <InputWrapper label="GUID" required>
                            <Input value={selectedQuestion.guid} onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, guid: ev.target.value })} />
                        </InputWrapper>
                        <DatePicker label="Ditetapkan" value={new Date(selectedQuestion.set_on)} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, set_on: val })} required />
                        <DatePicker label="Berlaku sejak" value={new Date(selectedQuestion.valid_from)} onChange={(val) => setSelectedQuestion({ ...selectedQuestion, valid_from: val })} required />
                        <Switch
                            label="Berlaku sama dengan ditetapkan?"
                            onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, valid_from: ev.currentTarget.checked ? selectedQuestion.set_on : (new Date()) }) }
                        />
                        <NativeSelect
                            data={['pelaksana','pemerintah', 'menteri', 'lama']}
                            placeholder="Pick one"
                            label="Pilih jenis peraturan"
                            value={selectedQuestion.jenis}
                            onChange={(val) => setSelectedQuestion({ ...selectedQuestion, jenis: val.currentTarget.value })}
                            required
                        />
                        <Switch
                            checked={selectedQuestion.is_revoked}
                            label="Dicabut?"
                            onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, is_revoked: ev.currentTarget.checked })}
                        />
                        <Switch
                            checked={selectedQuestion.is_changed}
                            label="Diubah?"
                            onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, is_changed: ev.currentTarget.checked })}
                        />
                        <Switch
                            checked={selectedQuestion.is_english_avail}
                            label="Tersedia Terjemahan Inggris?"
                            onChange={(ev) => setSelectedQuestion({ ...selectedQuestion, is_english_avail: ev.currentTarget.checked })}
                        />
                        <Group>
                            <Button onClick={onSubmitEdit} loading={isLoading}>Save</Button>
                            <Button onClick={() => { setOpen(false); setSelectedQuestion({}) }}>Cancel</Button>
                        </Group>
                    </Stack>
                </ScrollArea>
            </Drawer>
        </>
    )
}

export default EditRegulationDrawer