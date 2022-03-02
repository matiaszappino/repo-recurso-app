import React, { useContext } from 'react';
import { Modal, Button } from 'antd';
import { EventContext } from '../context/eventContext';
import { fetchDataRecursos } from '../functions/functions';
import { Alert } from 'antd';

const EliminarRecursoModal = () => {
    const { isEliminarRecursoModalVisible } = useContext(EventContext)
    const { handleCancelEliminarRecursoModal } = useContext(EventContext)
    const { deleteRecurso } = useContext(EventContext)
    const { recursoId } = useContext(EventContext)
    const { setRecursosData } = useContext(EventContext)
    const { recursosData } = useContext(EventContext)
    const { alertEliminarRecurso, setAlertEliminarRecurso } = useContext(EventContext)
    const { alertSameDay, setAlertSameDay } = useContext(EventContext)

    const onClose = () => {
        setAlertEliminarRecurso(false)
    }

    const onCloseSameDay = () => {
        setAlertSameDay(false)
    }

    return (
        <>
        {alertSameDay && <Alert 
          style={{}}
          message="Este recurso ya esta en uso"
          description="El recurso seleccionado ya tiene un evento el mismo dia."
          type="info"
          showIcon
          closable
          onClose={ onCloseSameDay }
          />}
        {alertEliminarRecurso && <Alert 
            style={{}}
            message="Recurso no seleccionado"
            description="Para borrar debe seleccionar un recurso primero."
            type="info"
            showIcon
            closable
            onClose={ onClose }
            />}
            <Modal
                title="Desea eliminar el siguiente recurso?"
                visible={isEliminarRecursoModalVisible}
                onOk={handleCancelEliminarRecursoModal}
                onCancel={handleCancelEliminarRecursoModal}
                footer={[
                    <>
                        <Button key="Si" onClick={() => {
                            handleCancelEliminarRecursoModal();
                            deleteRecurso(recursoId).then(res => {
                                fetchDataRecursos().then(res => {
                                    setRecursosData(res)
                                }).catch(err => {
                                    console.log(err)
                                })
                            })
                        }
                        }>Si</Button>
                        <Button key="No" onClick={handleCancelEliminarRecursoModal}>No</Button>
                    </>
                ]}
            >
            <div>{
            recursosData.filter(recurso => recurso.id === recursoId.id).map((recurso, index) =>
            <div id={recurso.id} title={recurso.title} key={index}> 
            {(index + 1) + "- " + recurso.title }</div>)
            }
          </div>
            </Modal>
        </>
    );
}

export default EliminarRecursoModal;