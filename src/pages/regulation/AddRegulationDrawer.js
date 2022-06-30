import { Button, Drawer, Group, Input, InputWrapper, NativeSelect, ScrollArea, Select, Stack, Switch } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import RichTextEditor from "@mantine/rte";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Check, X } from "tabler-icons-react";
import { base_url } from "../../config/baseUrl";
import emptyNulled from "../../config/emptyNulled";
import RegulationEntity from "../../entity/RegulationEntity";

const AddRegulationDrawer = ({ refreshData }) => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [parent, setParent] = useState([]);
    const [form, setForm] = useState(RegulationEntity)
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

    // useEffect(() => {
    //     console.log(form)
    // }, [form, setForm])

    const onSubmit = () => {
        setIsLoading(true);
        emptyNulled(form)
        axios.post(`${base_url}/${slug}`, form)
            .then(res => {
                console.log(res);
                setIsLoading(false);
                setOpen(false);
                setForm(RegulationEntity)
                showNotification({
                    title: 'Success',
                    autoClose: 5000,
                    icon: <Check />,
                    color: 'green',
                    message: 'Faq has been added'
                })
                refreshData()
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
            <Button mb={10} color={"indigo"} onClick={() => { setOpen(true) }} >Add Regulation</Button>
            <Drawer
                opened={open}
                onClose={() => { setOpen(false) }}
                title="Add Regulation"
                padding={"xl"}
                size={"xl"}
                position={"left"}
            >
                <ScrollArea style={{ height: '85vh' }}>
                    <Stack>
                        {/* <InputWrapper label="Topic" required>
                        <Input value={form.topic} onChange={(ev) => setForm({ ...form, topic: ev.target.value })} />
                    </InputWrapper> */}
                        <Select label="Category" placeholder="Pick one" data={category} onChange={(val) => setForm({ ...form, category_id: val })} required />
                        <Select label="Topic Parent" placeholder="Pick one" data={parent} onChange={(val) => setForm({ ...form, parent_id: val })} required />
                        <InputWrapper label="Topic Name" required>
                            <Input value={form.name} onChange={(ev) => setForm({ ...form, name: ev.target.value })} />
                        </InputWrapper>
                        <InputWrapper label="UU Topic Name" required>
                            <Input value={form.uu_name} onChange={(ev) => setForm({ ...form, uu_name: ev.target.value })} />
                        </InputWrapper>
                        <InputWrapper label="UU Overview" required>
                            <Input value={form.uu_overview} onChange={(ev) => setForm({ ...form, uu_overview: ev.target.value })} />
                        </InputWrapper>
                        <InputWrapper label="GUID" required>
                            <Input value={form.guid} onChange={(ev) => setForm({ ...form, guid: ev.target.value })} />
                        </InputWrapper>
                        <DatePicker label="Ditetapkan" value={form.set_on} onChange={(val) => setForm({ ...form, set_on: val })} required />
                        <DatePicker label="Berlaku sejak" value={form.valid_from} onChange={(val) => setForm({ ...form, valid_from: val })} required />
                        <Switch
                            label="Berlaku sama dengan ditetapkan?"
                            onChange={(ev) => setForm({ ...form, valid_from: ev.currentTarget.checked ? form.set_on : (new Date()) })}
                        />
                        <NativeSelect
                            data={['pelaksana','pemerintah', 'menteri', 'lama']}
                            placeholder="Pick one"
                            label="Pilih jenis peraturan"
                            value={form.jenis}
                            onChange={(val) => setForm({ ...form, jenis: val.currentTarget.value })}
                            required
                        />
                        <Switch
                            checked={form.is_revoked}
                            label="Dicabut?"
                            onChange={(ev) => setForm({ ...form, is_revoked: ev.currentTarget.checked })}
                        />
                        <Switch
                            checked={form.is_changed}
                            label="Diubah?"
                            onChange={(ev) => setForm({ ...form, is_changed: ev.currentTarget.checked })}
                        />
                        <Switch
                            checked={form.is_english_avail}
                            label="Tersedia Terjemahan Inggris?"
                            onChange={(ev) => setForm({ ...form, is_english_avail: ev.currentTarget.checked })}
                        />
                        <Group>
                            <Button onClick={onSubmit} loading={isLoading}>Save</Button>
                            <Button onClick={() => { setOpen(false); setForm({}) }}>Cancel</Button>
                        </Group>
                    </Stack>
                </ScrollArea>
            </Drawer>
        </>
    )
}

export default AddRegulationDrawer;