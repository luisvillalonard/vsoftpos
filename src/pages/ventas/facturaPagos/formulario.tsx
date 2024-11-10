import { useEffect, useState } from "react"
import { Button, Col, Divider, Flex, InputNumber, Modal, Row, Space } from "antd"
import { useData } from "../../../hooks/useData"
import { Alerta, Exito } from "../../../hooks/useMensaje"
import { Factura, FacturaPago } from "../../../interfaces/ventas"
import { ControlProps } from "../../../interfaces/globales"
import { FormatDate_DDMMYYYY, FormatNumber } from "../../../hooks/useUtils"
import { useConstants } from "../../../hooks/useConstants"

const FacturaPagoFormulario = (props: Pick<ControlProps, "item" | "onCancel">) => {

    const { item, onCancel } = props
    const {
        contextFacturas: { pago },
        contextFormasPago: { state: { datos: formasPago, procesando: cargandoFormasPago }, todos: cargarFormasPago },
    } = useData()
    const { Colors } = useConstants()
    const [factura, setFactura] = useState<Factura | null>(null)
    const [pagos, setPagos] = useState<FacturaPago[]>([])

    const montoPago = (): number => {
        return pagos.reduce((acc: number, item: FacturaPago) => {
            return acc += item.monto;
        }, 0.00)
    }

    const guardar = async () => {

        if (!factura && pagos.length === 0) return;

        const resp = await pago(pagos);
        if (resp.ok) {

            const montoPagado = montoPago();
            const montoPendiente = factura?.total! - factura?.pagado!;

            let devuelto = 0.00;
            if (montoPagado > montoPendiente) {
                devuelto = montoPagado - montoPendiente;
                Exito(`Pago a factura realizado exitosamente!. Monto a devolver de: ${FormatNumber(devuelto, 2)}`);
            } else {
                Exito('Pago a factura realizado exitosamente!');
            }            
            setFactura(null);

        } else {
            Alerta(resp.mensaje || 'No fue posible realizar el pago de la factura.');
        }

    };

    useEffect(() => {
        setFactura(item);
        if (item) {
            (async () => { await cargarFormasPago() })()
        }
    }, [item])

    if (!factura) {
        return <></>
    }

    return (
        <Modal
            title={<h4 style={{ fontWeight: 100 }}>Pago a Factura</h4>}
            centered
            closable={false}
            open={true}
            onClose={onCancel}
            footer={
                <Space>
                    <Button size="large" type="text" htmlType="button" onClick={onCancel}>
                        Cerrar
                    </Button>
                    <Button size="large" type="primary" onClick={guardar}>
                        {`Pagar ${FormatNumber(pagos.reduce((acc: number, item: FacturaPago) => {
                            return acc += item.monto;
                        }, 0.00), 2)}`}
                    </Button>
                </Space>
            }>
            <Divider orientation="left" style={{ borderColor: Colors.Bg.Primary, marginBottom: 4 }}>Generales Factura</Divider>
            <Row gutter={[8, 5]}>
                <Col md={6} style={{ fontWeight: 'bold', opacity: 0.8 }}>Cliente</Col>
                <Col md={18}>{factura?.cliente?.nombre}</Col>

                <Col md={6} style={{ fontWeight: 'bold', opacity: 0.8 }}>N&uacute;mero</Col>
                <Col md={18}>{factura.numero.toString().padStart(8, '0')}</Col>

                <Col md={6} style={{ fontWeight: 'bold', opacity: 0.8 }}>Fecha Emisi&oacute;n</Col>
                <Col md={18}>{FormatDate_DDMMYYYY(factura.fechaEmision)}</Col>

                <Col md={6} style={{ fontWeight: 'bold', opacity: 0.8 }}>Total RD$</Col>
                <Col md={18}>{FormatNumber(factura.total, 2)}</Col>

                <Col md={6} style={{ fontWeight: 'bold', opacity: 0.8 }}>Pendiente RD$</Col>
                <Col md={18} style={{ fontWeight: 'bold', color: Colors.Font.Danger }}>{FormatNumber(factura.total - factura.pagado, 2)}</Col>
            </Row>

            <Divider orientation="left" style={{ borderColor: Colors.Bg.Primary, marginTop: 18, marginBottom: 4 }}>Formas de Pago</Divider>
            <Flex wrap gap={10}>
                {
                    cargandoFormasPago
                        ? <></>
                        :
                        formasPago.map((formaPago, index) => {
                            return (
                                <Space key={index} direction="vertical" size={2}>
                                    <label>{formaPago.nombre}</label>
                                    <InputNumber
                                        size="large"
                                        defaultValue={0}
                                        onFocus={(evt) => evt.currentTarget.select()}
                                        onChange={(value) => {
                                            const pago = {
                                                facturaId: factura.id,
                                                formaPago: formaPago,
                                                monto: value ?? 0,
                                                fecha: new Date().toISOString().slice(0, 10),
                                            } as FacturaPago;

                                            if (pagos.filter(old => old.formaPago?.id === formaPago.id)[0]) {
                                                setPagos(pagos.map(old => old.formaPago?.id === formaPago.id ? pago : old))
                                            } else {
                                                setPagos([...pagos, pago])
                                            }
                                        }} />
                                </Space>
                            )
                        })
                }
            </Flex>
        </Modal>
    )
}
export default FacturaPagoFormulario;
