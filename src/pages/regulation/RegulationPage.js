import { Container, Group, Title } from "@mantine/core";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { base_url } from "../../config/baseUrl";
import AddRegulationCategoryDrawer from "./AddRegulationCategoryDrawer";
import AddRegulationDrawer from "./AddRegulationDrawer";
import DeleteRegulationDrawer from "./DeleteRegulationDrawer";
import EditRegulationDrawer from "./EditRegulationDrawer";

const RegulationPage = () => {
    const [data, setData] = useState([]);

    const columns = [
        {
            field: 'name',
            headerName: 'Nama Topic',
            flex: 2,
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 1,
            valueGetter: (params) => {
                return params.row?.category?.name
            }
        },
        { field: 'guid', headerName: 'GUID', flex: 1 },
        { field: 'jenis', headerName: 'Jenis Peraturan', flex: 1 },
        {
            field: 'id',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Group>
                        <EditRegulationDrawer data={params.row} refreshData={refreshData} /> 
                        <DeleteRegulationDrawer data={params.row} refreshData={refreshData} />
                    </Group>
                )
            }
        }
    ]

    const refreshData = () => {
        axios.get(`${base_url}/ciptaker-topics`).then((res) => {
            setData(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`${base_url}/ciptaker-topics`).then((res) => {
            setData(res.data.data);
            console.log(res.data);
        })
    }, [])
    return (
        <Container>
            <Title my={5}>Regulation</Title>
            <Group>
                <AddRegulationDrawer refreshData={refreshData} />
                <AddRegulationCategoryDrawer />
            </Group>
            <DataGrid sx={{ minHeight: 500 }} columns={columns} rows={data} />
        </Container>
    )
}

export default RegulationPage