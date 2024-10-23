import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Posicion } from "../../../interfaces/empresas";
import { Table, Tooltip, Button, Flex, Tag } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { FormatNumber } from "../../../hooks/useUtils";
import { ControlProps } from "../../../interfaces/globales";

const PosicionesListado = (props: Pick<ControlProps, "filter">) => {
    const { contextPosiciones: { state, editar, todos } } = useData();
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
        <Table<Posicion>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => {
                            return (item.nombre.toLowerCase().indexOf(filter ?? '') >= 0)
                        })
                        .map((item, index) => { return { ...item, key: (index + 1).toString() } })
            }
            locale={{ emptyText: <Flex>0 posiciones</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Sueldo" render={(record: Posicion) => (FormatNumber(record.sueldo, 2))} />
            <Column title="Estado"
                render={(record: Posicion) => (
                    <Tag color={record.activa ? '#87d068' : 'red'}>{record.activa ? 'Activa' : 'Inactiva'}</Tag>
                )} />
            <Column title="Acci&oacute;n" align="center" width={80}
                render={(record: Posicion) => (
                    <Tooltip title={`Editar la posición (${record.nombre})`}>
                        <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                    </Tooltip>
                )} />
        </Table>
    )
}
export default PosicionesListado;
