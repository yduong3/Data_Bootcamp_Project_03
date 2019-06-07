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
crime2014 = Base.classes.Crime2014
crime2018 = Base.classes.Crime2018

@app.route("/")
def main():
    return render_template('homepage.html')

@app.route("/barplot")
def createbarplot():

# canadadevlynbarplot data retrieve
    barplot = db.session.query(wards.Ward, wards.incomeaverage2015, wards.incomeaverage2010, wards.incomemedian2015, wards.incomemedian2010).\
            order_by(wards.Ward).all()

    # print(barplot[0].Ward)
    
    plotdata = []
    for row in barplot:
        plot_dict = {}
        plot_dict['ward'] = row.Ward
        plot_dict['incomeaverage2015'] = row.incomeaverage2015
        plot_dict['incomeaverage2010']= row.incomeaverage2010
        plot_dict['incomemedian2015']= row.incomemedian2015
        plot_dict['incomemedian2010']= row.incomemedian2010
        plotdata.append(plot_dict)
    
    # return "test6"    
    return jsonify(plotdata)

#     # print (jsonify(plotdata))
#     """Return the homepage."""
    # return render_template("index.html")




# def barincome(): 
 
#     return redirect("/", code=302)  
    

if __name__ == "__main__":
    app.run()
