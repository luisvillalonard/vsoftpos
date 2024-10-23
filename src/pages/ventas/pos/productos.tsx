import { useEffect, useState } from "react"
import { Button, Flex, Input, Space, theme } from "antd"
import { useFactura } from "../../../hooks/useFactura"
import Producto from "./producto"
import { useIconos } from "../../../hooks/useIconos"

const PosProductos = () => {

    const { productos, agregar, cargarProductos } = useFactura()
    const { token: { colorBgContainer, colorPrimaryText, colorTextLabel } } = theme.useToken()
    const [filtro, setFiltro] = useState<string>('')
    const [codigoBarra, setCodigoBarra] = useState<boolean>(true)
    const { IconBarcode, IconText } = useIconos()

    useEffect(() => {
        cargarProductos()
    }, [])

    return (
        <Flex
            vertical
            className='h-100'>
            <Flex wrap={false} className="w-100 p-2" style={{ backgroundColor: colorBgContainer }}>
            <Space.Compact>
                <Button
                    type="text"
                    style={{ color: codigoBarra ? colorPrimaryText : colorTextLabel }}
                    icon={<IconBarcode style={{ fontSize: '1.25rem' }} />}
                    onClick={() => setCodigoBarra(true)}>
                </Button>
                <Button
                    type="text"
                    style={{ color: !codigoBarra ? colorPrimaryText : colorTextLabel }}
                    icon={<IconText style={{ fontSize: '1.20rem' }} />}
                    onClick={() => setCodigoBarra(false)}>
                </Button>
            </Space.Compact>
            <Input
                variant="borderless"
                style={{ width: '100%' }}
                placeholder={codigoBarra ? "digite el codigo de barras" : "escriba aquí para buscar"}
                onChange={(evt) => setFiltro(evt.target.value)} />
        </Flex>
            <Space
                wrap
                size="large"
                align='start'
                className='h-100 overflow-y-auto p-3'>
                {
                    productos
                        .filter((item) => {
                            if (codigoBarra) {
                                return (item.codigoBarra ?? '').toLowerCase().indexOf(filtro) >= 0;
                            }
                            return item.producto.toLowerCase().indexOf(filtro) >= 0;
                        })
                        .map((item, index) => <Producto key={index} item={item} onClick={() => agregar({ ...item, cantidad: 1 })} />)
                }
            </Space>
        </Flex>
    )
}
export default PosProductos;
