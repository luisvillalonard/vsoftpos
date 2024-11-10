import { useEffect } from "react"
import { Flex, Select, Spin } from "antd"
import type { SelectProps } from 'antd'
import { useData } from "../../../hooks/useData"
import { useFactura } from "../../../hooks/useFactura"
import PanelPos from "../../../components/containers/panelPos"

type LabelRender = SelectProps['labelRender'];

const FacturaCliente = () => {

    const { contextClientes: { state: { datos: clientes, procesando }, todos } } = useData()
    const { factura, editar } = useFactura()

    const labelRender: LabelRender = (props) => {
        const { value } = props;

        if (value) {
            const cliente = clientes.filter(item => item.id === value)[0];
            if (cliente) {
                return <div>{cliente.nombre}</div>;
            }
        }
        return <div>N/A</div>;
    }

    useEffect(() => { todos() }, [])

    return (
        <PanelPos title="Cliente">
            <Select
                allowClear
                showSearch
                optionFilterProp="label"
                variant="borderless"
                placeholder="Seleccione un cliente"
                loading={procesando}
                value={factura?.cliente?.id}
                labelRender={labelRender}
                options={
                    clientes.map(item => ({
                        key: item.id,
                        value: item.id,
                        label: <>
                            <Flex vertical>
                                {item.nombre}
                                {
                                    item.telefono
                                        ? <div>{item.telefono}</div>
                                        : item.correo
                                            ? <div>{item.correo}</div>
                                            : <></>
                                }
                            </Flex>
                        </>
                    }))
                }
                onChange={(value) => {
                    if (factura) {
                        editar({
                            ...factura,
                            cliente: clientes.filter(item => item.id === value)[0]
                        })
                    }
                }}
                notFoundContent={procesando ? <Spin size="small" /> : null}
                style={{ width: '100%' }}>
            </Select>
        </PanelPos>
    )
}
export default FacturaCliente;

/*
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
*/