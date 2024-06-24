import sqlite3
conn = sqlite3.connect('letter-game.db')  # This will create a new database file named 'letter-game.db'
cursor = conn.cursor()
cursor.execute('SELECT * FROM users')
print(cursor.fetchall())

