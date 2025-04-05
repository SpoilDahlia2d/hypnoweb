from flask import Flask, jsonify, render_template
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get-images")
def get_images():
    image_folder = "static/images"
    images = [f for f in os.listdir(image_folder) if f.lower().endswith((".png", ".jpg", ".jpeg", ".gif"))]
    return jsonify(images)

if __name__ == "__main__":
    app.run(debug=True)
