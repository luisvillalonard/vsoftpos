import { useEffect, useState } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, Radio, Select, Space, Switch, InputNumber, Row, Col, Divider } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containters/form";
import { Cliente } from "../../../interfaces/ventas";
import { EntidadEnum } from "../../../enums/global";

const ClienteFormulario = () => {

    const {
        contextClientes: { state: { modelo }, agregar, actualizar, cancelar },
        contextCondicionesPago: { state: { datos: condiciones, procesando: cargandoCondicionesPago }, todos: cargarCondicionesPago },
        contextComprobantes: { state: { datos: comprobantes, procesando: cargandoComprobantes }, todos: cargarComprobantes },
    } = useData()
    const { entidad, editar, handleChangeInput } = useForm<Cliente | null | undefined>(modelo)
    const [tieneCredito, setTieneCredito] = useState<boolean>(false)

    const guardar = async () => {

        if (!entidad) return;

        let res;
        let esNuevo: boolean = entidad.id && entidad.id > 0 ? false : true;

        if (esNuevo)
            res = await agregar({ ...entidad, credito: tieneCredito ? entidad.credito : null });
        else {
            res = await actualizar({ ...entidad, credito: tieneCredito ? entidad.credito : null });
        }

        if (res.ok) {
            Exito(`Cliente ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del cliente.');
            editar(entidad);
        }

    };

    useEffect(() => {
        editar(modelo);
        if (modelo) {
            setTieneCredito(modelo?.credito ? true : false);
            (async () => {
                await cargarCondicionesPago();
                await cargarComprobantes();
            })()
        }
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formCliente"
            title="Cliente"
            size="large"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                condicionPagoId: entidad.condicionPago?.id,
                comprobanteId: entidad.comprobante?.id,
            }}>
            <Divider orientation="left" className="fs-6" style={{ borderColor: '#7cb305' }}>Generales</Divider>
            <Row gutter={10}>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24} style={{ alignSelf: 'end' }}>
                    <Radio.Group defaultValue={entidad.esEmpresa ? EntidadEnum.Empresa : EntidadEnum.PersonaFisica}>
                        <Radio value={EntidadEnum.Empresa} onClick={() => editar({ ...entidad, esEmpresa: true })}>
                            Empresa
                        </Radio>
                        <Radio value={EntidadEnum.PersonaFisica} onClick={() => editar({ ...entidad, esEmpresa: false })}>
                            Persona F&iacute;sica
                        </Radio>
                    </Radio.Group>
                    {
                        entidad.esEmpresa
                            ?
                            <Form.Item name="rnc" rules={[{ required: entidad.esEmpresa, message: 'Obligatorio' }]}>
                                <Input name="rnc" value={entidad.rnc || ''} onChange={handleChangeInput} />
                            </Form.Item>
                            :
                            <Form.Item name="cedula" rules={[{ required: !entidad.esEmpresa, message: 'Obligatorio' }]}>
                                <Input name="cedula" value={entidad.cedula || ''} onChange={handleChangeInput} />
                            </Form.Item>
                    }
                </Col>
                <Col xs={24}>
                    <Form.Item label="Direcci&oacute;n" name="direccion">
                        <Input name="direccion" value={entidad.direccion || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label="Tel&eacute;fono" name="telefono">
                        <Input name="telefono" value={entidad.telefono || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label="Correo Electr&oacute;nico" name="correo">
                        <Input name="correo" value={entidad.correo || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label="Condici&oacute;n de Pago" name="condicionPagoId">
                        <Select
                            allowClear
                            loading={cargandoCondicionesPago}
                            value={entidad.condicionPago?.id}
                            labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                            options={condiciones.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                            onChange={(value) => editar({ ...entidad, condicionPago: condiciones.filter(item => item.id === value)[0] })}
                            notFoundContent="">
                        </Select>
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label="Comprobante Fiscal" name="comprobanteId">
                        <Select
                            allowClear
                            loading={cargandoComprobantes}
                            value={entidad.comprobante?.id}
                            labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                            options={comprobantes.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                            onChange={(value) => editar({ ...entidad, comprobante: comprobantes.filter(item => item.id === value)[0] })}
                            notFoundContent="">
                        </Select>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item valuePropName="checked">
                        <Space>
                            <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
                            <span>{modelo?.activo ? 'Activo' : 'Inactivo'}</span>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>

            <Divider orientation="left" className="fs-6" style={{ borderColor: '#7cb305' }}>Cr&eacute;dito</Divider>
            <Row>
                <Col md={12} sm={24} xs={24} style={{ alignSelf: 'end' }}>
                    <Form.Item valuePropName="checked">
                        <Space>
                            <Switch checked={tieneCredito} onChange={(checked) => setTieneCredito(checked)} />
                            <span>Este cliente tiene cr&eacute;dito</span>
                        </Space>
                    </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Form.Item label="Monto Crédito RD$">
                        <InputNumber
                            disabled={!tieneCredito}
                            value={entidad.credito?.monto}
                            onChange={(value) => {
                                editar({
                                    ...entidad,
                                    credito: {
                                        id: entidad.credito?.id ?? 0,
                                        clienteId: entidad.id,
                                        monto: value ?? 0,
                                        deuda: entidad.credito?.deuda ?? 0,
                                    }
                                })

                            }} />
                    </Form.Item>
                </Col>
            </Row>
        </FormDrawer>
    )
}
export default ClienteFormulario;
