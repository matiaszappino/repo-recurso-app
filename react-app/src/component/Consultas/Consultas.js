import React, { useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { EventContext } from "../context/eventContext";

const ConsultasCalendar = () => {
    const { consultaEventosData } = useContext(EventContext)
    return (
        <FullCalendar
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        locale="es"
        editable="false"
        droppable="false"
        events={consultaEventosData}
        />
    )
}

export default ConsultasCalendar;