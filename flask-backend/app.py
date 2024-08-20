from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
@app.route('/click', methods=['GET'])
def handle_click():
    print("got here!")
    print(request.headers)
    data = {
        'message' : 'hello from the backend!'
    }
    return jsonify(data)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():
    username  = request.form.get('username')
    password  = request.form.get('password')
    conn      = sqlite3.connect('letter-game.db')
    if(username == "admin" and password == "admin"):
         return render_template('users.html')

@app.route('/create_account', methods=['POST'])
def create_account():
    username = request.form.get('username')
    password    = request.form.get('password')
    conn = sqlite3.connect('letter-game.db')
    print(f'username is : {username}  and password :  {password}')
    # Create a cursor object
    cursor = conn.cursor()

    # Create  table
    cursor.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY, username TEXT, password TEXT, last_login TEXT)''')

    # Insert data into the table
    cursor.execute("INSERT INTO users (username, password, last_login) VALUES (? , ?)", (username, password, ""))
    conn.commit()
    return "Account Created!" # render_template('welcome.html', username=username)

if __name__ == '__main__':
    app.run(debug=True)
