import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///titanic.sqlite")      ##### CHANGE

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Events = Base.classes.events                            ####   CHANGE

#################################################
# Flask Setup
app = Flask(__name__)


#################################################
# Flask Routes

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/ukrevents<br/>"
        f"/api/v1.0/regionalevents<br/>"
        f"/api/v1.0/globalevents"
    )


@app.route("/api/v1.0/ukrevents")
def ukrevents():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return ukraine data"""
    # Query all passengers
    results = session.query(Events).filter(Events.coutry == "Ukraine").all()

    session.close()

    # all_events = []
    # for event in results:
    #     event_dict = {}
    #     event_dict["name"] = name
    #     event_dict["age"] = age
    #     event_dict["sex"] = sex
    #     all_events.append(event_dict)

    # return jsonify(all_events)

    geojson = {
        "type": "FeatureCollection",
        "features": [
        {
            "type": "Feature",
            "geometry" : {
                "type": "Point",
                "coordinates": [event["longitude"], event["latitude"]],
                },
            "properties" : event,
        } for event in results]
    }

    print(geojson)
    #return geojson
    return render_template('index.html', gj=geojson)

    ## this send the data to he html
    ## make the script / d3 inside the html???


if __name__ == '__main__':
    app.run(debug=True)



#     @app.route("/api/v1.0/names")
# def names():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(Passenger.name).all()

#     session.close()

#     # Convert list of tuples into normal list
#     all_names = list(np.ravel(results))

#     return jsonify(all_names)


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

#     return jsonify(all_passengers)



