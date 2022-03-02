from models.Base import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship, backref
import uuid

class Evento(Base):
    """Class Evento"""
    __tablename__ = 'evento'
    evento_id = Column(String(60), primary_key = True)
    recurso_id = Column(String(60))
    resourceId = Column(String(60))
    title = Column(String(100))
    start = Column(String(100))
    end = Column(String(100))

    def __init__(self, evento_id, recurso_id, resourceId, title, start, end):
        """Init Method"""
        self.title = title
        self.start = start
        self.end = end
        self.evento_id = evento_id
        self.recurso_id = recurso_id
        self.resourceId = resourceId
