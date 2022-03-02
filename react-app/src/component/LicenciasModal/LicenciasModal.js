import React, { useContext } from 'react';
import { Modal, Button } from 'antd';
import { EventContext } from '../context/eventContext';
import LicenciasModalDatePicker from './LicenciasDatepicker';
import { Alert } from 'antd';

const LicenciasEventModal = () => {
    const { isLicenciasModalVisible } = useContext(EventContext)
    const { handleLicenciasOk } = useContext(EventContext)
    const { handleLicenciasCancel } = useContext(EventContext)
    const { licenciaId } = useContext(EventContext)
    const { licenciasValue } = useContext(EventContext)
    const { alert, setAlert } = useContext(EventContext)
    const { licenciasData } = useContext(EventContext)
    const { setLicenciaId } = useContext(EventContext)
    const { recursoId } = useContext(EventContext)
    const { deleteLicencia } = useContext(EventContext)
    const { createLicencia } = useContext(EventContext)
    const { alertLicenciaDay, setAlertLicenciaDay } = useContext(EventContext)

    const onClose = () => {
      setAlert(false)
    }

    const onCloseLicenciaDay = () => {
      setAlertLicenciaDay(false)
    }
      return (
        <>
        {alertLicenciaDay && <Alert 
          style={{}}
          message="Licencia en curso"
          description="El recurso seleccionado esta de licencia en esta fecha."
          type="info"
          showIcon
          closable
          onClose={ onCloseLicenciaDay }
          />}
          {alert && <Alert 
          style={{}}
          message="Recurso no seleccionado"
          description="Para editar las licencias debe seleccionar un recurso primero."
          type="info"
          showIcon
          closable
          onClose={ onClose }
          />}
          <Modal
          title="Editar Licencias"
          visible={ isLicenciasModalVisible }
          onOk={ handleLicenciasOk }
          onCancel={ handleLicenciasCancel }
          footer={[
          <>
          <Button key="Eliminar Licencia" onClick={() => {deleteLicencia(licenciaId, recursoId)}}>Eliminar Licencia</Button>
          <Button key="Cancelar" onClick={ handleLicenciasCancel }>Cancelar</Button>
          <Button key="Aceptar" onClick={() => {createLicencia(recursoId, licenciasValue)} }>Aceptar</Button>
          </>
          ]}
          >
          <div>{
            licenciasData.filter(licencia => licencia.recurso_id === recursoId.id).map((licencia, index) =>
            <div id={licencia.licencia_id} recurso_id={licencia.recurso_id} title={licencia.title} key={index} onClick={() => {setLicenciaId(licencia.licencia_id); console.log(licenciaId)}}> 
            {(index + 1) + "- " + licencia.title + " " + licencia.start + " // " + licencia.end }</div>)
            }
          </div>
          <div style={{marginTop: "10px"}}>
          <LicenciasModalDatePicker/>
          </div>
          </Modal>
          
        </>
      );
}

export default LicenciasEventModal;