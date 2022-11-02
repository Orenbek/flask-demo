from flask import Flask, jsonify, render_template, request, url_for
import os

app = Flask(__name__)
url_for


@app.route('/')
def index():
    return render_template('index.html')

# 保存文件夹图片


@app.route('/upload', methods=['POST'])
def upload():
    for key, value in request.files.items():
        os.makedirs(f'./static/imgs/{os.path.dirname(key)}', exist_ok=True)
        value.save(f'./static/imgs/{key}')
    return jsonify({'code': 0})

# 获取图片信息


@app.route('/imginfo', methods=['POST'])
def imginfo():
    img = request.files['img']
    print(img)
    return jsonify({'code': 0, 'data': {
        'name': img.filename,
        'size': img.content_length,
    }})

# 获取文件夹图片


@app.route('/getimgs', methods=['GET'])
def getimgs():
    imgs = []
    for root, subdirs, files in os.walk('./static/imgs'):
        for file in files:
            imgs.append(os.path.join(root, file))
    return jsonify({'code': 0, 'data': imgs})

# 删除图片


@app.route('/delete', methods=['POST'])
def delete():
    os.remove(request.form['path'])
    return jsonify({'code': 0})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
