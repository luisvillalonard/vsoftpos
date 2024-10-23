import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Flex, Tag } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { FormatNumber } from "../../../hooks/useUtils";
import { ControlProps } from "../../../interfaces/globales";
import { Impuesto } from "../../../interfaces/contabilidad";

const ImpuestosListado = (props: Pick<ControlProps, "filter">) => {
    const { contextImpuestos: { state, editar, todos } } = useData();
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
        <Table<Impuesto>
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
                            return (item.nombre.toLowerCase().indexOf(filter ?? '') >= 0 ||
                                    item.codigo.toLowerCase().indexOf(filter ?? '') >= 0)
                        })
                        .map((item, index) => { return { ...item, key: index } })
            }
            locale={{ emptyText: <Flex>0 impuestos</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="C&oacute;digo" dataIndex="codigo" key="codigo" />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Tasa" render={(record: Impuesto) => (FormatNumber(record.tasa, 2))} />
            <Column title="Estado" render={(record: Impuesto) => (
                <Tag color={record.activo ? '#87d068' : 'red'}>{record.activo ? 'Activo' : 'Inactivo'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: Impuesto) => (
                <Tooltip title={`Editar el impuesto (${record.nombre})`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default ImpuestosListado;
