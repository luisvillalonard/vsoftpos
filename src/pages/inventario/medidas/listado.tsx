import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { Medida } from "../../../interfaces/inventario";

const MedidasListado = (props: Pick<ControlProps, "filter">) => {

    const { filter = '' } = props
    const { contextMedidas: { state, editar, todos } } = useData()
    const { datos, procesando, recargar } = state
    const { Column } = Table
    const url = useLocation()

    const cargar = async () => await todos();

    useEffect(() => { cargar() }, [url.pathname])

    useEffect(() => { if (recargar) { cargar() } }, [recargar])

    return (
        <Table<Medida>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => item.nombre.toLowerCase().indexOf(filter) >= 0 ||
                            (item.nombre ?? '').toLowerCase().indexOf(filter) >= 0)
                        .map((item, index) => { return { ...item, key: (index + 1).toString() } })
            }
            locale={{ emptyText: <Flex>0 medidas</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Acci&oacute;n" align="center" width={80}
                render={(record: Medida) => (
                    <Tooltip title={`Editar la medida (${record.nombre})`}>
                        <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                    </Tooltip>
                )} />
        </Table>
    )
}
export default MedidasListado;
