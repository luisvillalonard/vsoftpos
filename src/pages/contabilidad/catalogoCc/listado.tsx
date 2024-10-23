import { useData } from "../../../hooks/useData";
import { useEffect } from "react";
import { CatalogoCc } from "../../../interfaces/contabilidad";
import { Table, Tooltip, Button, Flex } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { ControlProps } from "../../../interfaces/globales";

const CatalogoCcListado = (props: Pick<ControlProps, "filter">) => {
    const { contextCatalogoCc: { state, editar, todos } } = useData();
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
        <Table<CatalogoCc>
            size="middle"
            bordered={false}
            loading={procesando}
            pagination={{ size: 'default' }}
            dataSource={
                procesando
                    ? []
                    :
                    datos && datos
                        .filter(item => item.nombre.toLowerCase().indexOf((filter ?? '')) >= 0)
                        .map((item, index) => { return { ...item, key: index + 1 } })
            }
            locale={{ emptyText: <Flex>0 bancos</Flex> }}>
            <Column title="#" dataIndex="key" key="key" align="center" width={60} />
            <Column title="Nombre" dataIndex="nombre" key="nombre" />
            <Column title="C&oacute;digo" dataIndex="codigo" key="codigo" />
            <Column title="Grupo" dataIndex="grupo" key="grupo" />
            <Column title="Nivel 1" dataIndex="nivel1" key="nivel1" />
            <Column title="Nivel 2" dataIndex="nivel2" key="nivel2" />
            <Column title="Nivel 3" dataIndex="nivel3" key="nivel3" />
            <Column title="Descripci&oacute;n" dataIndex="descripcion" key="descripcion" />
            <Column title="Acci&oacute;n" align="center" width={80} render={(record: CatalogoCc) => (
                <Tooltip title={`Editar el banco (${record.nombre})`}>
                    <Button type="text" icon={<EditFilled className="fs-4" />} onClick={() => editar(record)} />
                </Tooltip>
            )} />
        </Table>
    )
}
export default CatalogoCcListado;
