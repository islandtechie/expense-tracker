from dotenv import load_dotenv
import sys
import os

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import  declarative_base
from sqlalchemy import create_engine
from sqlalchemy import sessionmaker

load_dotenv()
connection_string = "postgresql://{}:{}@{}/{}".format(os.environ.get('PGUSER'), os.environ.get('PGPASSWORD'), os.environ.get('PGHOST'), os.environ.get('PGDATABASE'))
engine = create_engine(connection_string)
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    firstname = Column(String(255), nullable=False)
    lasttname = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    registered = Column(DateTime, nullable=False)

class Expenses(Base):
    __tablename__ = 'expenses'

    id = Column(Integer, primary_key=True)
    expense_date = Column(DateTime, nullable=False)
    description = Column(String(255), nullable=False)
    purchase_place = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    created = Column(DateTime, nullable=False)
    modified = Column(DateTime, nullable=False)

class Auth(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    firstname = Column(String(255), nullable=False)
    lasttname = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    registered = Column(DateTime, nullable=False)

Base.metadata.create_all(engine)