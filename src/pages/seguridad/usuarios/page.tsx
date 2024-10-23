import { useState } from "react";
import { useData } from "../../../hooks/useData";
import Listado from "./listado";
import Formulario from "./formulario";
import Loading from "../../../components/loading";
import { Content } from "antd/es/layout/layout";
import { Button, Col, Flex, Row } from "antd";
import Searcher from "../../../components/searcher";
import { PlusOutlined } from "@ant-design/icons";

const UsuariosPage = () => {

    const { contextUsuarios: { state: { modelo, procesando }, nuevo } } = useData();
    const [filtro, setFiltro] = useState<string>('');

    return (
        <Content>
            <h1 className="fs-4 fw-bolder mb-4">Usuarios</h1>
            <Row>
                <Col flex="auto" className="mb-3">
                    <Button type="primary" shape="round" icon={<PlusOutlined />}
                        onClick={nuevo}>
                        Nuevo Usuario
                    </Button>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} className="mb-3">
                    <Flex justify="flex-end">
                        <Searcher onChange={setFiltro} />
                    </Flex>
                </Col>
            </Row >
            <Listado filter={filtro} />
            {!modelo ? <></> : <Formulario />}
            <Loading Visible={procesando} Mensaje="procesando, espere..." />
        </Content>
    )
}
export default UsuariosPage;
