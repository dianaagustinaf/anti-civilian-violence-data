# Anti-Civilian Violence Data Analysis
## Data Analysis and Visualisation of ACLED Dataset

https://user-images.githubusercontent.com/96545188/177221049-95147799-8915-4e25-bcf0-cdd69dfbc7f4.mp4

The war in Ukarine has been at the forefront of global news for the past few months. Many news outlets have claimed that human righst abuses have been occuring in the form of violence against civillians. 

As a result of international news outlets highlighting <b><i>violence against civilians in the Russian invasion of Ukraine </b></i>we want to visualise the data gathered by ACLED and see what patterns we could interpret. We are intrigued to see if there was a distinction between the frequency of occurrence and fatality count pre-Russian invasion and post. Also to identify any significant changes since the beginning of the invasion and the progression of the conflict. Finally, we will <b><i>make a comparison with the rest of Europe and globally</i></b> to draw a conclusion; is this type of violence an exceptional case? These are the results found in the analysis.

## Data Source 
We downloaded a CSV file from the ACLED (Armed Conflict Location & Event Data Project) dataset which monitors and records all conflict events around the world. 

https://acleddata.com/#/dashboard

## SQL & Flask 
Once we cleaned and manipulated the data in `jupyter notebook` we saved our clean data and loaded into `SQL` using `sqlalchemy`.
As we obtained latitude and longitude decidedn to optimise the data by turning our data into `geoJSON` format, then we moved on to creating API routes for Global, Ukraine and Regional data. Our clean data set had over 100,000 line so queries were created to filter our data for intended use. 

## Final Visualisation 
https://user-images.githubusercontent.com/96545188/177059557-ca1e61f4-e560-4cf5-9869-8f2bd4d741e0.mp4

For visualisations we used Javascript packages `plotly`, `leaflet` and `amCharts`.

## Finally... How to Run this Project

```python
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
from pg_keys import pg_key
```
```python
pg_keys.py

pg_key="YOUR_SQL_PASSWORD"
```

