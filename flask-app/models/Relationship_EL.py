from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Integer, ForeignKey, Table
from sqlalchemy.orm import backref, relationship
from models.Base import Base

class Relationship_EL(Base):
    """Class Relationship_EL"""
    __tablename__ = 'relationship_el'
    evento_id = Column(String(60), ForeignKey('evento.evento_id'), primary_key=True)
    local_id = Column(String(60), ForeignKey('local.local_id'), primary_key=True)
    relation = relationship("Evento")

    def __init__(self, evento_id, local_id):
        """Contructor"""
        self.evento_id = evento_id
        self.local_id = local_id

