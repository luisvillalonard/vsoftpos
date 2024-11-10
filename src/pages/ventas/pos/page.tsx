import { useEffect, useState } from 'react'
import { Col, Flex, Row } from 'antd'
import Productos from './productos'
import Factura from './factura'
import { useLocation } from 'react-router-dom'
import { useData } from '../../../hooks/useData'
import FacturaPanelPago from './pago'
import { relative } from 'path'

const PosPage = () => {
    const { contextFacturas: { nuevo } } = useData()
    const [verPago, setVerPago] = useState<boolean>(false)
    const url = useLocation()

    useEffect(() => { nuevo() }, [url.pathname])

    return (
        <Flex style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Row style={{ width: '100%', height: '100%' }}>
                <Col xs={16} lg={16} md={14} style={{ position: 'relative' }}>
                    <Productos />
                    <FacturaPanelPago isOpen={verPago} onCancel={() => setVerPago(false)} />
                </Col>
                <Col xs={8} lg={8} md={10}>
                    <Factura onClick={setVerPago} />
                </Col>
            </Row>
        </Flex>
    )
}
export default PosPage;
