import { useEffect, useState } from "react"
import { Badge, Button, Col, Flex, Row, Space } from "antd"
import { ControlProps } from "../../../interfaces/globales"
import { FormatNumber } from "../../../hooks/useUtils"
import ButtonRemove from "../../../components/buttons/remove"
import { useIconos } from "../../../hooks/useIconos"
import { Colors } from "../../../hooks/useConstants"
import { FacturaDetalle } from "../../../interfaces/ventas"
import { useFactura } from "../../../hooks/useFactura"

const FacturaItem = (props: Pick<ControlProps, "item">) => {

    const { item } = props
    const { editarCantidad, eliminarProducto } = useFactura()
    const { IconArrowDown, IconArrowUp } = useIconos()
    const [producto, setProducto] = useState<FacturaDetalle | null>(null)

    useEffect(() => { setProducto(item) }, [item])

    if (!producto) {
        return <></>
    }

    return (
        <Row wrap={false} gutter={8}>
            <Col flex="none">
            </Col>
            <Col flex="auto" className="px-1" style={{ alignSelf: 'center' }}>
                <Flex vertical>
                    <Space style={{ fontSize: '0.8rem', fontWeight: 'bolder' }}>
                        <Badge
                            size="default"
                            count={producto.cantidad}
                            style={{ backgroundColor: Colors.Bg.Primary, fontSize: 12 }}
                        />
                        {item.producto}
                    </Space>
                    <Space>
                        <Button
                            size="small" shape="circle" type="text"
                            icon={<IconArrowUp style={{ color: Colors.Font.Success }} />}
                            onClick={() => editarCantidad({ ...producto, cantidad: producto.cantidad + 1 })} />
                        <Button
                            disabled={producto.cantidad === 1}
                            size="small" shape="circle" type="text"
                            icon={<IconArrowDown style={{ 
                                color: producto.cantidad > 1 ? Colors.Font.Danger : 'inherit',
                                opacity: producto.cantidad > 1 ? 1 : 0.6
                            }} />}
                            onClick={() => {
                                if (producto.cantidad > 1) {
                                    editarCantidad({ ...producto, cantidad: producto.cantidad - 1 })
                                }
                            }} />
                    </Space>
                </Flex>
            </Col>
            <Col flex="none" style={{ alignSelf: 'center' }}>
                <span style={{ fontWeight: 'bold', opacity: 0.8 }}>{FormatNumber(producto.total * producto.cantidad, 2)}</span>
            </Col>
            <Col flex="none" style={{ alignSelf: 'center' }}>
                <ButtonRemove size="small" buttonCircle={true} onClick={() => eliminarProducto(producto)} />
            </Col>
        </Row>
    )
}
export default FacturaItem;
