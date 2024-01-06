import os
from flask import Flask, render_template, request, redirect, url_for, send_from_directory, session, flash
from flask_restful import abort
from flask import jsonify
import os
from flask import session

app = Flask(__name__, static_folder='static')
current_folder = os.path.dirname(os.path.abspath(__file__))
app.config['UPLOAD_FOLDER'] = current_folder+'\\uploads'
app.secret_key = 'your_secret_key'  # 更改为一个安全的密钥

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/comment', methods=['POST'])
def add_comment():
    global comments
    data = request.json
    comment = {
        'time': data['time'],
        'text': data['text']
    }
    comments.append(comment)
    return jsonify(success=True)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        if username == '郑颖' or username == "2024":
            session['username'] = username
            return redirect(url_for('home'))
        else:
            flash('Invalid username or password', 'error')
    return render_template('login.html')

@app.route('/')
def home():
    if 'username' not in session:
        return redirect(url_for('login'))
    videos = sorted([video for video in os.listdir(app.config['UPLOAD_FOLDER']) if video.endswith('.mp4')])
    return render_template('videos.html', videos=videos)

@app.route('/watch/<filename>')
def watch_video(filename):
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(video_path):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    else:
        abort(404)

if __name__ == '__main__':
    # 确保上传文件夹存在
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    comments = []
    app.run(host="0.0.0.0", port=5001)
