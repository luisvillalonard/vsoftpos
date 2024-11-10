import { useEffect, useState } from "react"
import { Button, Col, Flex, Input, Row, Space, theme } from "antd"
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
            style={{ width: '100%', height: '100%', padding: 5 }}>
            <Flex wrap={false} style={{ width: '100%', padding: 3, backgroundColor: colorBgContainer }}>
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
                    placeholder={codigoBarra ? "aquí el codigo de barras" : "escriba aquí para buscar"}
                    onChange={(evt) => setFiltro(evt.target.value)} />
            </Flex>
            <Flex align='start' style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', marginTop: 6 }}>
                <Flex style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, overflowX: 'hidden', overflowY: 'auto', alignItems: 'start' }}>
                    <Row gutter={[10, 14]} align="top" justify="space-between">
                        {
                            productos
                                .filter((item) => {
                                    if (codigoBarra) {
                                        return (item.codigoBarra ?? '').toLowerCase().indexOf(filtro) >= 0;
                                    }
                                    return item.producto.toLowerCase().indexOf(filtro) >= 0;
                                })
                                .map((item, index) => {
                                    return (
                                        <Col xs={{ span: 3 }} lg={{ span: 4 }} md={{ span: 5 }}>
                                            <Producto key={index} item={item} onClick={() => agregar({ ...item, cantidad: 1 })} />
                                        </Col>
                                    )
                                })
                        }
                    </Row>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default PosProductos;
