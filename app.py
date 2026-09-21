from flask import Flask, render_template
import os

app = Flask(__name__)


@app.route("/")
def home():

    photos_folder = os.path.join(
        app.static_folder,
        "photos"
    )

    photos = []

    for filename in os.listdir(photos_folder):

        if filename.lower().endswith(
            (".jpg", ".jpeg", ".png", ".webp")
        ):
            photos.append(filename)

    photos.sort()

    return render_template(
        "index.html",
        photos=photos
    )


if __name__ == "__main__":
    app.run(debug=True)