from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Integer, ForeignKey, Table
from sqlalchemy.orm import backref, relationship
from models.Base import Base

class Relationship_RE(Base):
    """Class Relationship_RE"""
    __tablename__ = 'relationship_re'
    recurso_id = Column(String(60), ForeignKey('recurso.recurso_id'), primary_key=True)
    evento_id = Column(String(60), ForeignKey('evento.evento_id'), primary_key=True)
    relation = relationship("Recurso")

    def __init__(self, recurso_id, evento_id):
        """Constructor"""
        self.recurso_id = recurso_id
        self.evento_id = evento_id
