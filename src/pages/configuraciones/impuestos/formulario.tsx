import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, InputNumber, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";
import { Impuesto } from "../../../interfaces/contabilidad";

const ImpuestoFormulario = () => {
    const { contextImpuestos: { state: { modelo, procesando }, agregar, actualizar, cancelar } } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Impuesto | null | undefined>(modelo);

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
            Exito(`Impuesto ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del impuesto.');
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
            name="formImpuesto"
            title="Impuesto"
            placement="right"
            vertical
            open={true}
            loading={procesando}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="C&oacute;digo" name="codigo" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="codigo" value={entidad.codigo || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Tasa" name="tasa" style={{ width: '100% ' }}>
                <InputNumber 
                    value={entidad.tasa} 
                    min={0}
                    onChange={(value) => editar({ ...entidad, tasa: value ?? 0 })} 
                    onFocus={(evt) => evt.currentTarget.select()} />
            </Form.Item>
            <Form.Item label={modelo?.activo ? 'Activo' : 'Inactivo'} valuePropName="checked">
                <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
            </Form.Item>
        </FormDrawer>
    )
}
export default ImpuestoFormulario;
