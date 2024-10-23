import { Button, InputNumber, Space } from "antd"
import { ProductoPuntoVenta } from "../interfaces/inventario"
import { GoPlus } from "react-icons/go"
import { BiMinus } from "react-icons/bi"

type CantidadProductoProps = {
    item: ProductoPuntoVenta
    onChange: (item: ProductoPuntoVenta) => void
}
const CantidadProducto = (props: CantidadProductoProps) => {
    const { item, onChange } = props;

    return (
        <Space size="small" style={{ width: '100%' }}>
            <Button
                size="small"
                shape="circle"
                icon={<GoPlus style={{ color: "#5fad57" }} />}
                onClick={() => onChange({ ...item, cantidad: item.cantidad + 1 })} />
            <InputNumber
                variant="borderless"
                min={0}
                value={item.cantidad}
                onChange={(value) => onChange({ ...item, cantidad: value ?? 0 })}
                onFocus={(evt) => evt.currentTarget.select()} />
            <Button
                size="small"
                shape="circle"
                icon={<BiMinus style={{ color: "#d9363e" }} />}
                disabled={item.cantidad === 0}
                onClick={() => onChange({ ...item, cantidad: item.cantidad - 1 })} />
        </Space>
    )
}
export default CantidadProducto;
