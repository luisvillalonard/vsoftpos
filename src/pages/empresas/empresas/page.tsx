import { useData } from "../../../hooks/useData";
import Loading from "../../../components/loading";
import EmpresasListado from "./listado";
import EmpresaFormulario from "./formulario";
import { Content } from "antd/es/layout/layout";
import { Button, Col, Flex, Row } from "antd";
import Searcher from "../../../components/searcher";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const EmpresasPage = () => {
    const { contextEmpresas: { state: { procesando }, nuevo } } = useData();
    const [filtro, setFiltro] = useState<string>('');

    return (
        <Content>
            <h1 className="fs-4 fw-bolder mb-4">Empresas</h1>
            <Row>
                <Col flex="auto" className="mb-3">
                    <Button type="primary" shape="round" icon={<PlusOutlined />}
                        onClick={nuevo}>
                        Nueva Empresa
                    </Button>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} className="mb-3">
                    <Flex justify="flex-end">
                        <Searcher onChange={setFiltro} />
                    </Flex>
                </Col>
            </Row >
            <EmpresasListado filter={filtro} />
            <EmpresaFormulario />
            <Loading active={procesando} message="procesando, espere..." />
        </Content>
    )
}
export default EmpresasPage;
