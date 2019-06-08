import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import text

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/to_ward_project.sqlite"
engine = create_engine("sqlite:///db/to_ward_project.sqlite")
session = Session(engine)

db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)
# Save references to each table
wards = Base.classes.Wards
crime14 = Base.classes.Crime2014
crime18 = Base.classes.Crime2018


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/map/income")
def map_income():
    """Return `Ward`, and `yoy_incomemedian_change`."""
    sel = [
        wards.Ward,
        wards.yoy_incomemedian_change
    ]

    results = db.session.query(*sel).order_by(wards.Ward).all()

    warddata = []
    for row in results:
        ward_dict = {}
        ward_dict['Ward'] = row.Ward
        ward_dict['Median Income Change'] = row.yoy_incomemedian_change
        warddata.append(ward_dict)

    return jsonify(warddata)


@app.route("/map/crime14")
def map_crime14():
    """Return `crime, Neighbourhood, Lat, Long`."""
    sel = [
        crime14.crime,
        crime14.Neighbourhood,
        crime14.Lat,
        crime14.Long,
    ]

    results = db.session.query(*sel).order_by(crime14.crime).all()

    crime14data = []
    for row in results:
        crime14_dict = {}
        crime14_dict['crime'] = row.crime
        crime14_dict['Neighbourhood'] = row.Neighbourhood
        crime14_dict['Lat']= row.Lat
        crime14_dict['Long']= row.Long
        crime14data.append(crime14_dict)

    return jsonify(crime14data)


@app.route("/map/crime18")
def map_crime18():
    """Return `crime, Neighbourhood, Lat, Long`."""
    sel = [
        crime18.crime,
        crime18.Neighbourhood,
        crime18.Lat,
        crime18.Long,
    ]

    results = db.session.query(*sel).order_by(crime18.crime).all()

    crime18data = []
    for row in results:
        crime18_dict = {}
        crime18_dict['crime'] = row.crime
        crime18_dict['Neighbourhood'] = row.Neighbourhood
        crime18_dict['Lat']= row.Lat
        crime18_dict['Long']= row.Long
        crime18data.append(crime18_dict)

    return jsonify(crime18data)

@app.route("/barplot")
def createbarplot():

# canadadevlynbarplot data retrieve
    barplot = db.session.query(wards.Ward, wards.incomeaverage2015, wards.incomeaverage2010, wards.incomemedian2015, wards.incomemedian2010).\
            order_by(wards.Ward).all()
    
    plotdata = []
    for row in barplot:
        plot_dict = {}
        plot_dict['ward'] = row.Ward
        plot_dict['incomeaverage2015'] = row.incomeaverage2015
        plot_dict['incomeaverage2010']= row.incomeaverage2010
        plot_dict['incomemedian2015']= row.incomemedian2015
        plot_dict['incomemedian2010']= row.incomemedian2010
        plotdata.append(plot_dict)

    return jsonify(plotdata)

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