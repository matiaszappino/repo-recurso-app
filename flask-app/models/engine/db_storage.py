#!/usr/bin/python3
"""Class DBStorage"""
from sqlalchemy import create_engine, select
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import text
from models.Base import Base
from models.Recurso import Recurso
from models.Evento import Evento
from models.Local import Local
from models.Licencia import Licencia
from models.Relationship_EL import Relationship_EL
from models.Relationship_RE import Relationship_RE
from models.Relationship_LR import Relationship_LR


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format('recursos_dev',
                                             'recupass',
                                             'localhost',
                                             'recursos'), pool_size=100, max_overflow=0)

    def all(self, cls=None):
        """Query on the current database session"""
        objs = self.__session.query(cls)
        return objs

    def new(self, obj):
        """Add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """Commit all changes of the current database session"""
        self.__session.commit()

    def reload(self):
        """Reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """Call remove() method on the private session attribute"""
        self.__session.remove()

    def get_object(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls is Recurso:
            objeto = self.__session.query(cls).filter_by(recurso_id=id).first()
            return objeto
        if cls is Evento:
            objeto = self.__session.query(cls).filter_by(evento_id=id).first()
            return objeto
        if cls is Local:
            objeto = self.__session.query(cls).filter_by(local_id=id).first()
            return objeto
        return None

    def get_list(self, cls):
        """Returns a list of certain class"""
        if cls is Recurso:
            list_of_recursos = {}
            for instance in self.__session.query(Recurso):
                new_dict = {}
                for key, value in instance.__dict__.items():
                    if key != '_sa_instance_state':
                        new_dict[key] = value
                list_of_recursos[instance.__dict__['recurso_id']] = new_dict
            return list_of_recursos

        if cls is Evento:
            list_of_eventos = {}
            for instance in self.__session.query(Evento):
                new_dict = {}
                for key, value in instance.__dict__.items():
                    if key != '_sa_instance_state':
                        new_dict[key] = value
                        list_of_eventos[instance.__dict__['evento_id']] = new_dict
            return list_of_eventos
        
        if cls is Local:
            list_of_locales = {}
            for instance in self.__session.query(Local):
                new_dict = {}
                for key, value in instance.__dict__.items():
                    if key != '_sa_instance_state':
                        new_dict[key] = value
                list_of_locales[instance.__dict__['local_id']] = new_dict
            return list_of_locales

        if cls is Licencia:
            list_of_licencias = {}
            statement = text("""select licencia.licencia_id, licencia.start, licencia.end, recurso.recurso_id, recurso.nombre, recurso.apellido from licencia, recurso, relationship_lr where licencia.licencia_id=relationship_lr.licencia_id and recurso.recurso_id=relationship_lr.recurso_id""")
            query_obj = self.__session.execute(statement)
            for query in query_obj:
                new_dict = {}
                new_dict["licencia_id"] = query.licencia_id
                new_dict["recurso_id"] = query.recurso_id
                new_dict["start"] = query.start
                new_dict["end"] = query.end
                new_dict["nombre"] = query.nombre
                new_dict["apellido"] = query.apellido
                list_of_licencias[query.licencia_id] = new_dict
            return list_of_licencias
        
        return None

    def save_evento(self, object):
        '''Save events in MySQL table'''
        storage = DBStorage()
        storage.reload()
        evento = Evento(object["id"], object["recurso_id"], object["resourceId"], object["title"], object["start"], object["end"])
        try:
            storage.new(evento)
            storage.save()
        except Exception as error:
            print(evento.__dict__, error)
        relation_EL = Relationship_EL(object["id"], object["resourceId"])
        print(relation_EL.__dict__)
        try:    
            storage.new(relation_EL)
            storage.save()
        except Exception as error:
            print(relation_EL.__dict__, error)
        relation_RE = Relationship_RE(object["recurso_id"], object["id"])
        print(relation_RE.__dict__)
        try:
            storage.new(relation_RE)
            storage.save()
        except Exception as error:
            print(relation_RE.__dict__, error)
        storage.close()

    def update_evento(self, object):
        '''Update events in MySQL table'''
        storage = DBStorage()
        storage.reload()
        try:
            relation_EL = self.__session.query(Relationship_EL).filter_by(evento_id=object["id"]).first()
            relation_EL.local_id = object["resourceId"]
            self.__session.commit()
        except Exception as err:
            print(err)
        try:
            evento = self.__session.query(Evento).filter_by(evento_id=object["id"]).first()
            evento.resourceId = object["resourceId"]
            evento.start = object["start"]
            evento.end = object["end"]
            self.__session.commit()
        except Exception as err:
            print(err)  
        storage.close()

    def delete_evento(self, evento):
        """Deletes an event from the database"""
        storage = DBStorage()
        storage.reload()
        evento_id = evento["id"]
        try:
            relation_EL = self.__session.query(Relationship_EL).filter_by(evento_id=evento_id).first()
            self.__session.delete(relation_EL)
            relation_RE = self.__session.query(Relationship_RE).filter_by(evento_id=evento_id).first()
            self.__session.delete(relation_RE)
            evento = self.__session.query(Evento).filter_by(evento_id=evento_id).first()
            self.__session.delete(evento)
            self.__session.commit()
        except Exception as err:
            print(err)
        storage.close()

    """---------------------Licencia--------------------------"""

    def save_licencia(self, object):
        '''Save events in MySQL table'''
        storage = DBStorage()
        storage.reload()
        licencia = Licencia(object["licencia_id"], object["start"], object["end"])
        try:
            storage.new(licencia)
            storage.save()
        except Exception as error:
            print(evento.__dict__, error)
        relation_LR = Relationship_LR(object["licencia_id"], object["recurso_id"])
        try:    
            storage.new(relation_LR)
            storage.save()
        except Exception as error:
            print(relation_EL.__dict__, error)
        storage.close()

    def delete_licencia(self, licencia):
        """Deletes an event from the database"""
        storage = DBStorage()
        storage.reload()
        licencia_id = licencia["licenciaId"]
        recurso_id = licencia["recursoId"]
        try:
            relation_LR = self.__session.query(Relationship_LR).filter_by(licencia_id=licencia_id).first()
            self.__session.delete(relation_LR)
            licencia = self.__session.query(Licencia).filter_by(licencia_id=licencia_id).first()
            self.__session.delete(licencia)
            self.__session.commit()
        except Exception as err:
            print(err)
        storage.close()

    """---------------------Recurso--------------------------"""

    def save_recurso(self, object):
        '''Save events in MySQL table'''
        storage = DBStorage()
        storage.reload()
        try:
            recurso = Recurso(object["recurso_id"], object["nombre"], object["apellido"])
        except Exception as err:
            print(err)
        try:
            storage.new(recurso)
            storage.save()
        except Exception as error:
            print(recurso.__dict__, error)
        storage.close()

    def delete_recurso(self, recurso):
        """Deletes an event from the database"""
        storage = DBStorage()
        storage.reload()
        recurso_id = recurso["recursoId"]
        try:
            """List of eventos where recurso_id is found"""
            list_of_query = {}
            statement = text("select * from evento where evento.recurso_id=:recurso").params(recurso=recurso_id)
            query_obj = self.__session.execute(statement)
            for query in query_obj:
                new_dict = {}
                new_dict["evento_id"] = query.evento_id
                new_dict["recurso_id"] = query.recurso_id
                new_dict["resourceId"] = query.resourceId
                new_dict["title"] = query.title
                new_dict["start"] = query.start
                new_dict["end"] = query.end
                list_of_query[query.evento_id] = new_dict

            for key, value in list_of_query.items():
                try:
                    relation_EL_eventos = self.__session.query(Relationship_EL).filter_by(evento_id=key).first()
                    print(key)
                    print(relation_EL_eventos)
                    self.__session.delete(relation_EL_eventos)
                except Exception as err:
                    print(err)
                try:
                    relation_RE_eventos = self.__session.query(Relationship_RE).filter_by(evento_id=key).first()
                    self.__session.delete(relation_RE_eventos)
                except Exception as err:
                    print(err)
            try:
                eventos = self.__session.query(Evento).filter_by(recurso_id=recurso_id).all()
                relation_RE = self.__session.query(Relationship_RE).filter_by(recurso_id=recurso_id).all()
                relation_LR = self.__session.query(Relationship_LR).filter_by(recurso_id=recurso_id).all()
                recurso = self.__session.query(Recurso).filter_by(recurso_id=recurso_id).first()
                for re in relation_RE:
                    self.__session.delete(re)
                for lr in relation_LR:
                    self.__session.delete(lr)
                """Delete Licencias"""
                list_of_licencias = self.get_list(Licencia)
                print("List", list_of_licencias)
                for key, value in list_of_licencias.items():
                    if value["recurso_id"] == recurso_id:
                        try:
                            licencia = self.__session.query(Licencia).filter_by(licencia_id=key).first()
                            self.__session.delete(licencia)
                        except Exception as err:
                            print(err)
                for evento in eventos:
                    self.__session.delete(evento)
                self.__session.delete(recurso)
            except Exception as err:
                print(err)
            self.__session.commit()
        except Exception as err:
            print(err)
        storage.close()


    """---------------------Local--------------------------"""

    def save_local(self, object):
        '''Save events in MySQL table'''
        storage = DBStorage()
        storage.reload()
        try:
            local = Local(object["local_id"], object["nombre"], object["ubicacion"], object["correo"], object["daysOfWeek"], object["startTime"], object["endTime"], object["turno"])
        except Exception as err:
            print(err)
        try:
            storage.new(local)
            storage.save()
        except Exception as error:
            print(local.__dict__, error)
        storage.close()

    def delete_local(self, local):
        """Deletes an event from the database"""
        storage = DBStorage()
        storage.reload()
        local_id = local["local_id"]
        try:
            """List of eventos where local_id is found"""
            list_of_query = {}
            statement = text("select * from evento where evento.resourceId=:local").params(local=local_id)
            query_obj = self.__session.execute(statement)
            for query in query_obj:
                new_dict = {}
                new_dict["evento_id"] = query.evento_id
                new_dict["recurso_id"] = query.recurso_id
                new_dict["resourceId"] = query.resourceId
                new_dict["title"] = query.title
                new_dict["start"] = query.start
                new_dict["end"] = query.end
                list_of_query[query.evento_id] = new_dict

            for key, value in list_of_query.items():
                try:
                    relation_EL_eventos = self.__session.query(Relationship_EL).filter_by(evento_id=key).first()
                    print(key)
                    print(relation_EL_eventos)
                    self.__session.delete(relation_EL_eventos)
                except Exception as err:
                    print(err)
                try:
                    relation_RE_eventos = self.__session.query(Relationship_RE).filter_by(evento_id=key).first()
                    self.__session.delete(relation_RE_eventos)
                except Exception as err:
                    print(err)
            try:
                eventos = self.__session.query(Evento).filter_by(resourceId=local_id).all()
                relation_EL = self.__session.query(Relationship_EL).filter_by(local_id=local_id).all()
                local = self.__session.query(Local).filter_by(local_id=local_id).first()
                for el in relation_EL:
                    self.__session.delete(el)
                for evento in eventos:
                    self.__session.delete(evento)
                self.__session.delete(local)
            except Exception as err:
                print(err)
            self.__session.commit()
        except Exception as err:
            print(err)
        storage.close()