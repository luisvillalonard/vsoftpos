import { useEffect, useState } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, Radio, Select, Space, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";
import { Suplidor } from "../../../interfaces/compras";

const SuplidorFormulario = () => {
    const {
        contextSuplidores: { state: { modelo }, agregar, actualizar, cancelar },
        contextCondicionesPago: { state: { datos: condiciones, procesando: cargandoCondicionesPago }, todos: cargarCondicionesPago }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Suplidor | null | undefined>(modelo);
    const [tipo, setTipo] = useState<number>(1);
    const { TextArea } = Input;

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
            Exito(`Suplidor ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del suplidor.');
            editar(entidad);
        }

    };

    useEffect(() => {
        editar(modelo);
        (async () => {
            await cargarCondicionesPago();
        })()
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formSuplidor"
            title="Suplidor"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                condicionPagoId: entidad.condicionPago?.id
            }}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Radio.Group defaultValue={1}>
                <Radio value={1} onClick={() => setTipo(1)}>Empresa</Radio>
                <Radio value={2} onClick={() => setTipo(2)}>Persona F&iacute;sica</Radio>
            </Radio.Group>
            {
                tipo === 1
                    ?
                    <Form.Item name="rnc" rules={[{ required: tipo === 1, message: 'Obligatorio' }]}>
                        <Input name="rnc" value={entidad.rnc || ''} onChange={handleChangeInput} />
                    </Form.Item>
                    :
                    <Form.Item name="cedula" rules={[{ required: tipo === 2, message: 'Obligatorio' }]}>
                        <Input name="cedula" value={entidad.cedula || ''} onChange={handleChangeInput} />
                    </Form.Item>
            }
            <Form.Item label="Direcci&oacute;n" name="direccion">
                <TextArea rows={3} className="no-resize" name="direccion" value={entidad.direccion || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Tel&eacute;fono" name="telefono">
                <Input name="telefono" value={entidad.telefono || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Correo Electr&oacute;nico" name="correo">
                <Input name="correo" value={entidad.correo || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.informal} onChange={(checked) => editar({ ...entidad, informal: checked })} />
                    <span>Es un suplidor informal</span>
                </Space>
            </Form.Item>
            <Form.Item label="Condici&oacute;n de Pago" name="condicionPagoId">
                <Select
                    allowClear
                    loading={cargandoCondicionesPago}
                    value={entidad.condicionPago?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={condiciones.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value) => editar({ ...entidad, condicionPago: condiciones.filter(item => item.id === value)[0] })}>
                </Select>
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.credito} onChange={(checked) => editar({ ...entidad, credito: checked })} />
                    <span>Tiene cr&eacute;dito</span>
                </Space>
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
                    <span>{modelo?.activo ? 'Activo' : 'Inactivo'}</span>
                </Space>
            </Form.Item>
        </FormDrawer>
    )
}
export default SuplidorFormulario;
