from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from database import get_db_connection, init_db
import sqlite3

app = Flask(__name__)
CORS(app)  # Permite requisições do front-end

app.config['JWT_SECRET_KEY'] = 'sua-chave-secreta-aqui'  # Troque em produção
jwt = JWTManager(app)

# Inicializa o banco de dados
init_db()

# Rota de cadastro
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Usuário e senha obrigatórios'}), 400

    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (username, password) VALUES (?, ?)',
                     (username, password))
        conn.commit()
        return jsonify({'message': 'Usuário criado com sucesso'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Usuário já existe'}), 409
    finally:
        conn.close()

# Rota de login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ? AND password = ?',
                        (username, password)).fetchone()
    conn.close()

    if user:
        access_token = create_access_token(identity=username)
        return jsonify({'token': access_token}), 200
    else:
        return jsonify({'message': 'Credenciais inválidas'}), 401

# Rota de deletar usuário (apenas para usuário autenticado)
@app.route('/api/delete', methods=['DELETE'])
@jwt_required()
def delete():
    current_user = get_jwt_identity()
    conn = get_db_connection()
    conn.execute('DELETE FROM users WHERE username = ?', (current_user,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Usuário deletado'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)