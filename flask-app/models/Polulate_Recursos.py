#!/usr/bin/python3
"""Script to polulate Locales in Database"""
from models.Recurso import Recurso
from models.engine.db_storage import DBStorage
import itertools


storage = DBStorage()
storage.reload()

lista_id = ["49231218","52595269","51822023","54068963","43722423","51145782","53842300","47939808","56889723","57200891","44723020","46627327","51400918","44775023","53343724","52378421","47370959","45385728","54293728","45224752","54972534","50034867","47503374","54803234","51737751","53746774","51183281","51925704","53319371","49860306","55151341","52115289","47588102","55269451","40390124","46975013","48110920","52465387","45623201","46616433","55431125","44666254","54533936","51150224","48029137","48892368","46665064","49997822","53059082","46949656","49522538"]
lista_nombres = ["Abigail Giovana","Agustin ","Alexandra Sofía","Ana Florencia","Ana Karina","Andrea  Claudia","Antonella ","Camila Nazarena","Carla ","Diego Martin","Estefani Elizbeth","Federico ","Fernando Nicolás","Gisel ","Iván  Gabriel","Ivana Gabriela","Jessica ","Junior Leonel","Karen Beatriz","Lucia ","Maida Alejandra","Maira Lucia","Maria Sol","María Alexandra","Mariana  Agustina","Mariana Marylin","Marina Soledad","Matías Daniel","Melani Soledad","Nadia Ximena","Neftalí Ricardo","Oriana ","Oscar Elías","Patricia Joseline","Rocío ","Rodrigo ","Rodrígo ","Romina ","Ruben David","Rúben Alexis","Sebastián ","Sofia Jacqueline","Sofía Belén","Sol Yanina","Stephanie Vanessa","Valeria Dionara","Valeria Luján","Valeria Micaela","Vanessa Flavia","Victoria Guillemrina","Yesica Noemí"]
lista_apellidos = ["Pirez Piriz","Billotto Moreno","López Bula","Benítez Leal","Amado Pérez","Araújo Montesdeoca","Schanzembach Benítez","Luna Bonilla","Calventos Rossi","Araujo Méndez","Arévalo Bazquez","Rezk Mancuello","Muñiz Camacho","Moyano Zapata","Díaz  Laprovitera","Ylieff Andrieu","Torrano Urruzola","Caétano Valerio","Rodríguez Aguilar","Bosco Levrero","Trentini Morales","Olivera Perdomo","Severo Periera","Lasa Martínez","Lima Dos Santos","Cardozo Cardozo","Flores Valdez","Díaz Mesa","García  Alcaire","Feble Sedres","Clavijo Soria","Cabrera Silva","Amado Pérez","Alves Molina","Vázquez Grill","Machado da Silva Boedo","Berta Villizzio","Fernández Valdez","Gil Riva","Falcon Acosta","Belo Torres","Moran Morales","García  López","Penino Rosende","Fernández Veleda","Miranda Derquis","Limischuck Vacaro","Mallada Morlino","Ocampo Di Ruocco","Arrionda Pérez","Barboza Cabrera"]

for (recurso_id, recurso_nombre, recurso_apellido) in zip(lista_id, lista_nombres, lista_apellidos):
    recurso_kwargs = {}
    recurso_kwargs['recurso_id'] = recurso_id
    recurso_kwargs['nombre'] = recurso_nombre
    recurso_kwargs['apellido'] = recurso_apellido
    print(recurso_kwargs.values())
    
    recurso_obj = Recurso(**recurso_kwargs)

    print(recurso_obj)

    try:
        storage.new(recurso_obj)
        storage.save()
    except:
        print("No se pudo grabar el objeto", recurso, sys.exc_info()[0])
        raise

storage.close()
print("Se termino la polulacion")