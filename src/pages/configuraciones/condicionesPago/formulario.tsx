import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, InputNumber, Space, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containters/form";
import { CondicionPago } from "../../../interfaces/configuraciones";

const CondicionPagoFormulario = () => {

    const { contextCondicionesPago: { state: { modelo }, agregar, actualizar, cancelar } } = useData();
    const { entidad, editar, handleChangeInput } = useForm<CondicionPago | null | undefined>(modelo);
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
            Exito(`Condición de pago ${esNuevo ? 'agregada' : 'actualizada'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos de la condición de pago.');
        }

    };

    useEffect(() => {
        editar(modelo)
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formCondicionPago"
            title="Condici&oacute;n de Pago"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Descripci&oacute;n" name="descripcion">
                <TextArea rows={3} name="descripcion" className="not-resize" value={entidad.descripcion || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Plazo de Vencimiento (en d&iacute;as)" name="diasVencimiento" style={{ width: '100% ' }}>
                <InputNumber min={0} value={entidad.diasVencimiento}
                    onChange={(value) => editar({ ...entidad, diasVencimiento: value ?? 0 })} onFocus={(evt) => evt.currentTarget.select()} />
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.aplicaCliente} onChange={(checked) => editar({ ...entidad, aplicaCliente: checked })} />
                    <span>Aplica al cliente</span>
                </Space>
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.aplicaSuplidor} onChange={(checked) => editar({ ...entidad, aplicaSuplidor: checked })} />
                    <span>Aplica al suplidor</span>
                </Space>
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.alContado} onChange={(checked) => editar({ ...entidad, alContado: checked })} />
                    <span>Requiere pago inmediato</span>
                </Space>
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
                    <span>{entidad?.activo ? 'Activo' : 'Inactivo'}</span>
                </Space>
            </Form.Item>
        </FormDrawer>
    )
}
export default CondicionPagoFormulario;
