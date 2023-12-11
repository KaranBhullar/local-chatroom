import psycopg2
from psycopg2.extras import Json
from psycopg2.extensions import register_adapter
import os

class db:
    def __init__(self):
        register_adapter(dict, Json)

        DATABASE_CONFIG = { 
            "database": "logs", 
            "user": "postgres", 
            "password": os.environ.get('POSTGRES_PASSWORD'), 
            "host": "localhost", 
            "port":  5433, 
        } 

        #Make sure all the information matches with your postgres server
        self.connection = psycopg2.connect(
            database= DATABASE_CONFIG["database"],
            user=DATABASE_CONFIG["user"],
            password=DATABASE_CONFIG["password"],
            host=DATABASE_CONFIG["host"],
            port= DATABASE_CONFIG["port"]
        )
        self.connection.autocommit = True
        self.cursor = self.connection.cursor()

        table_info = '''
        CREATE TABLE IF NOT EXISTS chat_data (
            username VARCHAR(255) NOT NULL,
            timestamp BIGINT,
            message VARCHAR(300) NOT NULL
        )
        '''
        self.cursor.execute(table_info)

    def insert(self, message_data):
        self.cursor.execute("INSERT INTO chat_data (username, timestamp, message) VALUES (%s, %s, %s)", (message_data['username'], message_data['timestamp'], message_data['message']))