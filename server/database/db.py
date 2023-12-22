import sqlite3

class db:
    def __init__(self) -> None:
        self.connection = sqlite3.connect('database/database.db', check_same_thread=False)
        self.cursor = self.connection.cursor()
        
    def insert(self, message_data: list) -> None:
        self.cursor.execute("INSERT INTO chat_data (username, timestamp, message) VALUES (?, ?, ?)", (message_data['username'], message_data['timestamp'], message_data['message']))
        self.connection.commit()
        
        res = self.cursor.execute("SELECT * FROM chat_data")
        print(res.fetchall())
