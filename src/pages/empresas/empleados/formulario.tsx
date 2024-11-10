import { useEffect, useState } from "react";
import { useData } from "../../../hooks/useData";
import { Alerta, Exito } from "../../../hooks/useMensaje";
import { Empleado } from "../../../interfaces/empresas";
import { Col, Form, Input, InputNumber, Radio, Row, Select, Space, Switch } from "antd";
import { useForm } from "../../../hooks/useForm";
import FormDrawer from "../../../components/containers/form";

const EmpleadoFormulario = () => {
    
    const {
        contextEmpleados: { state: { modelo }, agregar, actualizar, cancelar },
        contextEmpresas: { state: { datos: empresas, procesando: cargandoEmpresas }, todos: cargarEmpresas },
        contextGeneros: { state: { datos: generos, procesando: cargandoGeneros }, todos: cargarGeneros },
        contextHorarios: { state: { datos: horarios, procesando: cargandoHorarios }, todos: cargarHorarios },
        contextPosiciones: { state: { datos: posiciones, procesando: cargandoPosiciones }, todos: cargarPosiciones }
    } = useData();
    const { entidad, editar, handleChangeInput } = useForm<Empleado | null | undefined>(modelo);
    const [tipo, setTipo] = useState<number>(1);

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
            Exito(`Empleado ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del empleado.');
        }

    };

    useEffect(() => {
        editar(modelo);
        if (modelo) {
            (async () => {
                await cargarGeneros();
                await cargarHorarios();
                await cargarPosiciones();
                await cargarEmpresas();

            })()
        }
    }, [modelo])

    if (!entidad) {
        return <></>
    }

    return (
        <FormDrawer
            name="formEmpleado"
            title="Empleado"
            placement="right"
            vertical
            open={true}
            onClose={cancelar}
            onFinish={guardar}
            initialValues={{
                ...entidad,
                generoId: entidad.genero?.id,
                horarioId: entidad.horario?.id,
                posicionId: entidad.posicion?.id,
                empresaId: entidad.empresa?.id
            }}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Radio.Group defaultValue={1}>
                <Radio value={1} onClick={() => setTipo(1)}>C&eacute;dula</Radio>
                <Radio value={2} onClick={() => setTipo(2)}>Pasaporte</Radio>
            </Radio.Group>
            {
                tipo === 1
                    ?
                    <Form.Item name="cedula" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="cedula" value={entidad.cedula || ''} onChange={handleChangeInput} />
                    </Form.Item>
                    :
                    <Form.Item name="pasaporte" rules={[{ required: true, message: 'Obligatorio' }]}>
                        <Input name="pasaporte" value={entidad.pasaporte || ''} onChange={handleChangeInput} />
                    </Form.Item>
            }
            <Form.Item label="Genero" name="generoId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoGeneros}
                    value={entidad.genero?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={generos.map(item => ({ key: item.id.toString(), value: item.id, label: item.descripcion }))}
                    onChange={(value) => editar({ ...entidad, genero: generos.filter(item => item.id === value)[0] })}>
                </Select>
            </Form.Item>
            <Form.Item label="Horario Laboral" name="horarioId">
                <Select
                    loading={cargandoHorarios}
                    value={entidad.horario?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={horarios.map(item => ({ key: item.id.toString(), value: item.id, label: item.nombre }))}
                    onChange={(value) => editar({ ...entidad, horario: horarios.filter(item => item.id === value)[0] })}>
                </Select>
            </Form.Item>
            <Row gutter={6}>
                <Col lg={17} md={17} sm={17} xs={24}>
                    <Form.Item label="Posici&oacute;n" name="posicionId">
                        <Select
                            loading={cargandoPosiciones}
                            value={entidad.posicion?.id}
                            labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                            options={posiciones.map(item => ({ key: item.id.toString(), value: item.id, label: item.nombre }))}
                            onChange={(value) => editar({ ...entidad, posicion: posiciones.filter(emp => emp.id === value)[0] })}>
                        </Select>
                    </Form.Item>
                </Col>
                <Col lg={6} md={6} sm={6} xs={24}>
                    <Form.Item label="Salario" name="salario" style={{ width: '100% ' }}>
                        <InputNumber min={0} value={entidad.salario}
                            onChange={(value) => editar({ ...entidad, salario: value ?? 0 })} onFocus={(evt) => evt.currentTarget.select()} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item label="Fecha Entrada" name="fechaEntrada">
                        <Input type="date" name="fechaEntrada" value={entidad.fechaEntrada || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item label="Fecha Salida" name="fechaSalida">
                        <Input type="date" name="fechaSalida" value={entidad.fechaSalida || ''} onChange={handleChangeInput} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item label="Empresa" name="empresaId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoEmpresas}
                    value={entidad.empresa?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={empresas.map((emp) => ({ key: emp.id.toString(), value: emp.id, label: emp.nombre }))}
                    onChange={(value) => editar({ ...entidad, empresa: empresas.filter(emp => emp.id === value)[0] })}>
                </Select>
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
export default EmpleadoFormulario;
