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
engine = create_engine("sqlite:///db/to_ward_project.sqlite")
session = Session(engine)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)
# Save references to each table
wards = Base.classes.Wards
crime2014 = Base.classes.Crime2014
crime2018 = Base.classes.Crime2018


@app.route("/")
def characteristics():
    """Return the homepage."""
    return render_template("homepage.html")

@app.route("/wards")
def wards_data():
    # return the ward characteristic data
    ward = db.session.query(wards.Ward, 
                            wards.Owned_2016,
                            wards.Rental_2016,
                            wards.hh_with_children_2016,
                            wards.Owned_2011,
                            wards.Rental_2011,
                            wards.hh_with_children_2011
                            ).\
                            order_by(wards.Ward).all()
    warddata = []
    plot_dict = {
        'wards': [],
        'owned_2016': [],
        'rental_2016': [],
        'hh_with_children_2016': [],
        'owned_2011': [],
        'rental_2011': [],
        'hh_with_children_2011': [],
    }
    for row in ward:
        plot_dict['wards'].append(row.Ward)
        plot_dict['owned_2016'].append(row.Owned_2016)
        plot_dict['rental_2016'].append(row.Rental_2016)
        plot_dict['hh_with_children_2016'].append(row.hh_with_children_2016)
        plot_dict['owned_2011'].append(row.Owned_2011)
        plot_dict['rental_2011'].append(row.Rental_2011)
        plot_dict['hh_with_children_2011'].append(row.hh_with_children_2011)
    print(warddata)
    return jsonify(plot_dict)


if __name__ == "__main__":
    app.run()