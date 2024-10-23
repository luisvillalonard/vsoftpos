import FacturasListado from "./listado";
import { Content } from "antd/es/layout/layout";
import { Col, Row } from "antd";
import Searcher from "../../../components/searcher";
import { useState } from "react";

const FacturasPage = () => {
    const [filtro, setFiltro] = useState<string>('');

    return (
        <Content>
            <h1 className="fs-4 fw-bolder mb-4">Facturas</h1>
            <Row>
                <Col span={8} offset={16} className="mb-3">
                    <Searcher onChange={setFiltro} />
                </Col>
            </Row>
            <FacturasListado filter={filtro}/>
        </Content>
    )
}
export default FacturasPage;
