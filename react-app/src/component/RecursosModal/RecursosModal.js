import React, { useContext} from 'react';
import { Modal, Form, Input} from 'antd';
import { EventContext } from '../context/eventContext';

const RecursosModal = () => {
    const [form] = Form.useForm();
    const { isRecursosModalVisible } = useContext(EventContext)
    const { handleRecursosModalCancel } = useContext(EventContext)
    const { adaptRecurso } = useContext(EventContext)

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        handleRecursosModalCancel();
        adaptRecurso(values)
    };

    return (
        <Modal
            visible={ isRecursosModalVisible }
            title="Añadir nuevo recurso"
            okText="Añadir"
            cancelText="Cancelar"
            onCancel={ handleRecursosModalCancel }
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
                            message: 'Escriba el nombre del nuevo recurso'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="apellido"
                    label="Apellido"
                    rules={[
                        {
                            required: true,
                            message: 'Escriba el apellido del nuevo recurso',
                        }
                    ]}>
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RecursosModal

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