import { Divider, Space } from "antd"
import FacturaItem from "./item"
import { useFactura } from "../../../hooks/useFactura"
import PanelPos from "../../../components/containers/panelPos"

const FacturaItems = () => {
    const { factura } = useFactura()

    return (
        <PanelPos title="Productos / Servicios" style={{ width: '100%', height: '100%' }}>
            {
                factura && factura.items && factura.items.length > 0
                    ? factura.items.map((item, index) => {
                        if (index > 0) {
                            return <>
                                <Divider dashed style={{ marginTop: 6, marginBottom: 6 }} />
                                <FacturaItem key={index} item={item} />
                            </>
                        }
                        return <FacturaItem key={index} item={item} />
                    })
                    : <Space style={{ padding: 8 }}>0 items</Space>

            }
        </PanelPos>
    )
}
export default FacturaItems;
