import { useState } from "react"
import { Space } from "antd"
import { useData } from "../../../hooks/useData"
import Listado from "./listado"
import { useComponents } from "../../../components"
import { useIconos } from "../../../hooks/useIconos"

const FacturasPage = () => {
    
    const { contextHorarios: { state: { procesando } } } = useData()
    const [filter, setFilter] = useState<string>('')
    const { Container, TitlePage, Searcher, Loading } = useComponents()
    const { IconInvoice } = useIconos()

    return (
        <>
            <Container
                title={
                    <>
                        <TitlePage title="Facturas" icon={<IconInvoice style={{ fontSize: 24 }} />} />
                        <Space>
                            <Searcher onChange={setFilter} wait={false} variant="borderless" />
                        </Space>
                    </>
                }>
                <Listado filter={filter}/>
            </Container>
            <Loading fullscreen active={procesando} message="procesando, espere..." />
        </>
    )
}
export default FacturasPage;
