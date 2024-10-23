import { useEffect } from 'react'
import { Col, Flex, Row, theme } from 'antd'
import Productos from './productos'
import Factura from './factura'
import { useLocation } from 'react-router-dom'
import { useData } from '../../../hooks/useData'

const PosPage = () => {
    const { contextFacturas: { nuevo } } = useData()
    const { token: { colorBgContainer } } = theme.useToken()
    const url = useLocation()

    useEffect(() => { nuevo() }, [url.pathname])

    return (
        <Flex vertical className='h-100'>
            <Row wrap={false} className='h-100'>
                <Col lg={16} md={14}>
                    <Productos />
                </Col>
                <Col lg={8} md={10} style={{ backgroundColor: colorBgContainer }}>
                    <Factura />
                </Col>
            </Row>
        </Flex>
    )
}
export default PosPage;
