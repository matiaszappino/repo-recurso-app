import React, { useContext } from 'react';
import { Modal, Button } from 'antd';
import { EventContext } from '../context/eventContext';
import { fetchDataLocales} from '../functions/functions';
import { Alert } from 'antd';

const EliminarLocalModal = () => {
    const { isEliminarLocalModalVisible } = useContext(EventContext)
    const { handleCancelEliminarLocalModal } = useContext(EventContext)
    const { deleteLocal } = useContext(EventContext)
    const { localId } = useContext(EventContext)
    const { setLocalesData } = useContext(EventContext)
    const { localesData } = useContext(EventContext)
    const { alertEliminarLocal, setAlertEliminarLocal} = useContext(EventContext)

    const onClose = () => {
        setAlertEliminarLocal(false)
    }

    return (
        <>
        {alertEliminarLocal && <Alert 
            style={{}}
            message="Local no seleccionado"
            description="Para borrar primero debe seleccionar un local haciendo click en cualquier dia en el calendario para el local que quiere eliminar."
            type="info"
            showIcon
            closable
            onClose={ onClose }
            />}
            <Modal
                title="Desea eliminar el siguiente local?"
                visible={isEliminarLocalModalVisible}
                onOk={handleCancelEliminarLocalModal}
                onCancel={handleCancelEliminarLocalModal}
                footer={[
                    <>
                        <Button key="Si" onClick={() => {
                            handleCancelEliminarLocalModal();
                            deleteLocal(localId).then(res => {
                                fetchDataLocales().then(res => {
                                    setLocalesData(res)
                                }).catch(err => {
                                    console.log(err)
                                })
                            })
                        }
                        }>Si</Button>
                        <Button key="No" onClick={handleCancelEliminarLocalModal}>No</Button>
                    </>
                ]}
            >
            <div>{
            localesData.filter(local => local.id === localId.id).map((local, index) =>
            <div id={local.id} title={local.title} key={index}> 
            {(index + 1) + "- " + local.title }</div>)
            }
          </div>
            </Modal>
        </>
    );
}

export default EliminarLocalModal;