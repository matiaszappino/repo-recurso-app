import React, { useState, useEffect, createContext } from 'react'
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { fetchConsultasRecursoInfo, generateDataTableLocales, fetchConsultasInfo, fetchDataEventos, fetchDataLocales, fetchDataRecursos, fetchDataLicencias, createEvent, deleteEvent, updateEvent } from '../functions/functions';


export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [recursosData, setRecursosData] = useState([])
    const [eventosData, setEventosData] = useState([])
    const [localesData, setLocalesData] = useState([])
    const [licenciasData, setLicenciasData] = useState([])
    const [eventId, setEventId] = useState({})
    const [eventInfo, setEventInfo] = useState({})
    const [refComponentCalendar, setRefComponentCalendar] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [value, setValue] = useState([])
    const [alert, setAlert] = useState(false)
    const [alertEliminarRecurso, setAlertEliminarRecurso] = useState(false)
    const [alertEliminarLocal, setAlertEliminarLocal] = useState(false)
    const [alertSameDay, setAlertSameDay] = useState(false)
    const [alertLicenciaDay, setAlertLicenciaDay] = useState(false)
    const [isLicenciasModalVisible, setIsLicenciasModalVisible] = useState(false)
    const [recursoId, setRecursoId] = useState({})
    const [localId, setLocalId] = useState({})
    const [licenciaId, setLicenciaId] = useState({})
    const [licenciasValue, setLicenciasValue] = useState([])
    const [isRecursosModalVisible, setRecursosModalVisible] = useState(false)
    const [isLocalesModalVisible, setLocalesModalVisible] = useState(false)
    const [isEliminarRecursoModalVisible, setEliminarRecursoModalVisible] = useState(false)
    const [consultaEventosData, setConsultaEventosData] = useState([])
    const [isEliminarLocalModalVisible, setEliminarLocalModalVisible] = useState(false)
    let lastEndDate = ""
    let lastStartDate = ""

    useEffect(() => {
        // Functions for fetching Data
        fetchDataRecursos().then(res => {
            setRecursosData(res)
        })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        // Functions for fetching Data
        fetchDataLocales().then(res => {
            setLocalesData(res)
        })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        // Functions for fetching Data
        fetchDataEventos().then(res => {
            setEventosData(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    
    useEffect(() => {
        // Functions for fetching Data
        fetchDataLicencias().then(res => {
            setLicenciasData(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);
    
    // Functions to Handle Changes on Calendar
    const handleEventAllow = (dropInfo, draggedEvent) => {
        if (checkForLicencia(dropInfo, draggedEvent) === true) {
            setAlertLicenciaDay(true)
            setTimeout(function () {
                setAlertLicenciaDay(false)
            }, 5000)
            console.log("El recurso tiene licencia en este rango de fechas")
            return false
        }
        if (checkForSameDay(dropInfo, draggedEvent) === true) {
            setAlertSameDay(true)
            setTimeout(function () {
                setAlertSameDay(false)
            }, 5000)
            console.log("Ya existe un evento para este recurso el mismo dia")
            return false
        }
        return true
    }
    
    const checkForLicencia = (dropInfo, draggedEvent) => {
        var licenciasRecurso = licenciasData.map((licencia) => licencia)
        
        for(let i = 0; i < licenciasRecurso.length; i++ ) {
            const dateStart = new Date(dropInfo.startStr)
            const dateEnd = new Date(dropInfo.endStr)
            const licenciaStart = new Date(licenciasRecurso[i].start)
            const licenciaEnd = new Date(licenciasRecurso[i].end)
            
            if (licenciasRecurso[i]["recurso_id"] === draggedEvent._def.extendedProps.recurso_id) {
                if (dateStart >= licenciaStart && dateEnd <= licenciaEnd) {
                    return true
                }
            }
        }
        return false
    }

    const checkForSameDay = (dropInfo, draggedEvent) => { 
        var eventos = eventosData.map((evento) => evento)
        
        for(let i = 0; i < eventos.length; i++) {
            const date = moment(dropInfo.startStr).format('YYYY-MM-DD')
            const eventDate = moment(eventos[i].start).format('YYYY-MM-DD')

            if(eventos[i]['recurso_id'] === draggedEvent._def.extendedProps.recurso_id) {
                if(date === eventDate) {
                    return true
                }
            }
        }
        return false
    }
    
    const handleRecieve = (info) => {
        const valueOfCheckForEvents = checkForEvents(info) 
        if (valueOfCheckForEvents === null) {
            let businessHours = checkForBusinessHours(moment(info.dateStr).format('YYYY-MM-DD'), info.resource.id)
            lastStartDate = businessHours
        }
        if (valueOfCheckForEvents !== null) {
            lastEndDate = valueOfCheckForEvents
        }
        let idInfo = ""
        let startDate = ""
        let turno = info.resource._resource.extendedProps["turno"]
        idInfo = checkForId(info)
        startDate = checkForStartDate()
        let value = {
            id: idInfo,
            recurso_id: info.draggedEl.getAttribute("recurso_id"),
            resourceId: info.resource._resource["id"],
            title: info.draggedEl.getAttribute("title"),
            start: moment(startDate).format(),
            end: moment(startDate).add(+turno, "hours").format()
        }
        createEvent(value).then(res => {
            setEventosData(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const checkForEvents = (info) => {
        var eventos = eventosData.map((evento) => evento)
        var thelastEndDate = "1900-01-01"
        for (let i = 0; i < eventos.length; i++) {
            if (eventos[i]["resourceId"] === info.resource.id) {
                if (moment(eventos[i]["start"]).format('YYYY-MM-DD') === moment(info.dateStr).format('YYYY-MM-DD')) {
                    if (new Date(thelastEndDate) < new Date(eventos[i]["end"])) {
                        thelastEndDate = moment(eventos[i]["end"]).format()
                    }
                }
            }
        }
        if (thelastEndDate === "1900-01-01") {
            return null
        }
        return thelastEndDate
    }
    
    const checkForBusinessHours = (date, local_id) => {
        var locales = localesData.map((local) => local)
        var businessHours = ""
        var hours = ""
        for (let i = 0; i < locales.length; i++) {
            if (locales[i]["id"] === local_id) {
                hours = locales[i]["businessHours"][0]["startTime"]
            }
        }
        businessHours = moment(date + ' ' + hours).format()
        return businessHours
    }

    
    
    const checkForId = (info) => {
        let idInfo = ""
        if (info.draggedEl.getAttribute("id") === "") {
            idInfo = uuid()
        } else {
            idInfo = info.draggedEl.getAttribute("id")
        }
        return idInfo
    }
    
    const checkForStartDate = () => {
        let startDate = ""
        if (lastEndDate !== "") {
            startDate = moment(lastEndDate).format()
            lastEndDate = ""
        }
        if (lastStartDate !== "") {
            startDate = moment(lastStartDate).format()
            lastStartDate = ""
        }
        return startDate
    }
    
    const handleEventRecieve = (info) => {
        function removeEvent () {
            info.event.remove()
        }
        setTimeout(removeEvent, 100)
    }

    const handleChange = (changeInfo) => {
        const value = {
            id: changeInfo.event.id,
            recurso_id: changeInfo.event.extendedProps.recurso_id,
            resourceId: changeInfo.event._def.resourceIds[0],
            title: changeInfo.event.title,
            start: changeInfo.event.startStr,
            end: changeInfo.event.endStr,
            constraint: changeInfo.event
        }
        updateEvent(value).then(res => {
            setEventosData(res)
        }).catch(err => {
            console.log(err)
        })
    }

    async function createLicencia(recurso, licenciasValues) {
        handleLicenciasCancel()
        let licenciaId = uuid()
        let value = {
            licencia_id: licenciaId,
            recurso_id: recurso.id,
            start: licenciasValues[0],
            end: licenciasValues[1]
        }
        createLicense(value).then(res => {
    
        }).catch(err => {
            console.log(err)
        })
    }
    
    async function createLicense(value) {
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        }
        const response = await fetch("http://localhost:5000/api/createLicencia", settings);
        const licencias = await response.json()
        setLicenciasData(licencias)
    }
    const handleClick = (info) => {
        setEventId({id: info.event.id})
        setEventInfo(info)
        showModal()
    }
    
    async function deleteLicencia(licencia, recurso) {
        handleLicenciasCancel()
        const values = {
            licenciaId: licencia,
            recursoId: recurso.id
        }
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }
        const response = await fetch("http://localhost:5000/api/deleteLicencia", settings);
        const licencias = await response.json()
        setLicenciasData(licencias)
    }

    async function deleteRecurso(recurso) {
        const values = {
            recursoId: recurso.id
        }
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }
        const response = await fetch("http://localhost:5000/api/deleteRecurso", settings);
        const recursos = await response.json()
        setRecursosData(recursos)
        fetchDataEventos().then(res => {
            setEventosData(res)
        }).catch(err => {
            console.log(err)
        })
        fetchDataLicencias().then(res => {
            setLicenciasData(res)
        }).catch(err => {
            console.log(err)
        })
    }

    async function deleteLocal(local) {
        const values = {
            local_id: local.id
        }
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }
        const response = await fetch("http://localhost:5000/api/deleteLocal", settings);
        await response.json()
        fetchDataLocales().then(res => {
            setLocalesData(res)
        }).catch(err => {
            console.log(err)
        })
    }



    // Functions to perform actions on events

    const handleChangeEventTime = (info, value) => {
        handleCancel()
        const values = {
            id: info.event._def.publicId,
            recurso_id: info.event._def.extendedProps.recurso_id,
            resourceId: info.event._def.resourceIds[0],
            title: info.event._def.title,
            start: moment(value[0]).format(),
            end: moment(value[1]).format()
        }
        updateEvent(values).then(res => {
            setEventosData(res)
        }).catch(err => {
            console.log(err)
        })
    }
    // Modal Functions


    const handleSelect = (info) => {
        let local_id = {
            id: info.resource._resource.id
        }
        setLocalId(local_id)
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Licencias Modal Functions

    const handleSetRecursoId = (recurso) => {
        setRecursoId(recurso)
    }

    const handleOpenLicenciasModal = () => {
        if (recursoId.id !== undefined) {
            showLicenciasModal()
        } else {
            setAlert(true)
            setTimeout(function () {
                setAlert(false)
            }, 5000)
        }
    }

    const showLicenciasModal = () => {
        setIsLicenciasModalVisible(true);
    };

    const handleLicenciasOk = () => {
        setIsLicenciasModalVisible(false);
    };

    const handleLicenciasCancel = () => {
        setIsLicenciasModalVisible(false);
    };


    const handleOpenRecursosModal = () => {
        setRecursosModalVisible(true)
    }

    const handleRecursosModalCancel = () => {
        setRecursosModalVisible(false)
    };

    async function adaptRecurso(recurso) {
        let recursoId = uuid()
        let value = {
            recurso_id: recursoId,
            nombre: recurso.nombre,
            apellido: recurso.apellido
        }
        createRecurso(value).then(res => {
            setRecursosData(res)
        }).catch(err => {
            console.log(err)
        })
    }
    
    async function createRecurso(value) {
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        }
        const response = await fetch("http://localhost:5000/api/createRecurso", settings);
        const recursos = await response.json()
        console.log(recursos)
        return recursos
    }

    const handleOpenLocalesModal = () => {
        setLocalesModalVisible(true)
    }

    const handleLocalesModalCancel = () => {
        setLocalesModalVisible(false)
    };

    async function adaptLocal(local) {
        let localId = uuid()
        let value = {
            local_id: localId,
            nombre: local.nombre,
            ubicacion: local.ubicacion,
            correo: local.correo,
            daysOfWeek: parseInt(local.daysOfWeek),
            startTime: local.startTime,
            endTime: local.endTime,
            turno: local.turno
        }
        createLocal(value).then(res => {
            const datatableLocales = generateDataTableLocales(res)
            setLocalesData(datatableLocales)
        }).catch(err => {
            console.log(err)
        })
    }
    
    async function createLocal(value) {
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        }
        const response = await fetch("http://localhost:5000/api/createLocal", settings);
        const locales = await response.json()
        console.log(locales)
        return locales
    }

    const handleOpenEliminarRecursoModal = () => {
        if (recursoId.id !== undefined) {
            showEliminarRecursoModal()
        } else {
            setAlertEliminarRecurso(true)
            setTimeout(function () {
                setAlertEliminarRecurso(false)
            }, 5000)
        }
    }

    const showEliminarRecursoModal = () => {
        setEliminarRecursoModalVisible(true)
    }

    const handleCancelEliminarRecursoModal = () => {
        setEliminarRecursoModalVisible(false)
    }

    const handleEliminarLocal = () => {
        if (localId.id !== undefined) {
            showEliminarLocalModal()
        } else {
            setAlertEliminarLocal(true)
            setTimeout(function () {
                setAlertEliminarLocal(false)
            }, 5000)
        }
    }
    
    const showEliminarLocalModal = () => {
        setEliminarLocalModalVisible(true)
    }

    const handleCancelEliminarLocalModal = () => {
        setEliminarLocalModalVisible(false)
    }

    const getConsultasInfo = (local_id) => {
        console.log(local_id)
        fetchConsultasInfo(local_id).then(res => {
            console.log("res", res)
            setConsultaEventosData(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const getConsultasRecursoInfo = (recurso_id) => {
        console.log(recurso_id)
        fetchConsultasRecursoInfo(recurso_id).then(res => {
            console.log("res", res)
            setConsultaEventosData(res)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <EventContext.Provider value={{ localId, isEliminarLocalModalVisible, consultaEventosData, recursosData, eventosData, localesData, isModalVisible, eventInfo, eventId, value, isLicenciasModalVisible, recursoId, alert, licenciasData, licenciaId, licenciasValue, refComponentCalendar, isRecursosModalVisible, isLocalesModalVisible, isEliminarRecursoModalVisible, alertEliminarRecurso, alertEliminarLocal, alertSameDay, alertLicenciaDay, setAlertLicenciaDay, setAlertSameDay, setAlertEliminarLocal, setAlertEliminarRecurso, getConsultasRecursoInfo, setLocalId, handleCancelEliminarLocalModal, deleteLocal, getConsultasInfo, setConsultaEventosData, setRecursosData, deleteRecurso, handleOpenEliminarRecursoModal, handleCancelEliminarRecursoModal, handleEliminarLocal, adaptLocal, handleOpenLocalesModal, handleLocalesModalCancel, adaptRecurso, handleRecursosModalCancel, handleOpenRecursosModal, handleEventAllow, handleEventRecieve, setRefComponentCalendar, setEventosData, setLicenciasValue, createLicencia, setEventId, deleteLicencia, setLicenciaId, setAlert, handleSetRecursoId, setValue, handleRecieve, handleChange, handleSelect, showModal, handleOk, handleCancel, handleClick, handleChangeEventTime, deleteEvent, handleOpenLicenciasModal, handleLicenciasOk, handleLicenciasCancel, fetchDataEventos }}>
            {children}
        </EventContext.Provider>
    )
}