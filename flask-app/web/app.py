from flask import Flask, jsonify
from flask import render_template
from flask_cors import CORS
from models.Recurso import Recurso
from models.Local import Local
from models.Evento import Evento
from models.Licencia import Licencia
import models as models
import json
from flask import request
from logging.handlers import WatchedFileHandler, logging



app = Flask(__name__, static_folder="../../react-app/build", static_url_path="/")
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.before_first_request
def setup_logging():
    """
    Setup logging
    """
    handler = WatchedFileHandler("flask_app.log")
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.INFO)

@app.route('/')
def index():
    return app.send_static_file("index.html")

"""------------------------Locales------------------------------"""

@app.route('/api/locales', methods=["GET", "POST"])
def list_of_locales():
    list_of_locales = models.storage.get_list(Local)
    list_of_locales_adapted = locales_adapting(list_of_locales)
    return json.dumps(list_of_locales_adapted)

def locales_adapting(lista):
    adapted_lista = []
    for key, value in lista.items():
        new_dict = {}
        new_dict['title'] = lista[key]['nombre']
        new_dict['id'] = lista[key]['local_id']
        new_dict['daysOfWeek'] = lista[key]['daysOfWeek']
        new_dict['startTime'] = lista[key]['startTime']
        new_dict['endTime'] = lista[key]['endTime']
        new_dict['turno'] = lista[key]['turno']
        adapted_lista.append(new_dict)
    return adapted_lista

@app.route('/api/createLocal', methods=["GET", "POST"])
def create_local():
    "Creates a new event in the Database"
    try:
        jsonData = request.get_json()
        models.storage.save_local(jsonData)
    except Exception as error:
        pass
    finally:
        list_of_locales_adapted = list_of_locales()
        return list_of_locales_adapted

@app.route('/api/deleteLocal', methods=["GET", "POST"])
def delete_the_local():
    "Deletes event from Database"
    try:
        jsonData = request.get_json()
        models.storage.delete_local(jsonData)
    except Exception as error:
        pass
    finally:
        list_of_locales_adapted = list_of_locales()
        return list_of_locales_adapted


"""------------------------Recursos------------------------------"""


@app.route('/api/recursos', methods=["GET", "POST"])
def list_of_recursos():
    list_of_recursos = models.storage.get_list(Recurso)
    list_of_recursos_adapted = recursos_adapting(list_of_recursos)
    return json.dumps(list_of_recursos_adapted)

def recursos_adapting(lista):
    adapted_lista = []
    for key, value in lista.items():
        new_dict = {}
        new_dict['title'] = lista[key]['nombre'] + " " + lista[key]['apellido']
        new_dict['id'] = lista[key]['recurso_id']
        adapted_lista.append(new_dict)
    return adapted_lista

@app.route('/api/createRecurso', methods=["GET", "POST"])
def create_recurso():
    "Creates a new event in the Database"
    try:
        jsonData = request.get_json()
        models.storage.save_recurso(jsonData)
    except Exception as error:
        pass
    finally:
        list_of_recursos_adapted = list_of_recursos()
        return list_of_recursos_adapted

@app.route('/api/deleteRecurso', methods=["GET", "POST"])
def delete_recurse():
    "Deletes event from Database"
    try:
        jsonData = request.get_json()
        models.storage.delete_recurso(jsonData)
    except Exception as error:
        pass
    finally:
        list_of_recursos_adapted = list_of_recursos()
        return list_of_recursos_adapted

    
    
"""------------------------Eventos------------------------------"""

@app.route('/api/eventos', methods=["GET", "POST"])
def list_of_eventos():
    list_of_eventos = models.storage.get_list(Evento)
    list_of_eventos_adapted = eventos_adapting(list_of_eventos)
    return json.dumps(list_of_eventos_adapted)

def eventos_adapting(lista):
    adapted_lista = []
    for key, value in lista.items():
        new_dict = {}
        new_dict['id'] = lista[key]['evento_id']
        new_dict['recurso_id'] = lista[key]['recurso_id']
        new_dict['resourceId'] = lista[key]['resourceId']
        new_dict['title'] = lista[key]['title']
        new_dict['start'] = lista[key]['start']
        new_dict['end'] = lista[key]['end']
        adapted_lista.append(new_dict)
    return adapted_lista

@app.route('/api/createEvent', methods=["GET", "POST"])
def create_event():
    "Creates a new event in the Database"
    try:
        jsonData = request.get_json()
        print(jsonData)
        models.storage.save_evento(jsonData)
    except Exception as error:
        pass
    finally:
        list_of_eventos_adapted = list_of_eventos()
        return list_of_eventos_adapted

@app.route('/api/updateEvent', methods=["GET", "POST"])
def update_event():
    "Creates a new event in the Database"
    try:
        jsonData = request.get_json()
        print("Json Data en Update", jsonData)
        models.storage.update_evento(jsonData)
    except Exception as error:
        pass
    finally:
        list_of_eventos_adapted = list_of_eventos()
        return list_of_eventos_adapted

@app.route('/api/deleteEvent', methods=["GET", "POST"])
def delete_event():
    "Deletes event from Database"
    try:
        jsonData = request.get_json()
        models.storage.delete_evento(jsonData)
    except Exception as error:
        pass
    finally:
        list_of_eventos_adapted = list_of_eventos()
        return list_of_eventos_adapted


"""------------------------Licencias------------------------------"""


@app.route('/api/licencias', methods=["GET", "POST"])
def list_of_licencias():
    list_of_licencias = models.storage.get_list(Licencia)
    list_of_licencias_adapted = licencias_adapting(list_of_licencias)
    return json.dumps(list_of_licencias_adapted)

def licencias_adapting(lista):
    adapted_lista = []
    for key, value in lista.items():
        new_dict = {}
        new_dict['licencia_id'] = lista[key]['licencia_id']
        new_dict['recurso_id'] = lista[key]['recurso_id']
        new_dict['title'] = lista[key]['nombre'] + " " + lista[key]['apellido']
        new_dict['start'] = lista[key]['start']
        new_dict['end'] = lista[key]['end']
        adapted_lista.append(new_dict)
    return adapted_lista

@app.route('/api/createLicencia', methods=["GET", "POST"])
def create_license():
    "Creates a new event in the Database"
    try:
        jsonData = request.get_json()
        print(jsonData)
        models.storage.save_licencia(jsonData)
    except Exception as error:
        pass
    finally:
        list_of_licencias_adapted = list_of_licencias()
        return list_of_licencias_adapted

@app.route('/api/deleteLicencia', methods=["GET", "POST"])
def delete_license():
    "Deletes a licencia from the Database"
    try:
        jsonData = request.get_json()
        print(jsonData)
        models.storage.delete_licencia(jsonData)
    except Exception as error:
        pass
    finally:
        list_of_licencias_adapted = list_of_licencias()
        return list_of_licencias_adapted

