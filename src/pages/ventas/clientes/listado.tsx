import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { FormatDate_DDMMYYYY, FormatNumber } from "../../../hooks/useUtils";
import { Cliente } from "../../../interfaces/ventas";
import ColumnGroup from "antd/es/table/ColumnGroup";

const ClientesListado = (props: Pick<ControlProps, "filter">) => {
    const { contextClientes: { state: { datos, procesando, recargar }, editar, todos } } = useData()
    const { filter } = props
    const { Column } = Table
    const url = useLocation()

    const cargar = async () => await todos();

    useEffect(() => { cargar() }, [url.pathname])

    useEffect(() => { if (recargar) cargar() }, [recargar])

    return (
        <Table<Cliente>
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
            locale={{ emptyText: <Flex>0 clientes</Flex> }}
            scroll={{ x: 1300 }}>
            <Column title="#" dataIndex="key" key="key" align="center" fixed="left" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="C&eacute;dula / RNC" render={(record: Cliente) => (record.esEmpresa ? record.rnc : record.cedula)} />
            <Column title="Tel&eacute;fono" dataIndex="telefono" key="telefono" />
            <Column title="Tipo" render={(record: Cliente) => (record.esEmpresa ? 'Empresa' : 'Persona Física')} />
            <Column title="Condici&oacute;n de Pago" render={(record: Cliente) => (record.condicionPago?.nombre)} />
            <Column title="Fecha Ingreso" render={(record: Cliente) => (FormatDate_DDMMYYYY(record.fechaIngreso))} />
            <ColumnGroup title="Cr&eacute;dito" align="center">
                <Column title="Tiene?" align="center" render={(record: Cliente) => (
                    <Tag color={record.activo ? 'green' : 'red'} style={{ fontWeight: 'bold' }}>{record.activo ? 'Si' : 'No'}</Tag>
                )} />
                <Column title="Monto RD$" align="center" render={(record: Cliente) => (FormatNumber(record.credito?.monto, 2))} />
            </ColumnGroup>
            <Column title="Estado" render={(record: Cliente) => (
                <Tag color={record.activo ? '#87d068' : 'red'}>{record.activo ? 'Activo' : 'Inactivo'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" fixed="right" width={80} render={(record: Cliente) => (
                <Tooltip title={`Editar el cliente (${record.nombre})`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default ClientesListado;
