import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { Empaque } from "../../../interfaces/inventario";

const EmpaquesListado = (props: Pick<ControlProps, "filter">) => {
    
    const { filter = '' } = props
    const { contextEmpaques: { state, editar, todos } } = useData()
    const { datos, procesando, recargar } = state
    const { Column } = Table
    const url = useLocation()

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
        <Table<Empaque>
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
            locale={{ emptyText: <Flex>0 empaques</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Unidades" dataIndex="unidades" key="unidades" />
            <Column title="Acci&oacute;n" align="center" width={80}
                render={(record: Empaque) => (
                    <Tooltip title={`Editar el empaque (${record.nombre})`}>
                        <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                    </Tooltip>
                )} />
        </Table>
    )
}
export default EmpaquesListado;
