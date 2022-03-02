import React, { useContext } from 'react';
import { Modal, Button } from 'antd';
import { EventContext } from '../context/eventContext';
import ModalDatePicker from './Datepicker';
import { fetchDataEventos } from '../functions/functions';

const EventModal = () => {
  const { isModalVisible } = useContext(EventContext)
  const { handleOk } = useContext(EventContext)
  const { handleCancel } = useContext(EventContext)
  const { deleteEvent } = useContext(EventContext)
  const { eventId } = useContext(EventContext)
  const { handleChangeEventTime } = useContext(EventContext)
  const { eventInfo } = useContext(EventContext)
  const { value } = useContext(EventContext)
  const { setEventosData } = useContext(EventContext)

  return (
    <>
      <Modal
        title="Modificar Evento"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <>
            <Button key="Eliminar Evento" onClick={() => {
              handleCancel();
              deleteEvent(eventId).then(res => {
                eventInfo.event.remove()
                fetchDataEventos().then(res => {
                  setEventosData(res)
                }).catch(err => {
                  console.log(err)
                })
              }).catch(err => {
                console.log(err)
              })
            }
            }>Eliminar Evento</Button>
            <Button key="Cancelar" onClick={handleCancel}>Cancelar</Button>
            <Button key="Aceptar" onClick={() => { handleChangeEventTime(eventInfo, value) }}>Aceptar</Button>
          </>
        ]}
      >
        <ModalDatePicker />
      </Modal>
    </>
  );
}

export default EventModal;