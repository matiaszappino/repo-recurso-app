from models.Base import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship, backref
import uuid

class Recurso(Base):
    """Class Recurso"""
    __tablename__ = 'recurso'
    recurso_id = Column(String(60), primary_key = True)
    nombre = Column(String(100))
    apellido = Column(String(100))

    def __init__(self, recurso_id, nombre, apellido):
        self.recurso_id = recurso_id
        self.nombre = nombre
        self.apellido = apellido
        
        """**kwargs if kwargs:
            for key, value in kwargs.items():
                #if key != "__class__":
                setattr(self, key, value)"""

