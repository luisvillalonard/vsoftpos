import { useState } from "react"
import { Space } from "antd"
import FacturasListado from "./listado"
import FormularioPago from "./formulario"
import { Factura } from "../../../interfaces/ventas"
import { useData } from "../../../hooks/useData"
import { useComponents } from "../../../components"
import { useIconos } from "../../../hooks/useIconos"

const FacturasPagosPage = () => {

    const { contextClientes: { state: { procesando } } } = useData()
    const { Container, TitlePage, Loading, Searcher } = useComponents()
    const [factura, setFactura] = useState<Factura | null>(null)
    const [filter, setFilter] = useState<string>('')
    const { IconInvoicePay } = useIconos()

    return (
        <>
            <Container
                title={
                    <>
                        <TitlePage title="Cuentas por Cobrar" icon={<IconInvoicePay style={{ fontSize: 24 }} />} />
                        <Space>
                            <Searcher onChange={setFilter} wait={false} variant="borderless" />
                        </Space>
                    </>
                }>
                <FacturasListado filter={filter} onClick={setFactura} />
                <FormularioPago item={factura} onCancel={() => setFactura(null)} />
            </Container>
            <Loading fullscreen active={procesando} message="procesando, espere..." />
        </>
    )
}
export default FacturasPagosPage;
