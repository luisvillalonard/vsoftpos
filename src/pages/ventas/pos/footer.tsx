import { useEffect, useRef, useState } from "react"
import { Button, Divider, Flex, Input, Space } from "antd"
import type { InputRef } from 'antd'
import { FormatNumber } from "../../../hooks/useUtils"
import { useData } from "../../../hooks/useData"
import { ControlProps } from "../../../interfaces/globales"
import { useIconos } from "../../../hooks/useIconos"
import PanelPos from "../../../components/containers/panelPos"

const FooterFactura = (props: Pick<ControlProps, "onClick">) => {

    const { onClick } = props
    const { contextFacturas: { state: { modelo: factura }, editar } } = useData()
    const [verDescuento, setVerDescuento] = useState<boolean>(false)
    const { IconEdit } = useIconos()
    const inputRef = useRef<InputRef>(null);

    const habilPagar: boolean = !(factura && factura.cliente && factura.items && factura.items.length > 0 && factura.total > 0)

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus({ cursor: 'all' })
        }
    }, [inputRef])

    return (
        <PanelPos style={{ padding: 0 }}>
            <Flex justify="space-between" style={{ width: '100%', paddingLeft: 8, paddingRight: 8 }}>
                <span>SubTotal</span>
                <span>{FormatNumber(factura?.subTotal ?? 0, 2)}</span>
            </Flex>
            <Divider dashed style={{ marginTop: 3, marginBottom: 3 }} />
            <Flex justify="space-between" style={{ width: '100%', paddingLeft: 8, paddingRight: 8 }}>
                <span>Itbis</span>
                <span>{FormatNumber(factura?.itbis ?? 0, 2)}</span>
            </Flex>
            <Divider dashed style={{ marginTop: 3, marginBottom: 3 }} />
            <Flex justify="space-between" style={{ width: '100%', paddingLeft: 8, paddingRight: 8, marginBottom: 5 }}>
                <span>Descuento</span>
                {
                    !verDescuento
                        ?
                        <Space>
                            <Button size="small" type="text" shape="circle" icon={<IconEdit />} onClick={() => setVerDescuento(true)} />
                            <span>{FormatNumber(factura?.descuento, 2)}</span>
                        </Space>
                        :
                        <div>
                            <Input
                                ref={inputRef}
                                type="number"
                                size="small"
                                variant="borderless"
                                min={0}
                                value={factura?.descuento}
                                style={{ textAlign: 'end' }}
                                onFocus={(evt) => evt.currentTarget.select()}
                                onBlur={() => setVerDescuento(false)}
                                onKeyUp={(evt) => {
                                    if (evt.key === 'Enter') {
                                        setVerDescuento(false)
                                    }
                                }}
                                onChange={(evt) => {
                                    if (factura) {
                                        editar({
                                            ...factura,
                                            descuento: evt.target.valueAsNumber,
                                            total: Number(((factura.subTotal + factura.itbis) - Number(evt.target.valueAsNumber.toFixed(2))).toFixed(2))
                                        })
                                    }
                                }} />
                        </div>
                }

            </Flex>
            <Divider dashed style={{ marginTop: 3, marginBottom: 3 }} />
            <Flex justify="space-between" style={{ width: '100%', paddingLeft: 8, paddingRight: 8, marginBottom: 3, fontSize: 16 }}>
                <span className="fw-bold">Total</span>
                <span className="fw-bold">{FormatNumber(factura?.total ?? 0, 2)}</span>
            </Flex>
            <Button
                block
                size="large"
                type="primary"
                className="fs-4"
                disabled={habilPagar}
                onClick={onClick}>
                Pagar
            </Button>
        </PanelPos>
    )
}
export default FooterFactura;
