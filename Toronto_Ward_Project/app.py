import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/to_ward_project.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)
# Save references to each table
wards = Base.classes.Wards
crime2014 = Base.classes.Crime2014
crime2018 = Base.classes.Crime2018


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/income")
def income():

    return jsonify()

if __name__ == "__main__":
    app.run()
