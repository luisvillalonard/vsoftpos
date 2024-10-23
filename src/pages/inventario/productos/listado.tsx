import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { Table, Tooltip, Button, Tag, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";
import { Producto } from "../../../interfaces/inventario";
import { FormatNumber } from "../../../hooks/useUtils";

const ProductosListado = (props: Pick<ControlProps, "filter">) => {
    const { contextProductos: { state, editar, todos } } = useData();
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
        <Table<Producto>
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
                            (item.nombre ?? '').toLowerCase().indexOf((filter ?? '')) >= 0)
                        .map((item, index) => { return { ...item, key: (index + 1).toString() } })
            }
            locale={{ emptyText: <Flex>0 productos</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" fixed="left" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="Grupo" render={(record: Producto) => (record.grupo?.nombre)} />
            <Column title="Costo RD$" render={(record: Producto) => (FormatNumber(record.costo, 2))} />
            <Column title="Precio RD$" render={(record: Producto) => (FormatNumber(record.precio, 2))} />
            <Column title="Impuesto" render={(record: Producto) => (record.impuesto?.nombre)} />
            <Column title="Cantidad" render={(record: Producto) => (
                <span style={{ color: (record.stock.entries().next().value as number) <= record.reorden ? 'red' : '' }}>
                    {FormatNumber(record.stock.entries().next().value, 2)}
                </span>
            )} />
            <Column title="Reorden" render={(record: Producto) => (record.reorden)} />
            <Column title="Venta sin stock" align="center" render={(record: Producto) => (
                <Tag color={record.ventaSinStock ? '#87d068' : 'red'}>{record.ventaSinStock ? 'Si' : 'No'}</Tag>
            )} />
            <Column title="Acci&oacute;n" align="center" fixed="right" width={80} render={(record: Producto) => (
                <Tooltip title={`Editar el producto (${record.nombre})`}>
                    <Button type="text" size="small" icon={<EditFilled className="fs-5" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default ProductosListado;
