import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Form, Input, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containters/form";
import { FacturaTipo } from "../../../interfaces/configuraciones";

const FacturaTipoFormulario = () => {
    const { contextFacturasTipos: { state: { modelo }, agregar, actualizar, cancelar } } = useData();
    const { entidad, editar, handleChangeInput } = useForm<FacturaTipo | null | undefined>(modelo);

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
            Exito(`Tipo de factura ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del tipo de factura.');
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
            name="formFacturaTipo"
            title="Tipo de Factura"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="Descripci&oacute;n" name="descripcion">
                <Input name="descripcion" value={entidad.descripcion || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Por defecto" valuePropName="checked">
                <Switch checked={entidad.primaria} onChange={(checked) => editar({ ...entidad, primaria: checked })} />
            </Form.Item>
            <Form.Item label="Require un Monto" valuePropName="checked">
                <Switch checked={entidad.requiereMonto} onChange={(checked) => editar({ ...entidad, requiereMonto: checked })} />
            </Form.Item>
        </FormDrawer>
    )
}
export default FacturaTipoFormulario;
