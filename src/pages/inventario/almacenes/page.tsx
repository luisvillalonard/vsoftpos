import { useData } from "../../../hooks/useData";
import Loading from "../../../components/loading";
import AlmacenesListado from "./listado";
import AlmacenFormulario from "./formulario";
import { Content } from "antd/es/layout/layout";
import { Button, Col, Flex, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Searcher from "../../../components/searcher";
import { useState } from "react";

const AlmacenesPage = () => {

    const { contextAlmacenes: { state: { procesando }, nuevo } } = useData();
    const [filtro, setFiltro] = useState<string>('');

    return (
        <Content>
            <h1 className="fs-4 fw-bolder mb-4">Almacenes</h1>
            <Row>
                <Col flex="auto" className="mb-3">
                    <Button
                        type="primary"
                        shape="round"
                        icon={<PlusOutlined />}
                        onClick={nuevo}>
                        Nuevo Almac&eacute;n
                    </Button>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} className="mb-3">
                    <Flex justify="flex-end">
                        <Searcher onChange={setFiltro} />
                    </Flex>
                </Col>
            </Row>
            <AlmacenesListado filter={filtro}/>
            <AlmacenFormulario />
            <Loading active={procesando} message="procesando, espere..." />
        </Content>
    )
}
export default AlmacenesPage;
