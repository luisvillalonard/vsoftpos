import { useState } from "react";
import { useData } from "../../../hooks/useData";
import CatalogoCcListado from "./listado";
import CatalogoCcFormulario from "./formulario";
import { Content } from "antd/es/layout/layout";
import { Button, Col, Flex, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Searcher from "../../../components/searcher";

const CuentasContablesPage = () => {
    const { contextCatalogoCc: { nuevo } } = useData();
    const [filtro, setFiltro] = useState<string>('');

    return (
        <Content>
            <h1 className="fs-4 fw-bolder mb-4">Cat&aacute;talogo de Cuentas Contable</h1>
            <Row>
                <Col flex="auto" className="mb-3">
                    <Button
                        type="primary"
                        shape="round"
                        icon={<PlusOutlined />}
                        onClick={nuevo}>
                        Nueva Cuenta
                    </Button>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} className="mb-3">
                    <Flex justify="flex-end">
                        <Searcher onChange={setFiltro} />
                    </Flex>
                </Col>
            </Row>
            <CatalogoCcListado filter={filtro}/>
            <CatalogoCcFormulario />
        </Content>
    )
}
export default CuentasContablesPage;
