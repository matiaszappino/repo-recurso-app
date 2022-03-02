from models.engine.db_storage import DBStorage
from models.Local import Local
from models.Recurso import Recurso
from models.Evento import Evento

storage = DBStorage()
storage.reload()