import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { FormatDate_DDMMYYYY, GetTimeFromString } from "../../../hooks/useUtils";
import { ControlProps } from "../../../interfaces/globales";
import { ComprobanteSecuencia } from "../../../interfaces/contabilidad";

const HorariosListado = (props: Pick<ControlProps, "filter">) => {
    const { contextComprobantesSecuencias: { state, editar, todos } } = useData();
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
        <Table<ComprobanteSecuencia>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => (item.comprobante?.nombre || '').toLowerCase().indexOf((filter ?? '')) >= 0 ||
                                        (item.empresa?.nombre || '').toLowerCase().indexOf((filter ?? '')) >= 0)
                        .map((item, index) => { return { ...item, key: index + 1 } })
            }
            locale={{ emptyText: <Flex>0 horarios</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Comprobante" render={(record: ComprobanteSecuencia) => (record.comprobante?.nombre)} />
            <Column title="Desde" dataIndex="desde" key="desde" />
            <Column title="Hasta" dataIndex="hasta" key="hasta" />
            <Column title="&Uacute;ltimo" dataIndex="ultimo" key="ultimo" />
            <Column title="Fecha Vencimiento"  render={(record: ComprobanteSecuencia) => (
                record.fechaVence ? FormatDate_DDMMYYYY(record.fechaVence) : ''
            )} />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: ComprobanteSecuencia) => (
                <Tooltip title={`Editar el comprobante (${record.comprobante?.nombre})`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default HorariosListado;
