import numpy as np

import sqlalchemy
import pandas as pd
import plotly_express as px
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
# columns = inspector.get_columns('SpaceMissions')
for column in columns:
    print(column["name"], column["type"])

# Save reference to the table
Space_Corrected = Base.classes.Space_Corrected
# SpaceCorrected = Base.classes.SpaceMissions

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
    results = session.execute(session.query(Space_Corrected)).fetchall()

    session.close()
    df = pd.DataFrame(results,columns=[c["name"] for c in columns])
    print(list(df.values))


    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return df.to_json(orient="records")





@app.route("/api/v1.0/successfullaunches")
def successfullaunches():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of the number of Successful Space Launches by Country"""
    # Query all Successful Launches
    results = session.execute(session.query(Space_Corrected.Country, func.count(Space_Corrected.StatusMission).label("Total")).filter(Space_Corrected.StatusMission == 'Success').group_by(Space_Corrected.Country)).fetchall()
    
    session.close()

# session.query(Space_Corrected.Country, func.count(Space_Corrected.StatusMission).label('total')).filter(Space_Corrected.StatusMission>50).group_by(Expense.date).all()


    print(results)
    
    # df = pd.DataFrame(results,columns=[c["name"] for c in columns])
    # print(list(df.values))


    # Convert list of tuples into normal list
    # all_names = list(np.ravel(results))
    success_results = []
    for Country, Total in results:
        results_dict = {}
        results_dict ["Country"]=Country
        results_dict ["Success"]=Total
        success_results.append(results_dict)

    return jsonify(success_results)
    # return df.to_json(orient="records")


@app.route("/api/v1.0/statusmission")
def statusmission():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of the number of Launches by StatusMission"""
    # Query all StatusMission
    results = session.execute(session.query(Space_Corrected.StatusMission, func.count(Space_Corrected.StatusMission).label("Total")).group_by(Space_Corrected.StatusMission).order_by("Total")).fetchall()
    
    session.close()

# session.query(Space_Corrected.Country, func.count(Space_Corrected.StatusMission).label('total')).filter(Space_Corrected.StatusMission>50).group_by(Expense.date).all()


    print(results)
    
    # df = pd.DataFrame(results,columns=[c["name"] for c in columns])
    # print(list(df.values))


    # Convert list of tuples into normal list
    # all_names = list(np.ravel(results))
    statusmission_results = []
    for StatusMission, Total in results:
        results_dict = {}
        results_dict ["Space Launches"]=Total
        results_dict ["Mission Status"]=StatusMission
        statusmission_results.append(results_dict)

    return jsonify(statusmission_results)
    # return df.to_json(orient="records")




@app.route("/api/v1.0/company")
def company():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of the number of Launches by StatusMission"""
    # Query all StatusMission
    results = session.execute(session.query(Space_Corrected.CompanyName, func.count(Space_Corrected.StatusMission).label("Total")).filter(Space_Corrected.StatusMission == 'Success').group_by(Space_Corrected.CompanyName).order_by("CompanyName")).fetchall()
    
    session.close()

#  session.query(Space_Corrected.Country, func.count(Space_Corrected.StatusMission).label('total')).filter(Space_Corrected.StatusMission>50).group_by(Expense.date).all()


    print(results)
    
    # df = pd.DataFrame(results,columns=[c["name"] for c in columns])
    # print(list(df.values))


    # Convert list of tuples into normal list
    # all_names = list(np.ravel(results))
    company_results = []
    for CompanyName, Total in results:
        results_dict = {}
        results_dict ["Number of Successful Launches"]=Total
        results_dict ["Company"]=CompanyName
        company_results.append(results_dict)

    return jsonify(company_results)
    # return df.to_json(orient="records")


# from homework, delete before submit!!!!
# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

    # return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)





