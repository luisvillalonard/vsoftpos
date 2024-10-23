import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { FormaPago } from "../../../interfaces/configuraciones";

const FormasPagoListado = (props: Pick<ControlProps, "filter">) => {
    const { contextFormasPago: { state, editar, todos } } = useData();
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
        <Table<FormaPago>
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
            <Column title="Por defecto" align="center" render={(record: FormaPago) => (
                <Tag color={record.primaria ? '#87d068' : 'red'}>{record.primaria ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Aplica en Factura" align="center" render={(record: FormaPago) => (
                <Tag color={record.aplicaEnFactura ? '#87d068' : 'red'}>{record.aplicaEnFactura ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Aplica en Cuadre" align="center" render={(record: FormaPago) => (
                <Tag color={record.aplicaEnCuadre ? '#87d068' : 'red'}>{record.aplicaEnCuadre ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: FormaPago) => (
                <Tooltip title={`Editar la forma de pago (${record.descripcion})`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default FormasPagoListado;
