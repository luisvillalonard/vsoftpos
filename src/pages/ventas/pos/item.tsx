import { useEffect, useState } from "react"
import { Button, Flex, Space, theme } from "antd"
import { ControlProps } from "../../../interfaces/globales"
import { FormatNumber } from "../../../hooks/useUtils"
import { useIconos } from "../../../hooks/useIconos"
import { useConstants } from "../../../hooks/useConstants"
import { FacturaDetalle } from "../../../interfaces/ventas"
import { useFactura } from "../../../hooks/useFactura"

const FacturaItem = (props: Pick<ControlProps, "item">) => {

    const { item } = props
    const { editarCantidad, eliminarProducto } = useFactura()
    const { IconTrash, IconPlus, IconMinus } = useIconos()
    const { Colors } = useConstants()
    const [producto, setProducto] = useState<FacturaDetalle | null>(null)
    const { token: { colorBgContainerDisabled } } = theme.useToken()

    const reducir = () => {
        if (producto && producto.cantidad > 1) {
            editarCantidad({ ...producto, cantidad: producto.cantidad - 1 })
        }
    }

    const aumentar = () => {
        if (producto) {
            editarCantidad({ ...producto, cantidad: producto.cantidad + 1 })
        }
    }

    useEffect(() => {
        setProducto(item)
    }, [item])

    if (!producto) {
        return <></>
    }

    return (
        <Flex vertical gap={0} style={{ width: '100%' }}>
            <Flex justify="space-between" style={{ width: '100%' }}>
                <div>{producto.producto}</div>
                <Space>
                    <Button
                        danger
                        size="small"
                        type="text"
                        shape="circle"
                        onClick={() => eliminarProducto(producto)}>
                        <IconTrash />
                    </Button>
                </Space>
            </Flex>
            <Flex justify="space-between" style={{ width: '100%' }}>
                <span style={{ fontSize: 14, fontWeight: 'bold' }}>{FormatNumber(producto.total, 2)}</span>
                <Flex gap={5} align="center" style={{ borderRadius: 14, padding: 2, background: colorBgContainerDisabled }}>
                    <Button
                        size="small"
                        type="text"
                        shape="circle"
                        onClick={aumentar}>
                        <IconPlus style={{ color: Colors.Bg.Primary }} />
                    </Button>
                    <span style={{ width: 18, textAlign: 'center' }}>{producto.cantidad}</span>
                    <Button
                        danger
                        size="small"
                        type="text"
                        shape="circle"
                        onClick={reducir}>
                        <IconMinus style={{ color: Colors.Bg.Success }} />
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default FacturaItem;
