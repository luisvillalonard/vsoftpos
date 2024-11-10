import { useState } from "react"
import { Space } from "antd"
import { useData } from "../../../hooks/useData"
import Loading from "../../../components/containers/loading"
import Listado from "./listado"
import Formulario from "./formulario"
import { useIconos } from "../../../hooks/useIconos"
import Container from "../../../components/containers/container"
import { useComponents } from "../../../components"

const AlmacenesPage = () => {

    const { contextAlmacenes: { state: { procesando }, nuevo } } = useData()
    const [filter, setFilter] = useState<string>('')
    const { ButtonPrimary, Searcher, TitlePage } = useComponents()
    const { IconPlus, IconStore } = useIconos()

    return (
        <>
            <Container
                title={
                    <>
                        <TitlePage title="Almacenes" icon={<IconStore style={{ fontSize: 24 }} />} />
                        <Space>
                            <ButtonPrimary icon={<IconPlus />} onClick={nuevo}>Nuevo</ButtonPrimary>
                            <Searcher onChange={setFilter} wait={false} variant="borderless" />
                        </Space>
                    </>
                }>
                <Listado filter={filter} />
            </Container>
            <Formulario />
            <Loading fullscreen active={procesando} message="procesando, espere..." />
        </>
    )
}
export default AlmacenesPage;
