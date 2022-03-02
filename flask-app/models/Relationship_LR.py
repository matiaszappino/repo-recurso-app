from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Float, Integer, ForeignKey, Table
from sqlalchemy.orm import backref, relationship
from models.Base import Base

class Relationship_LR(Base):
    """Class Relationship_LR"""
    __tablename__ = 'relationship_lr'
    licencia_id = Column(String(60), ForeignKey('licencia.licencia_id'), primary_key=True)
    recurso_id = Column(String(60), ForeignKey('recurso.recurso_id'), primary_key=True)
    relation = relationship("Licencia")

    def __init__(self, licencia_id, recurso_id):
        """Contructor"""
        self.licencia_id = licencia_id
        self.recurso_id = recurso_id

