import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Col, Form, Input, InputNumber, Row, Select, Space, Switch, Tabs } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";
import { Producto } from "../../../interfaces/inventario";

const ProductoFormulario = () => {

    const {
        contextProductos: { state: { modelo }, agregar, actualizar, cancelar },
        contextGrupos: { state: { datos: grupos, procesando: cargandoGrupos }, todos: cargarGrupos },
        contextImpuestos: { state: { datos: impuestos, procesando: cargandoImpuestos }, todos: cargarImpuestos },
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Producto | null | undefined>(modelo);

    const guardar = async () => {

        if (!entidad) {
            return;
        }

        let res;
        let esNuevo: boolean = entidad.id && entidad.id > 0 ? false : true;

        if (esNuevo)
            res = await agregar(entidad);
        else {
            res = await actualizar(entidad);
        }

        if (res.ok) {
            Exito(`Producto ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del producto.');
        }

    };

    useEffect(() => {
        editar(modelo);
        if (modelo) {
            (async () => {
                await cargarGrupos();
                await cargarImpuestos();
            })()
        }
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formProducto"
            title="Producto"
            placement="right"
            size="large"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                grupoId: entidad.grupo?.id,
                suplidorId: entidad.suplidor?.id,
                impuestoId: entidad.impuesto?.id,
            }}>
            <Row gutter={10}>
                <Col flex="none">
                    <Form.Item valuePropName="checked">
                        <Space>
                            <Switch checked={entidad.esProducto} onChange={() => editar({ ...entidad, esProducto: true })} />
                            <span>Producto</span>
                        </Space>
                    </Form.Item>
                </Col>
                <Col flex="none">
                    <Form.Item valuePropName="checked">
                        <Space>
                            <Switch checked={!entidad.esProducto} onChange={() => editar({ ...entidad, esProducto: false })} />
                            <span>Servicio</span>
                        </Space>
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item label="Descripci&oacute;n" name="descripcion" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="descripcion" value={entidad.descripcion || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col md={12} sm={12} xs={24}>
                    <Form.Item label="C&oacute;digo" name="codigo" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="codigo" value={entidad.codigo || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col md={12} sm={12} xs={24}>
                    <Form.Item label="C&oacute;digo Barra" name="codigoBarra" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="codigoBarra" value={entidad.codigoBarra || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
                    <span>{modelo?.activo ? 'Activo' : 'Inactivo'}</span>
                </Space>
            </Form.Item>
            <Tabs defaultActiveKey="1" items={[
                {
                    key: '1',
                    label: 'Generales',
                    children: <>
                        <Row gutter={10}>
                            <Col flex="none">
                                <Form.Item valuePropName="checked">
                                    <Space>
                                        <Switch checked={entidad.especifico} onChange={(checked) => editar({ ...entidad, especifico: checked })} />
                                        <span>Especifico</span>
                                    </Space>
                                </Form.Item>
                            </Col>
                            <Col flex="none">
                                <Form.Item valuePropName="checked">
                                    <Space>
                                        <Switch checked={entidad.detallable} onChange={(checked) => editar({ ...entidad, detallable: checked })} />
                                        <span>Es detallable</span>
                                    </Space>
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item label="Grupo" name="grupoId" rules={[{ required: true, message: 'Obligatorio' }]}>
                                    <Select
                                        loading={cargandoGrupos}
                                        value={entidad.grupo?.id}
                                        labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                                        options={grupos.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                                        onChange={value => editar({ ...entidad, grupo: grupos.filter(item => item.id === value)[0] })}>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col md={4} sm={4} xs={24} style={{ alignContent: 'end' }}>
                                <Form.Item label="Se vende" valuePropName="checked">
                                    <Switch checked={entidad.seVende} onChange={(checked) => editar({ ...entidad, seVende: checked })} />
                                </Form.Item>
                            </Col>
                            <Col md={20} sm={20} xs={24}>
                                <Form.Item label="Categor&iacute;a 606" name="categoria606">
                                    <Select
                                        loading={cargandoGrupos}
                                        value={entidad.categoria606}
                                        labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                                        options={grupos.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                                        onChange={value => editar({ ...entidad, grupo: grupos.filter(item => item.id === value)[0] })}>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col flex="none" xs={24} style={{ alignContent: 'end' }}>
                                <Form.Item label="Se compra" valuePropName="checked">
                                    <Switch checked={entidad.seCompra} onChange={(checked) => editar({ ...entidad, seCompra: checked })} />
                                </Form.Item>
                            </Col>
                            <Col flex="auto" xs={24}>
                                <Form.Item label="Categor&iacute;a 607" name="categoria607">
                                    <Select
                                        loading={cargandoGrupos}
                                        value={entidad.categoria607}
                                        labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                                        options={grupos.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                                        onChange={value => editar({ ...entidad, grupo: grupos.filter(item => item.id === value)[0] })}>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>,
                },
                {
                    key: '2',
                    label: 'Inventario',
                    children: <>
                        <Row gutter={10}>
                            <Col xs={24}>
                                <Form.Item label="Impuesto" name="impuestoId">
                                    <Select
                                        loading={cargandoImpuestos}
                                        value={entidad.impuesto?.id}
                                        labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                                        options={impuestos.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                                        onChange={value => editar({ ...entidad, impuesto: impuestos.filter(item => item.id === value)[0] })}>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={8} xs={24}>
                                <Form.Item label="Costo RD$" name="costo" rules={[{ required: true, message: 'Obligatorio' }]}>
                                    <InputNumber min={1} value={entidad.costo} style={{ width: '100%' }}
                                        onChange={value => editar({ ...entidad, costo: value ?? 0 })}
                                        onFocus={(evt) => evt.currentTarget.select()} />
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={8} xs={24}>
                                <Form.Item label="Precio RD$" name="precio" rules={[{ required: true, message: 'Obligatorio' }]}>
                                    <InputNumber min={1} value={entidad.precio} style={{ width: '100%' }}
                                        onChange={value => editar({ ...entidad, precio: value ?? 0 })}
                                        onFocus={(evt) => evt.currentTarget.select()} />
                                </Form.Item>
                            </Col>
                            <Col md={8} sm={8} xs={24}>
                                <Form.Item label="Reorden" name="reorden">
                                    <InputNumber value={entidad.reorden} style={{ width: '100%' }}
                                        onChange={value => editar({ ...entidad, reorden: value ?? 0 })}
                                        onFocus={(evt) => evt.currentTarget.select()} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>,
                },
                {
                    key: '3',
                    label: 'Contabilidad',
                    children: <>
                        <Form.Item label="Cuenta Contable de Costo" name="costoCc">
                            <Select
                                loading={cargandoImpuestos}
                                value={entidad.impuesto?.id}
                                labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                                options={impuestos.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                                onChange={value => editar({ ...entidad, impuesto: impuestos.filter(item => item.id === value)[0] })}>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Cuenta Contable de Venta" name="ventaCc">
                            <Select
                                loading={cargandoImpuestos}
                                value={entidad.impuesto?.id}
                                labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                                options={impuestos.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                                onChange={value => editar({ ...entidad, impuesto: impuestos.filter(item => item.id === value)[0] })}>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Cuenta Contable de Descuento" name="descuentoCc">
                            <Select
                                loading={cargandoImpuestos}
                                value={entidad.impuesto?.id}
                                labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                                options={impuestos.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                                onChange={value => editar({ ...entidad, impuesto: impuestos.filter(item => item.id === value)[0] })}>
                            </Select>
                        </Form.Item>
                    </>,
                }
            ]} />
        </FormDrawer>
    )
}
export default ProductoFormulario;
