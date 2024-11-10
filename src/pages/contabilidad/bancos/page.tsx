import { Space } from "antd"
import { useState } from "react";
import { useData } from "../../../hooks/useData"
import Listado from "./listado"
import Formulario from "./formulario"
import { useComponents } from "../../../components"
import { useIconos } from "../../../hooks/useIconos"
import Container from "../../../components/containers/container"
import Loading from "../../../components/containers/loading";

const BancosPage = () => {

    const { contextBancos: { state: { procesando }, nuevo } } = useData()
    const [filter, setFilter] = useState<string>('')
    const { ButtonPrimary, Searcher, TitlePage } = useComponents()
    const { IconPlus, IconBank } = useIconos()

    return (
        <>
            <Container
                title={
                    <>
                        <Space>
                            <TitlePage title="Bancos" icon={<IconBank style={{ fontSize: 24 }} />} />
                            <ButtonPrimary icon={<IconPlus />} onClick={nuevo}>Nuevo</ButtonPrimary>
                        </Space>
                        <Space>
                            <Searcher onChange={setFilter} wait={false} variant="borderless" />
                        </Space>
                    </>
                }>
                <Listado filter={filter}/>
            </Container>
            <Formulario />
            <Loading fullscreen active={procesando} message="procesando, espere..." />
        </>
    )
}
export default BancosPage;
