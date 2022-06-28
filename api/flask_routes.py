import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

# from pg_keys import pg_key
pg_key = "Leah0608"

#################################################
# Database Setup

connection_string = f'postgres:{pg_key}@localhost:5432/anti_violence_db'
engine = create_engine(f'postgresql://{connection_string}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# reference to the table
Base.classes.keys()
Data = Base.classes.civilians 

#################################################
# Flask Setup
app = Flask(__name__)

# DB columns
    #    index, iso, event_date, year, event_type, sub_event_type, actor1, region, \
    #    country, location, latitude, longitude, geo_precision, source, source_scale, \
    #    notes, fatalities,timestamp

#################################################
# Flask Routes

@app.route("/")
def welcome():
    
    txt = """List all available api routes
    
        Available Routes:
        /api/v1.0/ukrevents
        /api/v1.0/ukrGeoJson
        /api/v1.0/regionalevents
        /api/v1.0/globalevents
    """
    return render_template("index.html", txt=txt)


@app.route("/api/v1.0/ukrevents")
def ukrevents():

    session = Session(engine)

    """Return ukraine data"""
    #results = session.query(Data.country).all()
 
    results = session.query(Data.index, Data.year, Data.country, Data.latitude, Data.longitude)\
        .filter(Data.country == "Ukraine").all()

    session.close()

    #all_names = list(np.ravel(results))
    #print(all_names)
    #return jsonify(all_names)

    all_events = []

    for index, year, country, latitude, longitude in results:
        event_dict = {}
        event_dict["index"] = str(index)
        event_dict["year"] = str(year)
        event_dict["country"] = str(country)
        event_dict["latitude"] = str(latitude)
        event_dict["longitude"] = str(longitude)
        all_events.append(event_dict)

    return jsonify(all_events)


########################################################################

@app.route("/api/v1.0/ukrGeoJson")
def ukrGeoJson():

    session = Session(engine)

    #QUERY
    results = session.query(Data.year, Data.event_date, Data.event_type, Data.sub_event_type, \
        Data.country, Data.location, Data.latitude, Data.longitude, Data.fatalities, Data.notes)\
        .filter(Data.country == "Ukraine").all()

    session.close()

    # all_properties = [] 

    # for year, event_date, event_type, sub_event_type, \
    #     country, location, latitude, longitude, fatalities, notes in results:
    #     event_dict = {}
    #     event_dict["year"] = str(year)
    #     event_dict["event_date"] = str(event_date)
    #     event_dict["event_type"] = str(event_type)
    #     event_dict["sub_event_type"] = str(sub_event_type)
    #     event_dict["country"] = str(country)
    #     event_dict["location"] = str(location)
    #     event_dict["latitude"] = str(latitude)
    #     event_dict["longitude"] = str(longitude)
    #     event_dict["fatalities"] = str(fatalities)
    #     event_dict["notes"] = str(notes)
    #     all_properties.append(event_dict)

    #return jsonify(all_properties)
   
    geojson = {
        "type": "FeatureCollection",
        "features": [
        {
            "type": "Feature",
            "geometry" : {
                "type": "Point",
                "coordinates": [str(longitude), str(latitude)],
                },
            "properties" : {
                "year": str(year),
                "event_date": str(event_date),
                "event_type": str(event_type),
                "sub_event_type": str(sub_event_type),
                "country": str(country),
                "location": str(location),
                "latitude": str(latitude),
                "longitude": str(longitude),
                "fatalities": str(fatalities),
                "notes": str(notes)
            },
        } for year, event_date, event_type, sub_event_type, \
        country, location, latitude, longitude, fatalities, notes in results]
    }

    #print(geojson)
    #return geojson
    return render_template('index.html', gj=geojson)

    ## this send the data to he html
    ## make the script / d3 inside the html???


if __name__ == '__main__':
    app.run(debug=True)


