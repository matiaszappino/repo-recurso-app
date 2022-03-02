import React, { useContext, useRef} from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventContext } from './context/eventContext';
import EventModal from './Modal/Modal';
import LicenciasEventModal from './LicenciasModal/LicenciasModal';
import RecursosModal from './RecursosModal/RecursosModal';
import LocalesModal from './LocalesModal/LocalesModal';
import EliminarRecursoModal from './RecursosModal/EliminarRecurso';
import EliminarLocalModal from './LocalesModal/EliminarLocal';

const WrappedEventCalendar = React.forwardRef((props, ref) => {
    const { eventosData } = useContext(EventContext)
    const { handleRecieve } = useContext(EventContext)
    const { localesData } = useContext(EventContext)
    const { handleChange } = useContext(EventContext)
    const { handleClick } = useContext(EventContext)
    const { handleSelect } = useContext(EventContext)
    const { handleOpenLicenciasModal } = useContext(EventContext)
    const { handleOpenRecursosModal } = useContext(EventContext)
    const { handleOpenLocalesModal } = useContext(EventContext)
    const { handleEventRecieve } = useContext(EventContext)
    const { handleEventAllow } = useContext(EventContext)
    const { handleOpenEliminarRecursoModal } = useContext(EventContext)
    const { handleEliminarLocal } = useContext(EventContext)
    const refCalendar = useRef()

    return (
      <>
      <FullCalendar
      schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
      plugins={[ resourceTimelinePlugin, interactionPlugin, dayGridPlugin ]}
      initialView="resourceTimelineWeek"
      height="auto"
      //defaultTimedEventDuration='06:00:00'
      //eventConstraint="businessHours"
      //businessHours={[ // specify an array instead
      //  {
      //    daysOfWeek: [ 0, 1, 2, 3, 4, 5, 6], // Monday, Tuesday, Wednesday
      //    startTime: '08:00', // 8am
      //    endTime: '18:00' // 6pm
      //  }
      //]}
      customButtons={{
        licencias: {
          text: 'Licencias',
          click: function() {
            handleOpenLicenciasModal()
          }
        },
        recursos: {
          text: '+ Recurso',
          click: function() {
            handleOpenRecursosModal()
          }
        },
        eliminarRecurso: {
          text: '- Recurso',
          click: function() {
            handleOpenEliminarRecursoModal()
          }
        },
        locales: {
          text: '+ Local',
          click: function() {
            handleOpenLocalesModal()
          }
        },
        eliminarLocal: {
          text: '- Local',
          click: function() {
            handleEliminarLocal()
          },
        }}}
      aspectRatio="2"
      droppable="true"
      editable="true"
      resourceAreaHeaderContent="Locales"
      headerToolbar={{
        left: 'licencias,recursos,eliminarRecurso,locales,eliminarLocal',
        center: 'title',
        right: 'prev,next,resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
      }}
      locale="es"
      drop={ handleRecieve }
      eventAllow={ handleEventAllow }
      resources={ localesData }
      events={ eventosData }
      eventChange={ handleChange }
      eventReceive={ handleEventRecieve }
      select={ handleSelect }
      eventClick={ handleClick }
      selectable="true"
      resourceOrder='title,id'
      ref={ refCalendar }
      />
      <EventModal/>
      <LicenciasEventModal/>
      <RecursosModal/>
      <LocalesModal/>
      <EliminarRecursoModal/>
      <EliminarLocalModal/>
      </>
    )
  })


  export default WrappedEventCalendar;