from flask import Flask, render_template, request, url_for

app = Flask(__name__)

url_for


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello/<name>')
def hello(name):
    return f'''
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>页面标题</title>
    </head>
    <body>
    
    <content class="container">
    <div class="row">
        <div class="col-md-12">
        <h1>页面标题</h1>
        <p>你好：{name}</p>
        </div>
    </div>
    </content>
    </body>
</html>
'''


@app.route('/book/<id>', methods=['POST'])
def books(id):
    # print(request.method)       # 请求方法
    # print(request.headers)      # 请求的headers
    # print(request.path)         # 资源路径
    # print(request.url)          # 完整的url
    # print(request.remote_addr)  # 客户端IP
    # print(request.cookies)      # 请求的cookie
    # print(request.args)         # 请求的参数
    print(request.form)         # 请求的表单
    # pic = request.files['picture']
    # pic.save(f'./static/{pic.filename}')
    # res = process_img(pic)
    # print(request.files['picture'])
    return id


if __name__ == '__main__':
    app.run(debug=True, port=5000)
