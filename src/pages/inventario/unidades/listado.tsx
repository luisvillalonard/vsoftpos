import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { Unidad } from "../../../interfaces/inventario";

const UnidadesMedidaListado = (props: Pick<ControlProps, "filter">) => {

    const { filter = '' } = props
    const { contextUnidades: { state, editar, todos } } = useData()
    const { datos, procesando, recargar } = state
    const { Column } = Table
    const url = useLocation()

    const cargar = async () => await todos();

    useEffect(() => { cargar() }, [url.pathname])

    useEffect(() => { if (recargar) { cargar() } }, [recargar])

    return (
        <Table<Unidad>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => item.descripcion.toLowerCase().indexOf(filter) >= 0 ||
                            (item.medida?.nombre ?? '').toLowerCase().indexOf(filter) >= 0)
                        .map((item, index) => { return { ...item, key: (index + 1).toString() } })
            }
            locale={{ emptyText: <Flex>0 unidades de medida</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Descripci&oacute;n" dataIndex="descripcion" key="descripcion" />
            <Column title="Medida" render={(record: Unidad) => (record.medida?.nombre)} />
            <Column title="Estado" render={(record: Unidad) => (
                <Tag color={record.activa ? '#87d068' : 'red'}>{record.activa ? 'Activo' : 'Inactivo'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: Unidad) => (
                <Tooltip title={`Editar la unidad de medida (${record.descripcion})`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default UnidadesMedidaListado;
