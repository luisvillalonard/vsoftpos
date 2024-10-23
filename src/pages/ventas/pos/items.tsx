import { Divider, Flex, Space } from "antd"
import FacturaItem from "./item"
import { useFactura } from "../../../hooks/useFactura"

const FacturaItems = () => {
    const { factura } = useFactura()

    return (
        <Flex
            vertical
            className="h-100 overflow-y-auto overflow-x-hidden">
            {
                !factura || !factura.items || factura.items.length === 0
                    ? <Space style={{ padding: '0px 22px' }}>0 items</Space>
                    :
                    <Space direction="vertical" split={<Divider className="m-0" style={{ padding: 0 }} />}>
                        {factura?.items.map((item, index) => <FacturaItem key={index} item={item} />)}
                    </Space>

            }
        </Flex>
    )
}
export default FacturaItems;
