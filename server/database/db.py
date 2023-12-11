import psycopg2
import os

try:
    #Make sure all the information matches with your postgres server
    connection = psycopg2.connect(
        user='postgres',
        password=os.environ.get('POSTGRES_PASSWORD'),
        port= '5433'
    )
    print("Successfully connected to the database.")
except:
    print("Could not successfully connect to the database")

# cursor = connection.cursor()
# create = "CREATE DATABASE logs;"
# cursor.execute(create)

