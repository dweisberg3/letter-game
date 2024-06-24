from flask import Flask, request, render_template
import sqlite3

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/create_account', methods=['POST'])
def create_account():
    username = request.form.get('username')
    password    = request.form.get('password')
    conn = sqlite3.connect('letter-game.db')
    print(f'username is : {username}  and password :  {password}')
    # Create a cursor object
    cursor = conn.cursor()

    # Create a table
    cursor.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY, username TEXT, password TEXT)''')

    # Insert data into the table
    cursor.execute("INSERT INTO users (username, password) VALUES (? , ?)", (username, password))
    conn.commit()
    return render_template('welcome.html', username=username)

if __name__ == '__main__':
    app.run(debug=True)
