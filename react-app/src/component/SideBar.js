import React, { useContext, useEffect } from 'react';
import { EventContext } from './context/eventContext';
import { Draggable } from '@fullcalendar/interaction';

const SideBar = () => {
    const { recursosData } = useContext(EventContext)
    const { handleSetRecursoId } = useContext(EventContext)

    useEffect(() => {
      drag()
    }, [])
    

    const drag = () => {
      let draggable = document.getElementById("external-events");
      new Draggable(draggable, {
        itemSelector: ".fc-event-main",
        eventData: function(eventEl){
          let recurso_id = eventEl.getAttribute("recurso_id")
          let title = eventEl.getAttribute("title")
          let id = eventEl.getAttribute("id")
          console.log("eventEl", eventEl)
          return {
            id: id,
            recurso_id: recurso_id,
            title: title,
          }
        }
      })
    }

    const SaveRecursoId = (recurso_id) => {
      let recurso = {}
      let id = recurso_id
      recurso = {id}
      handleSetRecursoId(recurso)
    }
    
    return (
      <div id='external-events'>
        <p>
        <strong>Recursos</strong>
        </p>
          <div>{
            recursosData.map((recurso, index) => <div key={ "Parent tag" + index } className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
              <div className='fc-event-main' id={""} recurso_id={recurso.id} title={recurso.title} key={index} onClick={() => {SaveRecursoId(recurso.id)}  }> { recurso.title } </div>
              </div>)
            }
          </div>
          <p>

          </p>
      </div>
        )
    }

export default SideBar;