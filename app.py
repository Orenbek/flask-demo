from flask import Flask, jsonify, render_template, request, url_for
import os

app = Flask(__name__)
url_for

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    for key, value in request.files.items():
        os.makedirs(f'./static/imgs/{os.path.dirname(key)}', exist_ok=True)
        value.save(f'./static/imgs/{key}')
    return jsonify({'code': 0})

@app.route('/test', methods=['POST'])
def test():
    img = request.files['img']
    print(img)
    return jsonify({'code': 0, 'data': {
        'name': img.filename,
        'size': img.content_length,
    }})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
