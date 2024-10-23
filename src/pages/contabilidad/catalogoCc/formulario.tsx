import { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { CatalogoCc } from "../../../interfaces/contabilidad";
import { Card, Form, Input, InputNumber } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containters/form";

const BancoFormulario = () => {
    const { contextCatalogoCc: { state: { modelo }, agregar, actualizar, cancelar } } = useData();
    const { entidad, editar, handleChangeInput } = useForm<CatalogoCc | null | undefined>(modelo);

    const generarCodigo = () => {
        if (entidad) {
            editar({
                ...entidad,
                codigo: [entidad?.grupo, entidad?.nivel1, entidad?.nivel2, entidad?.nivel3].filter(item => item).map(item => item?.toString()).join('.')
            })
        }
    }

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
            Exito(`Cuenta contable ${esNuevo ? 'agregada' : 'actualizada'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos de la cuanta contable.');
        }

    };

    useEffect(() => {
        editar(modelo)
    }, [modelo])

    useEffect(() => {
        console.log(entidad)
    }, [entidad])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formCatalogoCc"
            title="Cuenta Contable"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={entidad}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="C&oacute;digo" name="codigo" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Card size="small" style={{ textDecorationColor: 'InfoText' }}>{entidad.codigo}</Card>
            </Form.Item>
            <Form.Item label="Grupo" name="grupo" rules={[{ required: true, message: 'Obligatorio' }]}>
                <InputNumber name="grupo" value={entidad.grupo} onChange={value => {
                    const cod: string = [value ?? 0, entidad?.nivel1 ?? 0, entidad?.nivel2 ?? 0, entidad?.nivel3 ?? 0].filter(item => item > 0).map(item => item?.toString()).join('.');
                    editar({ ...entidad, codigo: cod, grupo: value })
                }} />
            </Form.Item>
            <Form.Item label="Nivel 1" name="nivel1">
                <InputNumber name="nivel1" value={entidad.nivel1} onChange={value => {
                    editar({ 
                        ...entidad,
                        codigo: [entidad.grupo, value, entidad?.nivel2, entidad?.nivel3].filter(item => item).map(item => item?.toString()).join('.'),
                        nivel1: value })
                }} />
            </Form.Item>
            <Form.Item label="Nivel 2" name="nivel2">
                <InputNumber name="nivel2" value={entidad.nivel2} onChange={value => {
                    editar({ 
                        ...entidad,
                        codigo: [entidad.grupo, entidad?.nivel1, value, entidad?.nivel3].filter(item => item).map(item => item?.toString()).join('.'),
                        nivel2: value })
                }} />
            </Form.Item>
            <Form.Item label="Nivel 3" name="nivel3">
                <InputNumber name="nivel3" value={entidad.nivel3} onChange={value => {
                    editar({ 
                        ...entidad,
                        codigo: [entidad.grupo, entidad?.nivel1, entidad?.nivel2, value].filter(item => item).map(item => item?.toString()).join('.'),
                        nivel3: value })
                }} />
            </Form.Item>
        </FormDrawer>
    )
}
export default BancoFormulario;
