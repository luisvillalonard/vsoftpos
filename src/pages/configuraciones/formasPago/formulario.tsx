import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";
import { FormaPago } from "../../../interfaces/configuraciones";

const FormaPagoFormulario = () => {
    const { contextFormasPago: { state: { modelo }, agregar, actualizar, cancelar } } = useData();
    const { entidad, editar, handleChangeInput } = useForm<FormaPago | null | undefined>(modelo);
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
            Exito(`Forma de pago ${esNuevo ? 'agregada' : 'actualizada'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos de la forma de pago.');
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
            name="formFormaPago"
            title="Forma de Pago"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="Nombre" name="nombre">
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Descripci&oacute;n" name="descripcion" rules={[{ required: true, message: 'Obligatorio' }]}>
                <TextArea rows={3} name="descripcion" className="not-resize" value={entidad.descripcion || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Por defecto" valuePropName="checked">
                <Switch checked={entidad.primaria} onChange={(checked) => editar({ ...entidad, primaria: checked })} />
            </Form.Item>
            <Form.Item label="Aplica en Factura" valuePropName="checked">
                <Switch checked={entidad.aplicaEnFactura} onChange={(checked) => editar({ ...entidad, aplicaEnFactura: checked })} />
            </Form.Item>
            <Form.Item label="Aplica en Cuadre" valuePropName="checked">
                <Switch checked={entidad.aplicaEnCuadre} onChange={(checked) => editar({ ...entidad, aplicaEnCuadre: checked })} />
            </Form.Item>
            <Form.Item label="Require un n&uacute;mero o c&oacute;digo de referencia" valuePropName="checked">
                <Switch checked={entidad.referencia} onChange={(checked) => editar({ ...entidad, referencia: checked })} />
            </Form.Item>
            <Form.Item label={entidad?.activa ? 'Activa' : 'Inactiva'} valuePropName="checked">
                <Switch checked={entidad.activa} onChange={(checked) => editar({ ...entidad, activa: checked })} />
            </Form.Item>
        </FormDrawer>
    )
}
export default FormaPagoFormulario;
