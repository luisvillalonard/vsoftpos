import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Flex, Tag } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { Rol } from "../../../interfaces/seguridad";

const RolesListado = (props: Pick<ControlProps, "filter">) => {

    const { contextRoles: { state, editar, todos } } = useData();
    const { datos, procesando, recargar } = state;
    const { filter } = props;
    const url = useLocation();
    const { Column } = Table;

    const cargar = async () => await todos();

    useEffect(() => { cargar() }, [url.pathname])

    useEffect(() => { if (recargar) cargar() }, [recargar])

    return (
        <Table<Rol>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos
                        .filter(item => item.nombre.toLowerCase().indexOf(filter ?? '') >= 0)
                        .map((item, index) => { return { ...item, key: index + 1 } })
            } locale={{ emptyText: <Flex>0 perf&iacute;l</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Es Administrador?" render={(record: Rol) => (
                <Tag color={record.esAdministrador ? '#87d068' : 'red'}>{record.esAdministrador ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: Rol) => (
                <Tooltip title={`Editar el perfíl (${record.nombre})`}>
                    <Button type="text" icon={<EditFilled />} onClick={() => { editar(record) }} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default RolesListado;
