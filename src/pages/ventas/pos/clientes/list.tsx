import { useEffect, useState } from "react";
import { Button, Col, Drawer, Flex, Row, Table } from "antd"
import { useData } from "../../../../hooks/useData"
import { Cliente } from "../../../../interfaces/ventas"
import PosCliente from "./data"
import ClienteEstado from "./state"
import Searcher from "../../../../components/searcher"
import { useFactura } from "../../../../hooks/useFactura"
import { useIconos } from "../../../../hooks/useIconos"
import { ControlProps } from "../../../../interfaces/globales";
import { Colors } from "../../../../hooks/useConstants";

const PosClientes = (props: Pick<ControlProps, "isOpen" | "onClick" | "onCancel">) => {

    const { isOpen, onClick, onCancel } = props
    const { contextClientes: { state: { datos: clientes, procesando }, todos } } = useData()
    const { editarCliente } = useFactura()
    const { IconClose } = useIconos()
    const [filter, setFilter] = useState<string>('')
    const { Column } = Table

    useEffect(() => {
        if (isOpen) (async () => await todos())()
    }, [isOpen])

    return (
        <Drawer
            open={isOpen}
            loading={procesando}
            placement="right"
            width="100%"
            title={
                <Row style={{ width: '100%', marginLeft: 6 }}>
                    <Col flex="auto">
                        <Searcher onChange={setFilter} wait={false} style={{ border: 0 }} />
                    </Col>
                    <Col flex="none">
                        <Button
                            type="text"
                            shape="circle"
                            icon={<IconClose className="fs-4" />}
                            onClick={onCancel} />
                    </Col>
                </Row>
            }
            closable={false}
            extra={null}
            getContainer={false}
            styles={{
                header: { paddingLeft: 6, paddingRight: 6, paddingBottom: 15, borderBottomWidth: '5px', borderBottomStyle: 'solid', borderBottomColor: Colors.Bg.Primary },
                body: { padding: 0 },
            }}>
            {
                !clientes
                    ? <Flex>0 clientes</Flex>
                    :
                    <Table
                        size="small"
                        bordered={false}
                        showHeader={false}
                        loading={procesando}
                        dataSource={
                            clientes
                                .filter(item => item.nombre.toLowerCase().indexOf(filter || '') >= 0 ||
                                    (item.telefono || '').indexOf(filter || '') >= 0 ||
                                    (item.correo || '').indexOf(filter || '') >= 0)
                                .map((item, index) => { return { ...item, key: index + 1 } })
                        }
                        pagination={{ position: ['none', 'none'] }}
                        locale={{ emptyText: <Flex>0 clientes</Flex> }}>
                        <Column width={40} align="center" key="key" render={() => (<ClienteEstado active={true} />)} />
                        <Column render={(record: Cliente) => (
                            <PosCliente item={record} onClick={() => {
                                editarCliente(record);
                                onClick && onClick(record);
                            }} />
                        )} />
                    </Table>
            }
        </Drawer>
    )
}
export default PosClientes;
