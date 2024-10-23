import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { Suplidor } from "../../../interfaces/compras";
import { FormatDate_DDMMYYYY, FormatNumber } from "../../../hooks/useUtils";

const SuplidoresListado = (props: Pick<ControlProps, "filter">) => {
    const { contextSuplidores: { state, editar, todos } } = useData();
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
        <Table<Suplidor>
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
                            (item.cedula ?? '').toLowerCase().indexOf((filter ?? '')) >= 0)
                        .map((item, index) => { return { ...item, key: index + 1 } })
            }
            locale={{ emptyText: <Flex>0 suplidores</Flex> }}
            scroll={{ x: 1300 }}>
            <Column title="#" dataIndex="key" key="key" align="center" fixed="left" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="C&eacute;dula / RNC" render={(record: Suplidor) => (record.esEmpresa ? record.rnc : record.cedula)} />
            <Column title="Tel&eacute;fono" dataIndex="telefono" key="telefono" />
            <Column title="Condici&oacue;n de Pago" render={(record: Suplidor) => (record.condicionPago?.nombre)} />
            <Column title="Fecha Ingreso" render={(record: Suplidor) => (FormatDate_DDMMYYYY(record.fechaIngreso))} />
            <Column title="Es Informal" render={(record: Suplidor) => (
                <Tag color={record.informal ? '#87d068' : 'red'}>{record.informal ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Estado" render={(record: Suplidor) => (
                <Tag color={record.activo ? '#87d068' : 'red'}>{record.activo ? 'Activo' : 'Inactivo'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" fixed="right" width={80} render={(record: Suplidor) => (
                <Tooltip title={`Editar el suplidor (${record.nombre})`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default SuplidoresListado;
