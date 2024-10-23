import { useData } from "../../../hooks/useData";
import Loading from "../../../components/loading";
import GastosListado from "./listado";
import GastoFormulario from "./formulario";
import { Content } from "antd/es/layout/layout";
import { Button, Col, Flex, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Searcher from "../../../components/searcher";
import { useState } from "react";

const GastosPage = () => {
    const { contextGastos: { state: { procesando }, nuevo } } = useData();
    const [filtro, setFiltro] = useState<string>('');

    return (
        <Content>
            <h1 className="fs-4 fw-bolder mb-4">Relaci&oacute;n de Gastos</h1>
            <Row>
                <Col flex="auto" className="mb-3">
                    <Button
                        type="primary"
                        shape="round"
                        icon={<PlusOutlined />}
                        onClick={nuevo}>
                        Nuevo Gasto
                    </Button>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} className="mb-3">
                    <Flex justify="flex-end">
                        <Searcher onChange={setFiltro} />
                    </Flex>
                </Col>
            </Row>
            <GastosListado filter={filtro}/>
            <GastoFormulario />
            <Loading active={procesando} message="procesando, espere..." />
        </Content>
    )
}
export default GastosPage;
