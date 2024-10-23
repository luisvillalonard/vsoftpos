import { useData } from "../../../hooks/useData";
import { useEffect, useState } from "react";
import { Empleado, Empresa } from "../../../interfaces/empresas";
import { Table, Tooltip, Button, Row, Col, Flex, Tag, Input, Space } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const EmpleadosListado = (props: Pick<ControlProps, "filter">) => {
    const { contextEmpleados: { state, editar, todos } } = useData();
    const { datos, procesando, recargar } = state;
    const { filter } = props;
    const url = useLocation();
    const { Column } = Table;

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
        <Table<Empleado>
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
                            return (
                                item.nombre.toLowerCase().indexOf(filter ?? '') >= 0 ||
                                (item.cedula || '').indexOf(filter ?? '') >= 0 ||
                                (item.correo || '').indexOf(filter ?? '') >= 0
                            )
                        })
                        .map((item, index) => { return { ...item, key: (index + 1).toString() } })
            } locale={{ emptyText: <Flex>0 empleados</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="C&eacute;dula" dataIndex="cedula" key="cedula" />
            <Column title="Posici&oacute;n" render={(record: Empleado) => (record.posicion?.nombre)} />
            <Column title="Empresa" render={(record: Empleado) => (record.empresa.nombre)} />
            <Column title="Fecha Entrada" render={(record: Empleado) => (
                record.fechaEntrada
            )} />
            <Column title="Estado" render={(record: Empleado) => (
                <Tag color={record.activo ? '#87d068' : 'red'}>{record.activo ? 'Activo' : 'Inactivo'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: Empleado) => (
                <Tooltip title={`Editar el empleado (${record.nombre})`}>
                    <Button type="text" icon={<EditFilled />} onClick={() => { editar(record) }} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default EmpleadosListado;
