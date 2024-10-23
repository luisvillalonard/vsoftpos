import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { CondicionPago } from "../../../interfaces/configuraciones";

const CondicionesPagoListado = (props: Pick<ControlProps, "filter">) => {
    const { contextCondicionesPago: { state, editar, todos } } = useData();
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
        <Table<CondicionPago>
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
                        .map((item, index) => { return { ...item, key: index + 1 } })
            }
            locale={{ emptyText: <Flex>0 tipos de factura</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Descripci&oacute;n" dataIndex="descripcion" key="descripcion" />
            <Column title="Aplica al Cliente" align="center" render={(record: CondicionPago) => (
                <Tag color={record.aplicaCliente ? '#87d068' : 'red'}>{record.aplicaCliente ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Aplica al Suplidor" align="center" render={(record: CondicionPago) => (
                <Tag color={record.aplicaSuplidor ? '#87d068' : 'red'}>{record.aplicaSuplidor ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Requiere pago inmediato" align="center" render={(record: CondicionPago) => (
                <Tag color={record.alContado ? '#87d068' : 'red'}>{record.alContado ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Plazo de Vencimiento" dataIndex="diasVencimiento" key="diasVencimiento" />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: CondicionPago) => (
                <Tooltip title={`Editar la condición de pago (${record.descripcion})`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default CondicionesPagoListado;
