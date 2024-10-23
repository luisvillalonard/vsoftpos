import { useState } from "react"
import { Col, Layout, Row } from "antd"
import FacturasListado from "./listado"
import FormularioPago from "./formulario"
import Searcher from "../../../components/searcher"
import { Factura } from "../../../interfaces/ventas"

const FacturasPagosPage = () => {

    const { Content } = Layout

    const [filtro, setFiltro] = useState<string>('')
    const [factura, setFactura] = useState<Factura | null>(null)

    return (
        <Content>
            <h1 className="fs-4 fw-bolder mb-4">Pagos a Facturas</h1>
            <Row>
                <Col span={8} offset={16} className="mb-3">
                    <Searcher onChange={setFiltro} />
                </Col>
            </Row>
            <FacturasListado filter={filtro} onClick={setFactura} />
            <FormularioPago item={factura} onCancel={() => setFactura(null)} />
        </Content>
    )
}
export default FacturasPagosPage;
