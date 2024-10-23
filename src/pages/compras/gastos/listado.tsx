import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { Gasto } from "../../../interfaces/compras";
import { FormatNumber } from "../../../hooks/useUtils";

const GastosListado = (props: Pick<ControlProps, "filter">) => {
    const { contextGastos: { state, editar, todos } } = useData();
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
        <Table<Gasto>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => item.tipo.nombre.toLowerCase().indexOf((filter ?? '')) >= 0 ||
                            (item.empleado?.nombre ?? '').toLowerCase().indexOf((filter ?? '')) >= 0)
                        .map((item, index) => { return { ...item, key: index + 1 } })
            }
            locale={{ emptyText: <Flex>0 horarios</Flex> }}
            scroll={{ x: 1300 }}>
            <Column title="#" dataIndex="key" key="key" align="center" fixed="left" width={60} />
            <Column title="Tipo" render={(record: Gasto) => (record.tipo.nombre)} />
            <Column title="Fecha" dataIndex="fecha" key="fecha" />
            <Column title="Monto" render={(record: Gasto) => (FormatNumber(record.monto, 2))} />
            <Column title="Empresa" render={(record: Gasto) => (record.empresa.nombre)} />
            <Column title="Empleado" render={(record: Gasto) => (record.empleado?.nombre)} />
            <Column title="Estado" render={(record: Gasto) => (
                <Tag color={record.anulado ? 'red' : '#87d068'}>{record.anulado ? 'Anulado' : 'Registrado'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" fixed="right" width={80} render={(record: Gasto) => (
                <Tooltip title={`Editar el gasto`}>
                    <Button type="text" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default GastosListado;
