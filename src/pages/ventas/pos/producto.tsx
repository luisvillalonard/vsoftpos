import { Card, Flex, Space, Tooltip, Typography, theme } from "antd"
import { FormatNumber } from "../../../hooks/useUtils"
import { ControlProps } from "../../../interfaces/globales"
import { useEffect, useState } from "react"
import { FacturaDetalle } from "../../../interfaces/ventas"
import { MdOutlineNoPhotography } from "react-icons/md"

const ProductoPos = (props: Pick<ControlProps, "item" | "onClick">) => {

    const { item, onClick } = props
    const [producto, setProducto] = useState<FacturaDetalle | null>(null)
    const { token: { colorPrimary, colorBgLayout } } = theme.useToken()
    const { Text, Paragraph } = Typography;

    useEffect(() => { setProducto(item) }, [item])

    if (!producto) {
        return <></>
    }

    return (
        <Tooltip title={producto.producto}>
            <Card
                hoverable
                style={{
                    width: '100%',
                    borderTopStyle: "solid",
                    borderTopWidth: 4,
                    borderTopColor: colorPrimary,
                }}
                styles={{
                    cover: {
                        position: 'relative',
                        paddingTop: '100%',
                    },
                    body: {
                        padding: 5,
                    }
                }}
                cover={
                    <div style={{ position: 'absolute', overflow: 'hidden', top: 0, bottom: 0, left: 0, right: 0, padding: 5 }}>
                        {/* <MdOutlineNoPhotography style={{ fontSize: 100 }} /> */}
                        <Flex style={{ width: '100%', height: '100%', padding: 3, borderRadius: 5, background: colorBgLayout, border: '0.05rem solid #eee', }}>
                            <Flex align="center" justify="center" style={{ width: '100%', height: '100%' }}>
                                <img
                                    alt={producto.producto}
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                    style={{
                                        margin: 'auto',
                                        maxWidth: '100%',
                                        height: '100%'
                                    }} />
                            </Flex>
                        </Flex>
                    </div>
                }
                onClick={onClick}
            >
                <Space direction="vertical" size={0} style={{ width: '100%' }}>
                    <Text ellipsis>{item.producto}</Text>
                    <Text style={{ color: colorPrimary, fontWeight: 'bold' }}>{FormatNumber(item.total, 2)}</Text>
                </Space>
            </Card>
        </Tooltip>
    )

}
export default ProductoPos;
