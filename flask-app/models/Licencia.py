from models.Base import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship, backref
import uuid

class Licencia(Base):
    """Class Licencia"""
    __tablename__ = 'licencia'
    licencia_id = Column(String(60), primary_key = True)
    start = Column(String(100))
    end = Column(String(100))

    def __init__(self, licencia_id, start, end):
        """Init Method"""
        self.start = start
        self.end = end
        self.licencia_id = licencia_id
