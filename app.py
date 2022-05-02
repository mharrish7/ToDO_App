
import json
from flask import Flask,render_template,request,jsonify
from flask_pymongo import PyMongo,ObjectId

DB_URL = 'mongodb+srv://Harrish7:mharrish7@cluster0.hrcej.mongodb.net/test?retryWrites=true&w=majority'

app = Flask(__name__)
mongo = PyMongo(app,uri = DB_URL)
db = mongo.db
@app.route('/')
def home():
    data = db.todos.find()
    return render_template('index.html',datas = data)

@app.route('/add',methods = ['POST'])
def add():
    try:
        t = request.form['title']
        c = request.form['content']
        if t or c:
            te = db.todos.insert_one({'title' : t,'content' : c})
        print(te.inserted_id)
        return jsonify({'id': str(te.inserted_id),'title' : t,'content' : c})
    except:
        return jsonify({'title':'error','content':'er'})


@app.route('/del',methods = ['POST'])
def delete():
    db.todos.delete_many({})

    return jsonify({'suc':'1'})


@app.route('/done', methods = ['POST'])
def done():
    try:
        id = request.form['id']
        a = id.split()
        db.todos.delete_one({'_id':ObjectId(a[1])})
        return jsonify({'suc':a[1]})
    except:
        return jsonify({'suc':0})

if __name__ == '__main__':
    app.run(debug=True)