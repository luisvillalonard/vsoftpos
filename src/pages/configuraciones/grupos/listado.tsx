import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { GetTimeFromString } from "../../../hooks/useUtils";
import { ControlProps } from "../../../interfaces/globales";
import { Grupo } from "../../../interfaces/configuraciones";

const GruposListado = (props: Pick<ControlProps, "filter">) => {
    const { contextGrupos: { state, editar, todos } } = useData();
    const { datos, procesando, recargar } = state;
    const { filter } = props;
    const { Column } = Table;
    const url = useLocation();

    const cargar = async () => await todos();

    useEffect(() => {
        cargar();
    }, [url.pathname])

    useEffect(() => {
        if (recargar) {
            cargar();
        }
    }, [recargar])

    return (
        <Table<Grupo>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => item.nombre.toLowerCase().indexOf((filter ?? '')) >= 0 ||
                            (item.descripcion ?? '').toLowerCase().indexOf((filter ?? '')) >= 0)
                        .map((item, index) => { return { ...item, key: index } })
            }
            locale={{ emptyText: <Flex>0 grupos</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Descripci&oacute;n" dataIndex="descripcion" key="descripcion" />
            <Column title="Aplica a Cliente" align="center" render={(record: Grupo) => (
                <Tag color={record.cliente ? '#87d068' : 'red'}>{record.cliente ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Aplica a Suplidor" align="center" render={(record: Grupo) => (
                <Tag color={record.suplidor ? '#87d068' : 'red'}>{record.suplidor ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Aplica a Producto" align="center" render={(record: Grupo) => (
                <Tag color={record.producto ? '#87d068' : 'red'}>{record.producto ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Aplica a Servicio" align="center" render={(record: Grupo) => (
                <Tag color={record.servicio ? '#87d068' : 'red'}>{record.servicio ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Estado" align="center" render={(record: Grupo) => (
                <Tag color={record.activo ? '#87d068' : 'red'}>{record.activo ? 'Activo' : 'Inactivo'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: Grupo) => (
                <Tooltip title={`Editar horario (${record.nombre})`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default GruposListado;
