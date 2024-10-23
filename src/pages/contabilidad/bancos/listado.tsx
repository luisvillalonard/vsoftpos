import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Banco } from "../../../interfaces/contabilidad";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";

const BancosListado = (props: Pick<ControlProps, "filter">) => {
    const { contextBancos: { state, editar, todos } } = useData();
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
        <Table<Banco>
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
            locale={{ emptyText: <Flex>0 bancos</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Descripci&oacute;n" dataIndex="descripcion" key="descripcion" />
            <Column title="Estado" render={(record: Banco) => (
                <Tag color={record.activo ? '#87d068' : 'red'}>{record.activo ? 'Activo' : 'Inactivo'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: Banco) => (
                <Tooltip title={`Editar el banco (${record.nombre})`}>
                    <Button type="text" icon={<EditFilled className="fs-4" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default BancosListado;
