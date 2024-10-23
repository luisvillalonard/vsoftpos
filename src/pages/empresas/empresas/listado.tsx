import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Empresa } from "../../../interfaces/empresas";
import { Table, Tooltip, Button, Flex, Tag, Typography } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";

const EmpresasListado = (props: Pick<ControlProps, "filter">) => {
    const { contextEmpresas: { state, editar, todos } } = useData();
    const { datos, procesando, recargar } = state;
    const { filter } = props;
    const url = useLocation();
    const { Column } = Table;
    const { Title } = Typography;

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
        <>
            <Title level={5} style={{ color: '#108ee9' }}>Principales</Title>
            <Table<Empresa>
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
                                    !item.empresaId &&
                                    (item.nombre.toLowerCase().indexOf(filter ?? '') >= 0 ||
                                        (item.rnc || '').indexOf(filter ?? '') >= 0 ||
                                        (item.direccion || '').indexOf(filter ?? '') >= 0 ||
                                        (item.telefono || '').indexOf(filter ?? '') >= 0 ||
                                        (item.correo || '').indexOf(filter ?? '') >= 0)
                                )
                            })
                            .map((item, index) => { return { ...item, key: (index + 1).toString() } })
                } locale={{ emptyText: <Flex>0 empresas</Flex> }}>
                <Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={60} />
                <Column title="Nombre" dataIndex="nombre" key="nombre" />
                <Column title="RNC" dataIndex="rnc" key="rnc" />
                <Column title="Tel&eacute;fono" dataIndex="telefono" key="telefono" />
                <Column title="Direcci&oacute;n" dataIndex="direccion" key="direccion" />
                <Column title="Estado" render={(record: Empresa) => (
                    <Tag color={record.activa ? '#87d068' : 'red'}>{record.activa ? 'Activa' : 'Inactiva'}</Tag>
                )} />
                <Column title="Acci&oacute;n" align="center" fixed="right" width={80}
                    render={(record: Empresa) => (
                        <Tooltip title={`Editar la empresa (${record.nombre})`}>
                            <Button type="text" icon={<EditFilled />} onClick={() => { editar(record) }} />
                        </Tooltip>
                    )} />
            </Table>
            
            <Title level={5}>Sucursales</Title>
            <Table<Empresa>
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
                                    item.empresaId &&
                                    (item.nombre.toLowerCase().indexOf(filter ?? '') >= 0 ||
                                        (item.rnc || '').indexOf(filter ?? '') >= 0 ||
                                        (item.direccion || '').indexOf(filter ?? '') >= 0 ||
                                        (item.telefono || '').indexOf(filter ?? '') >= 0 ||
                                        (item.correo || '').indexOf(filter ?? '') >= 0)
                                )
                            })
                            .map((item, index) => { return { ...item, key: (index + 1).toString() } })
                } locale={{ emptyText: <Flex>0 empresas</Flex> }}>
                <Column title="#" dataIndex="key" key="key" align="center" fixed='left' width={60} />
                {/* <Column title="Tipo" width={80} render={(record: Empresa) => (
                    <Tag color={!record.empresaId ? '#2db7f5' : 'geekblue'}>{!record.empresaId ? 'Principal' : 'Sucursal'}</Tag>
                )} /> */}
                <Column title="Nombre" dataIndex="nombre" key="nombre" />
                <Column title="RNC" dataIndex="rnc" key="rnc" />
                <Column title="Tel&eacute;fono" dataIndex="telefono" key="telefono" />
                <Column title="Direcci&oacute;n" dataIndex="direccion" key="direccion" />
                <Column title="Estado" render={(record: Empresa) => (
                    <Tag color={record.activa ? '#87d068' : 'red'}>{record.activa ? 'Activa' : 'Inactiva'}</Tag>
                )} />
                <Column title="Acci&oacute;n" align="center" fixed="right" width={80}
                    render={(record: Empresa) => (
                        <Tooltip title={`Editar la empresa (${record.nombre})`}>
                            <Button type="text" icon={<EditFilled />} onClick={() => { editar(record) }} />
                        </Tooltip>
                    )} />
            </Table>
        </>
    )
}
export default EmpresasListado;
