// Funtion to fetch Data for Eventos

export async function fetchDataEventos() {
    const response = await fetch("http://localhost:5000/api/eventos");
    const json = await response.json();
    const list_eventos = generateDataTableEventos(json);
    return list_eventos
}

export async function fetchConsultasInfo(local_id) {
    const response = await fetch("http://localhost:5000/api/eventos");
    const json = await response.json();
    const list_eventos = generateDataTableConsultasEventos(json, local_id);
    return list_eventos
}

export async function fetchConsultasRecursoInfo(recurso_id) {
    const response = await fetch("http://localhost:5000/api/eventos");
    const response_locales = await fetch("http://localhost:5000/api/locales");
    const json = await response.json();
    const json_locales = await response_locales.json()
    const list_eventos = generateDataTableConsultasRecursosEventos(json, json_locales, recurso_id);
    return list_eventos
}

// Funtion to generate Datatable for Eventos

function generateDataTableEventos(data) {
    const list_eventos = []
    let title = ""
    let id = ""
    let resourceId = ""
    let recurso_id = ""
    let start = ""
    let end = ""
    let constraint = "businessHours"
    let evento = {}
    for (let i = 0; i < data.length; i++){
        title = data[i].title;
        id = data[i].id;
        resourceId = data[i].resourceId
        recurso_id = data[i].recurso_id
        start = data[i].start;
        end = data[i].end;
        evento = {id, title, start, end, resourceId, recurso_id, constraint}
        list_eventos.push(evento)
    }
    return list_eventos
}

export function generateDataTableConsultasEventos(data, local_id) {
    const list_eventos = []
    let title = ""
    let id = ""
    let resourceId = ""
    let recurso_id = ""
    let start = ""
    let end = ""
    let evento = {}
    for (let i = 0; i < data.length; i++){
        if (data[i].resourceId === local_id) {
            title = data[i].title;
            id = data[i].id;
            resourceId = data[i].resourceId
            recurso_id = data[i].recurso_id
            start = data[i].start;
            end = data[i].end;
            evento = {id, title, start, end, resourceId, recurso_id}
            list_eventos.push(evento)
        }
    }
    return list_eventos
}

export function generateDataTableConsultasRecursosEventos(data, data_locales, passed_recurso_id) {
    const list_eventos = []
    const locales = {}
    for (let a = 0; a < data_locales.length; a++) {
        locales[data_locales[a].id] = data_locales[a].title
    }
    let title = ""
    let id = ""
    let resourceId = ""
    let recurso_id = ""
    let start = ""
    let end = ""
    let evento = {}
    for (let i = 0; i < data.length; i++){
        if (data[i].recurso_id === passed_recurso_id) {
            let str = data[i].title
            let s = str.split(/(?<=^\S+)\s/)
            title = s[0] + " | " + locales[data[i].resourceId];
            id = data[i].id;
            resourceId = data[i].resourceId
            recurso_id = data[i].recurso_id
            start = data[i].start;
            end = data[i].end;
            evento = {id, title, start, end, resourceId, recurso_id}
            list_eventos.push(evento)
        }
    }
    return list_eventos
}

// Funtion to fetch Data for Locales

export async function fetchDataLocales() {
    const response = await fetch("http://localhost:5000/api/locales");
    const json = await response.json();
    const list_locales = generateDataTableLocales(json)
    return list_locales
}

// Funtion to generate Datatable for Locales

export function generateDataTableLocales(data) {
    const list_locales = []
    let title = ""
    let id = ""
    let startTime = ""
    let endTime = ""
    let turno = ""
    let businessHours = []
    let local = {}
    for (let i = 0; i < data.length; i++){
        id = data[i].id;
        title = data[i].title;
        let days = data[i].daysOfWeek;
        startTime = data[i].startTime;
        endTime = data[i].endTime;
        turno = data[i].turno;
        if (days === 1) {
            businessHours = [{
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: startTime,
                endTime: endTime
            }]
        }
        if (days === 2) {
            businessHours = [{
                daysOfWeek: [1, 2, 3, 4, 5],
                startTime: startTime,
                endTime: endTime
            }]
        }
        local = {id, title, turno, businessHours}
        list_locales.push(local)
    }
    return list_locales
}

// Funtion to fetch Data for Recursos

export async function fetchDataRecursos() {
    const response = await fetch("http://localhost:5000/api/recursos");
    const json = await response.json();
    const list_recursos = generateDataTableRecursos(json)
    return list_recursos
}

// Funtion to generate Datatable for Recursos

function generateDataTableRecursos(data) {
    const list_recursos = []
    let title = ""
    let id = 0
    let recurso = {}
    for (let i = 0; i < data.length; i++){
        title = data[i].title;
        id = data[i].id;
        recurso = {title, id}
        list_recursos.push(recurso)
    }
    return list_recursos
}

// Funtion to fetch Data for Licencias

export async function fetchDataLicencias() {
    const response = await fetch("http://localhost:5000/api/licencias");
    const json = await response.json();
    const list_licencias = generateDataTableLicencias(json);
    return list_licencias
}

// Funtion to generate Datatable for Licencias

function generateDataTableLicencias(data) {
    const list_licencias = []
    let title = ""
    let licencia_id = ""
    let recurso_id = ""
    let start = ""
    let end = ""
    let licencia = {}
    for (let i = 0; i < data.length; i++){
        title = data[i].title;
        licencia_id = data[i].licencia_id;
        recurso_id = data[i].recurso_id
        start = data[i].start
        end = data[i].end
        licencia = {title, licencia_id, recurso_id, start, end}
        list_licencias.push(licencia)
    }
    return list_licencias
}

export async function createEvent(value) {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    }
    const response = await fetch("http://localhost:5000/api/createEvent", settings);
    const eventos = await response.json()
    return eventos
}

export async function deleteEvent(event) {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    }
    const response = await fetch("http://localhost:5000/api/deleteEvent", settings);
    const eventos = await response.json()
    return eventos
}

export async function updateEvent(event) {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    }
    const response = await fetch("http://localhost:5000/api/updateEvent", settings);
    const eventos = await response.json()
    return eventos
}

