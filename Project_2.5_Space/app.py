import numpy as np

import sqlalchemy
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Space.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Create the inspector and connect it to the engine
inspector = inspect(engine)

# Collect the names of tables within the database
print(inspector.get_table_names())

# Using the inspector to print the column names within the 'Salaries' table and its types
columns = inspector.get_columns('Space_Corrected')
# for column in columns:
    # print(column["name"], column["type"])

# Save reference to the table
space_launches = Base.classes.Space_Corrected


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html", data=[1,2,3])


@app.route("/api/v1.0/names")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.execute(session.query(space_launches)).fetchall()

    session.close()
    df = pd.DataFrame(results,columns=[c["name"] for c in columns])
    print(list(df.values))


    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return df.to_json(orient="records")


@app.route("/api/v1.0/passengers")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_passengers = []
    for name, age, sex in results:
        passenger_dict = {}
        passenger_dict["name"] = name
        passenger_dict["age"] = age
        passenger_dict["sex"] = sex
        all_passengers.append(passenger_dict)

    return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)
