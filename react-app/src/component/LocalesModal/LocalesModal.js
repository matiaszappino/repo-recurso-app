import React, { useContext } from 'react';
import { Modal, Form, Input} from 'antd';
import { EventContext } from '../context/eventContext';

const LocalesModal = () => {
    const [form] = Form.useForm();
    const { isLocalesModalVisible } = useContext(EventContext)
    const { handleLocalesModalCancel } = useContext(EventContext)
    const { adaptLocal } = useContext(EventContext)

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        handleLocalesModalCancel();
        adaptLocal(values)
    };

    return (
        <Modal
            visible={ isLocalesModalVisible }
            title="Añadir nuevo local"
            okText="Añadir"
            cancelText="Cancelar"
            onCancel={ handleLocalesModalCancel }
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="nombre"
                    label="Nombre"
                    rules={[
                        {
                            required: true,
                            message: 'Escriba el nombre del nuevo local'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ubicacion"
                    label="Ubicacion"
                    rules={[
                        {
                            required: true,
                            message: 'Escriba la ubicacion del nuevo local',
                        }
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item
                    name="correo"
                    label="Correo"
                    rules={[
                        {
                            required: true,
                            message: 'Escriba el correo del nuevo local',
                        }
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item
                    name="daysOfWeek"
                    label='Dias de la semana operativos (OP1 -> L a D o OP2 -> L a V)'
                    rules={[
                        {
                            required: true,
                            message: 'Escriba "1" si trabaja de Lunes a Domingos o "2" si trabaja de Lunes a Viernes',
                        }
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item
                    name="startTime"
                    label='Horario de apertura - Ejemplo: "09:00"'
                    rules={[
                        {
                            required: true,
                            message: 'Escriba el horario de apertura del local - Ejemplo: "09:00"',
                        }
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item
                    name="endTime"
                    label='Horario de cierre - Ejemplo: "18:00"'
                    rules={[
                        {
                            required: true,
                            message: 'Escriba el horario de cierre del local - Ejemplo: "18:00"',
                        }
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item
                    name="turno"
                    label='Duracion de cada turno en horas - Ejemplo: "6"'
                    rules={[
                        {
                            required: true,
                            message: 'Escriba la duracion de cada turno en este local - Ejemplo: "6"',
                        }
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LocalesModal

/* const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

ReactDOM.render(<CollectionsPage />, mountNode);*/