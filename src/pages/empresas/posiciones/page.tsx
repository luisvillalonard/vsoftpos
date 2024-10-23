import { useState } from "react";
import { useData } from "../../../hooks/useData";
import Loading from "../../../components/loading";
import PosicionesListado from "./listado";
import PosicionFormulario from "./formulario";
import { Content } from "antd/es/layout/layout";
import { Button, Col, Flex, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Searcher from "../../../components/searcher";

const PosicionesPage = () => {

    const { contextPosiciones: { state: { procesando }, nuevo }} = useData();
    const [filtro, setFiltro] = useState<string>('');

    return (
        <Content>
            <h1 className="fs-4 fw-bolder mb-4">Posiciones</h1>
            <Row>
                <Col flex="auto" className="mb-3">
                    <Button
                        type="primary"
                        shape="round"
                        icon={<PlusOutlined />}
                        onClick={nuevo}>
                        Nueva Posici&oacute;n
                    </Button>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} className="mb-3">
                    <Flex justify="flex-end">
                        <Searcher onChange={setFiltro} />
                    </Flex>
                </Col>
            </Row>
            <PosicionesListado filter={filtro} />
            <PosicionFormulario />
            <Loading active={procesando} message="procesando, espere..." />
        </Content>
    )
}
export default PosicionesPage;
