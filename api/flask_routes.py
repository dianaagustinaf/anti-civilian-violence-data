import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

from pg_keys import pg_key

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
    
    txt = "List all available api routes"

    txt1 ="http://127.0.0.1:5000/api/v1.0/ukraine"
    txt2 ="http://127.0.0.1:5000/api/v1.0/region1"
    txt3 ="http://127.0.0.1:5000/api/v1.0/region2"
    txt4 ="http://127.0.0.1:5000/api/v1.0/globaldata"
    txt5 ="http://127.0.0.1:5000/api/v1.0/datacled"
    
    listurl = []
    listurl.append(txt1)
    listurl.append(txt2)
    listurl.append(txt3)
    listurl.append(txt4)
    listurl.append(txt5)

    return render_template("index.html", txt=txt, listurl=listurl)


########################################################################

@app.route("/api/v1.0/ukraine")
def ukraine():

    session = Session(engine)

    #QUERY
    results = session.query(Data.year, Data.event_date, Data.event_type, Data.sub_event_type, \
        Data.region, Data.country, Data.location, Data.latitude, Data.longitude, \
        Data.fatalities, Data.notes, Data.source)\
        .filter(Data.country == "Ukraine").all()

    session.close()
   
    geojson = {
        "type": "FeatureCollection",
        "features": [
        {
            "type": "Feature",
            "metadata": {
                "url": "https://acleddata.com/curated-data-files/",
                "title": "Anti-Civilian Violence, ACLED Data",
                "subtitle": "Analysis and visualisation by Shannon, Diana & Shola for University of Birmingham", 
                "status": 200
                },
            "geometry" : {
                "type": "Point",
                "coordinates": [str(longitude), str(latitude)],
                },
            "properties" : {
                "year": str(year),
                "event_date": str(event_date),
                "event_type": str(event_type),
                "sub_event_type": str(sub_event_type),
                "region": str(region),
                "country": str(country),
                "location": str(location),
                "latitude": str(latitude),
                "longitude": str(longitude),
                "fatalities": str(fatalities),
                "notes": notes,
                "source": source
            },
        } for year, event_date, event_type, sub_event_type, \
        region, country, location, latitude, longitude, \
        fatalities, notes, source in results]
    }
    #print(geojson)
    #return geojson
    return render_template('1_viz_ukr.html', geojson=geojson)

    ## this send the data to he html
    ## make the script / d3 inside the html???


########################################################################


@app.route("/api/v1.0/region1")
def region1():

    session = Session(engine)

    #QUERY
    results = session.query(Data.year, func.sum(Data.fatalities).label("total_fatalities"))\
        .group_by(Data.country and Data.year).filter(Data.country == "Ukraine").all()

    session.close()
   
    geojson = [
        [{
            "metadata": {
                "url": "https://acleddata.com/curated-data-files/",
                "title": "Anti-Civilian Violence, ACLED Data",
                "subtitle": "Analysis and visualisation by Shannon, Diana & Shola for University of Birmingham", 
                "status": 200
                },
            "properties" : {
                "year": str(year),
                "fatalities": str(fatalities)
            },
        }] for year, fatalities in results]

    #print(geojson)
    #return geojson
    return render_template('2_viz_region1.html', geojson=geojson)




########################################################################


@app.route("/api/v1.0/globaldata")
def globaldata():

    session = Session(engine)

    #QUERY
    results = session.query(Data.year, Data.event_date, Data.event_type, Data.sub_event_type, \
        Data.region, Data.country, Data.location, Data.latitude, Data.longitude, \
        Data.fatalities, Data.notes, Data.source)\
        .filter(Data.year == 2022).all()

    session.close()
   
    geojson = {
        "type": "FeatureCollection",
        "features": [
        {
            "type": "Feature",
            "metadata": {
                "url": "https://acleddata.com/curated-data-files/",
                "title": "Anti-Civilian Violence, ACLED Data",
                "subtitle": "Analysis and visualisation by Shannon, Diana & Shola for University of Birmingham", 
                "status": 200
                },
            "geometry" : {
                "type": "Point",
                "coordinates": [str(longitude), str(latitude)],
                },
            "properties" : {
                "year": str(year),
                "event_date": str(event_date),
                "event_type": str(event_type),
                "sub_event_type": str(sub_event_type),
                "region": str(region),
                "country": str(country),
                "location": str(location),
                "latitude": str(latitude),
                "longitude": str(longitude),
                "fatalities": str(fatalities),
                "notes": notes,
                "source": source
            },
        } for year, event_date, event_type, sub_event_type, \
        region, country, location, latitude, longitude, \
        fatalities, notes, source in results]
    }
    #return geojson
    return render_template('3_viz_global.html', geojson=geojson)





############################
# DATA

@app.route("/api/v1.0/datacled")
def datacled():
    txt = "Source: ACLED -  Make this text better XD"
    return render_template("data.html", txt=txt)

############################
# Error

@app.errorhandler(404)
def not_found(error):
    return render_template('error.html'), 404

############################

if __name__ == '__main__':
    app.run(debug=True)










############################################
#formatting

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


# @app.route("/api/v1.0/ukrevents")
# def ukrevents():

#     session = Session(engine)

#     """Return ukraine data"""
#     #results = session.query(Data.country).all()
 
#     results = session.query(Data.index, Data.year, Data.country, Data.latitude, Data.longitude)\
#         .filter(Data.country == "Ukraine").all()

#     session.close()

#     #all_names = list(np.ravel(results))

#     all_events = []

#     for index, year, country, latitude, longitude in results:
#         event_dict = {}
#         event_dict["index"] = str(index)
#         event_dict["year"] = str(year)
#         event_dict["country"] = str(country)
#         event_dict["latitude"] = str(latitude)
#         event_dict["longitude"] = str(longitude)
#         all_events.append(event_dict)

#     return jsonify(all_events)