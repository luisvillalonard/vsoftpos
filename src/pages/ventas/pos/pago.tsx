import { useEffect } from "react"
import { Alert, Avatar, Button, Divider, Drawer, Flex, Form, InputNumber, Select, Space, Tooltip } from "antd"
import { ControlProps } from "../../../interfaces/globales"
import { Alerta, Exito } from "../../../hooks/useMensaje"
import { useFactura } from "../../../hooks/useFactura"
import { IoCheckmark } from "react-icons/io5"
import { FacturaPago } from "../../../interfaces/ventas"
import { useConstants } from "../../../hooks/useConstants"
import { AiOutlineClose } from "react-icons/ai"
import { FormatNumber } from "../../../hooks/useUtils"

const FacturaPanelPago = (props: Pick<ControlProps, "isOpen" | "onCancel">) => {

    const { isOpen, onCancel } = props
    const {
        factura, tiposFacturas, formasPago, secuencias, cargandoComprobantes, errores,
        editar, cargarSecuencias, pagaFactura
    } = useFactura()
    const { Colors } = useConstants()

    const cerrar = () => { onCancel && onCancel(null) }

    const pagarFactura = async () => {

        const pago = await pagaFactura();
        if (!pago && errores.length > 0) {
            Alerta(errores);
        } else if (pago) {
            Exito('Factura generada exitosamente!');
            cerrar();
        }

    }

    useEffect(() => {
        if (isOpen && tiposFacturas && factura) {
            editar({
                ...factura,
                facturaTipo: tiposFacturas.filter(item => item.primaria)[0],
            });
            (async () => {
                await cargarSecuencias();
            })();
        }
    }, [isOpen])

    if (!(isOpen && factura)) {
        return <></>
    }

    return (
        <Drawer
            open={isOpen}
            placement="right"
            getContainer={false}
            closable={false}>
            <Flex
                vertical
                className="h-100">
                <Form
                    name="formPagoFactura"
                    layout="vertical"
                    autoComplete="off"
                    size="large"
                    initialValues={{
                        ...factura,
                        comprobante: factura.comprobante,
                        comprobanteId: factura.comprobante?.id,
                    }}
                    onFinish={pagarFactura}>
                    <Divider orientation="left" className="mb-2" style={{ borderColor: Colors.Bg.Primary }}>Tipo de Factura</Divider>
                    <Space split={<Divider type="vertical" className="mx-1" />}>
                        {
                            tiposFacturas.map((item, index) => {
                                return (
                                    <Button
                                        key={index}
                                        type="text"
                                        icon={
                                            <Avatar
                                                size={20}
                                                style={{ backgroundColor: item.id === factura.facturaTipo?.id ? '#87d068' : '#EEEEEE' }}
                                                icon={<IoCheckmark className="fs-4" />} />
                                        }
                                        onClick={() => {
                                            editar({
                                                ...factura,
                                                facturaTipo: tiposFacturas.filter(tipo => tipo.id === item.id)[0]
                                            })
                                        }}>
                                        {item.descripcion}
                                    </Button>
                                )
                            })
                        }
                    </Space>

                    <Divider orientation="left" className="mt-4 mb-2" style={{ borderColor: Colors.Bg.Primary }}>Comprobante Fiscal</Divider>
                    <Form.Item name="comprobanteId" rules={[{ required: true, message: "Obligatorio" }]}>
                        <Select
                            placeholder="seleccione un comprobante fiscal"
                            loading={cargandoComprobantes}
                            value={factura.comprobante?.id}
                            labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                            options={secuencias.map(item => ({ key: item.comprobante?.id, value: item.comprobante?.id, label: item.comprobante?.nombre }))}
                            onChange={(value) => {
                                editar({
                                    ...factura,
                                    comprobante: secuencias.filter(item => item.comprobante?.id === value)[0]?.comprobante
                                })
                            }}
                            notFoundContent="0 comprobantes">
                        </Select>
                    </Form.Item>

                    <Divider orientation="left" className="mt-4 mb-2" style={{ borderColor: Colors.Bg.Primary }}>Formas de Pago</Divider>
                    <Form.Item style={{ marginBottom: 10}}>
                        <Flex wrap gap={10}>
                            {
                                formasPago.map((item, index) => {
                                    return (
                                        <Space key={index} direction="vertical" size={2}>
                                            <label>{item.nombre}</label>
                                            <InputNumber
                                                defaultValue={0}
                                                onFocus={(evt) => evt.currentTarget.select()}
                                                onChange={(value) => {
                                                    const pago = {
                                                        formaPago: item,
                                                        monto: value ?? 0,
                                                        fecha: factura.fechaEmision
                                                    } as FacturaPago;
                                                    if (factura.pagos.filter(old => old.formaPago?.id === item.id)[0]) {
                                                        editar({
                                                            ...factura,
                                                            pagos: factura.pagos.map(old => old.formaPago?.id === item.id ? pago : old)
                                                        })
                                                    } else {
                                                        editar({
                                                            ...factura,
                                                            pagos: [pago]
                                                        })
                                                    }
                                                }} />
                                        </Space>
                                    )
                                })
                            }
                        </Flex>
                    </Form.Item>
                    {
                        errores.length === 0
                            ? <></>
                            :
                            <Alert
                                showIcon
                                type="warning"
                                style={{ marginTop: 10, marginBottom: 10 }}
                                message={
                                    errores.map((err, index) => <div key={index}>- {err}</div>)
                                } />
                    }
                    <Form.Item style={{ width: '100%' }}>
                        <Flex align="center" style={{ width: '100%' }}>
                            <Tooltip title="Cancelar la factura actual">
                                <Button size="large" type="text" htmlType="button" onClick={cerrar}>
                                    <AiOutlineClose />
                                    Cerrar
                                </Button>
                            </Tooltip>
                            <Button block size="large" type="primary" htmlType="submit" form="formPagoFactura" style={{ fontSize: 22 }}>
                                {
                                    factura && factura.total > 0
                                        ? `Pagar ${FormatNumber(factura.total, 2)}`
                                        : '0.00'
                                }
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Flex>
        </Drawer>
    )
}
export default FacturaPanelPago;
