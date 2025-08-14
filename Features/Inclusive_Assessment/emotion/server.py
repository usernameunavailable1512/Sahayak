from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    return send_from_directory(current_dir, 'index.html')

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory(current_dir, path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 8000))) 