import { Col, Flex, Row } from "antd"
import PosCliente from "./data"
import ClienteEstado from "./state"
import { useFactura } from "../../../../hooks/useFactura"
import { ControlProps } from "../../../../interfaces/globales"

const FacturaCliente = (props: Pick<ControlProps, "onClick">) => {

    const { onClick } = props
    const { factura } = useFactura()

    return (
        <Flex style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Row gutter={8} align="middle">
                <Col flex="none" style={{ alignSelf: 'center' }}>
                    <ClienteEstado active={factura?.cliente !== null} />
                </Col>
                <Col flex="auto">
                    <PosCliente item={factura?.cliente} onClick={onClick} />
                </Col>
            </Row>
        </Flex>
    )
}
export default FacturaCliente;
