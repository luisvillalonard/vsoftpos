import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Table, Tooltip, Button, Tag, Flex } from "antd"
import { useData } from "../../../hooks/useData"
import { EditFilled } from "@ant-design/icons"
import { ControlProps } from "../../../interfaces/globales"
import { FormatDate_DDMMYYYY, FormatNumber } from "../../../hooks/useUtils"
import { Factura } from "../../../interfaces/ventas"

const FacturasListado = (props: Pick<ControlProps, "filter">) => {
    
    const { contextFacturas: { state, todos } } = useData();
    const { datos, procesando, recargar } = state;
    const { filter } = props;
    const { Column } = Table;
    const url = useLocation();

    const cargar = async () => await todos();

    useEffect(() => { cargar() }, [url.pathname])

    useEffect(() => { if (recargar) { cargar() } }, [recargar])

    return (
        <Table<Factura>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => (item.cliente?.nombre || '').toLowerCase().indexOf((filter ?? '')) >= 0 ||
                            (item.fechaEmision ?? '').toLowerCase().indexOf((filter ?? '')) >= 0)
                        .map((item, index) => { return { ...item, key: index + 1 } })
            }
            locale={{ emptyText: <Flex>0 facturas</Flex> }}
            scroll={{ x: 1300 }}>
            <Column title="#" dataIndex="key" key="key" align="center" fixed="left" width={60} />
            <Column title="N&uacute;mero" dataIndex="numero" key="numero" />
            <Column title="Cliente" render={(record: Factura) => (record.cliente?.nombre)} />
            <Column title="Tipo" render={(record: Factura) => (record.facturaTipo?.descripcion)} />
            <Column title="Fecha Emisi&oacute;n" render={(record: Factura) => (FormatDate_DDMMYYYY(record.fechaEmision))} />
            <Column title="NCF" dataIndex="ncf" key="ncf" />
            <Column title="Subtotal" render={(record: Factura) => (FormatNumber(record.subTotal, 2))} />
            <Column title="Itbis" render={(record: Factura) => (FormatNumber(record.itbis, 2))} />
            <Column title="Descuento" render={(record: Factura) => (FormatNumber(record.descuento, 2))} />
            <Column title="Total" render={(record: Factura) => (FormatNumber(record.total, 2))} />
            <Column title="Pendiente" render={(record: Factura) => (FormatNumber(!record.abierta ? 0 : record.total - (record.devuelto + record.pagado), 2))} />
            <Column title="Estado" render={(record: Factura) => (
                <Tag color={record.abierta ? 'volcano' : 'green'}>{record.abierta ? 'Abierta' : 'Cerrada'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" fixed="right" width={80} render={(record: Factura) => (
                <Tooltip title={`Editar la factura número (${record.numero})`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default FacturasListado;
