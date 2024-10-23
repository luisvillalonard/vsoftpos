import { useData } from "../../../hooks/useData";
import Loading from "../../../components/loading";
import Listado from "./listado";
import Formulario from "./formulario";
import { Content } from "antd/es/layout/layout";
import { Button, Flex, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Searcher from "../../../components/searcher";
import { useState } from "react";
import TitlePage from "../../../components/titlePage";
import Container from "../../../components/containters/container";

const HorariosPage = () => {
    const { contextHorarios: { state: { procesando }, nuevo } } = useData();
    const [filtro, setFiltro] = useState<string>('');

    return (
        <Content>
            <TitlePage title="Horarios Laborales" />
            <Container style={{ marginBottom: 14 }}>
                <Flex justify="space-between">
                    <Space>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<PlusOutlined />}
                            onClick={nuevo}>
                            Nuevo Horario
                        </Button>
                    </Space>
                    <Space>
                        <Searcher onChange={setFiltro} wait={false} />
                    </Space>
                </Flex>
            </Container>
            <Listado filter={filtro} />
            <Formulario />
            <Loading active={procesando} message="procesando, espere..." />
        </Content>
    )
}
export default HorariosPage;
