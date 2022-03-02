#!/usr/bin/python3
"""Script to polulate Locales in Database"""
from models.Local import Local
from models.engine.db_storage import DBStorage
import itertools

storage = DBStorage()
storage.reload()

lista_id = ["3", "1", "15", "21", "22", "23", "24", "26", "27", "30", "31", "32", "33", "35", "36", "37", "40", "41", "42", "43", "45", "46"]
lista_locales = ["WEB", "RONDEAU", "MVD 1", "SAYAGO", "TRES CRUCES 1", "PORTONES", "MERCEDES", "COLONIA", "SALTO", "MVD 2", "COSTA 1", "COSTA 2", "PUNTA DEL ESTE 2", "TRES CRUCES 2", "NUEVOCENTRO", "PUNTA DEL ESTE 1", "MVDEO ACC", "NUEVOCENTRO ACC", "PAYSANDU", "LAS PIEDRAS", "PORTONES 1", "OCA"]
lista_zonas = ["Central", "Central", "Montevideo Shopping", "Devoto Sayago", "Tres Cruces", "Portones Shopping", "Mercedes", "Colonia", "Salto", "Montevideo Shopping", "Costa Urbana Shopping", "Costa Urbana Shopping", "Punta del este Shopping", "Tres Cruces Shopping", "Nuevocentro Shopping", "Punta del este Shopping", "Montevideo Shopping", "Nuevocentro Shopping", "Paysandy Shopping", "Las Piedras Shopping", "Portones Shopping", "Oca Metros"]
lista_correos = ["hectorr892@gmail.com", "rondeau@normisur.uy", "montevideo1@normisur.uy", "SAYAGO@NORMISUR.UY", "trescruces1@normisur.uy", "portones@normisur.uy", "mercedes@normisur.uy", "colonia@normisur.uy", "salto@normisur.uy", "montevideo2@normisur.uy", "costa1@normisur.uy", "costa2@normisur.uy", "puntadeleste2@normisur.uy", "trescruces2@normisur.uy", "nuevocentro@normisur.uy", "puntadeleste1@normisur.uy", "montevideoacc@normisur.uy", "nuevocentroacc@normisur.uy", "paysandu@normisur.uy", "laspiedras@normisur.uy", "portones1@normisur.uy", "metraje@normisur.uy"]

for (localid, local, zona, correo) in zip(lista_id, lista_locales, lista_zonas, lista_correos):
    local_kwargs = {}
    local_kwargs['local_id'] = localid
    local_kwargs['nombre'] = local
    local_kwargs['ubicacion'] = zona
    local_kwargs['correo'] = correo
    print(local_kwargs.values())
    
    local_obj = Local(**local_kwargs)

    print(local_obj)

    try:
        storage.new(local_obj)
        storage.save()
    except:
        print("No se pudo grabar el objeto", local, sys.exc_info()[0])
        raise

storage.close()
print("Se termino la polulacion")