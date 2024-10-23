import { Card } from "antd"
import { FormatNumber } from "../../../hooks/useUtils"
import { ControlProps } from "../../../interfaces/globales"
import { useEffect, useState } from "react"
import { FacturaDetalle } from "../../../interfaces/ventas"

const ProductoPos = (props: Pick<ControlProps, "item" | "onClick">) => {
    
    const { item, onClick } = props
    const { Meta } = Card
    const [producto, setProducto] = useState<FacturaDetalle | null>(null)

    useEffect(() => { setProducto(item) }, [item])

    if (!producto) {
        return <></>
    }

    return (
        <Card
            hoverable
            style={{
                maxWidth: 125,
                width: '100%',
                height: 'auto'
            }}
            styles={{
                body: {
                    padding: 5
                },
            }}
            cover={
                <img
                    alt={item.producto}
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    style={{
                        height: 'auto'
                    }} />
            }
            onClick={onClick}
        >
            <Meta
                title={<span>{item.producto}</span>}
                description={FormatNumber(item.total, 2)} />
        </Card>
    )

}
export default ProductoPos;
