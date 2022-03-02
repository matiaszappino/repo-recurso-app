from models.Base import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship, backref
import uuid

class Local(Base):
    """Class Local"""
    __tablename__ = 'local'
    local_id = Column(String(60), primary_key = True)
    nombre = Column(String(100))
    ubicacion = Column(String(100))
    correo = Column(String(100))
    daysOfWeek = Column(Integer)
    startTime = Column(String(100))
    endTime = Column(String(100))
    turno = Column(String(100))

    def __init__(self, local_id, nombre, ubicacion, correo, daysOfWeek, startTime, endTime, turno):
        self.local_id = local_id
        self.nombre = nombre
        self.ubicacion = ubicacion
        self.correo = correo
        self.daysOfWeek = daysOfWeek
        self.startTime = startTime
        self.endTime = endTime
        self.turno = turno
        """**kwargs if kwargs:
            for key, value in kwargs.items():
                #if key != "__class__":
                setattr(self, key, value)"""