# Anti-Civilian Violence Data Analysis
## Data Analysis and Visualisation of ACLED Dataset

The war in Ukarine has been at the forefront of global news for the past few months. Many news outlets have claimed that human righst abuses have been occuring in the form of violence against civillians. 

As a result of international news outlets highlighting <b><i>violence against civilians in the Russian invasion of Ukraine </b></i>we want to visualise the data gathered by ACLED and see what patterns we could interpret. We are intrigued to see if there was a distinction between the frequency of occurrence and fatality count pre-Russian invasion and post. Also to identify any significant changes since the beginning of the invasion and the progression of the conflict. Finally, we will <b><i>make a comparison with the rest of Europe and globally</i></b> to draw a conclusion; is this type of violence an exceptional case? These are the results found in the analysis.

## Data Source 
[ACLED](https://acleddata.com/#/dashboard) (Armed Conflict Location & Event Data Project) is an event-based data project designed for disaggregated conflict analysis and crisis mapping. Data are updated weekly and can be downloaded.

We downloaded the "Anti-Civilian Violence" dataset (from 10 June 2022) that can be found [here](https://acleddata.com/curated-data-files/).

#### Anti-Civilian Violence meaning
All civilian targeting events, including remote violence, violence against unarmed protesters, and violence perpetrated by mobs and rioters are included in the data file below (i.e. in addition to violence against civilians events, this file captures explosions/remote violence events, protest events, and riot events in which civilians were targeted). While the data in this file cover all events in which civilians were the direct or only target of violence, cases in which civilians were collateral damage are not included here.

Please note differences in time period coverage per country and region. A full list of country-year coverage is available [here](https://acleddata.com/acleddatanew//wp-content/uploads/dlm_uploads/2019/01/ACLED_Country-and-Time-Period-coverage_updatedFeb2022.pdf).

## SQL & Flask 
Once we cleaned and manipulated the data in `jupyter notebook` we saved our clean data and loaded into `SQL` using `sqlalchemy`.
As we obtained latitude and longitude decidedn to optimise the data by turning our data into `geoJSON` format, then we moved on to creating API routes for Global, Ukraine and Regional data. Our clean data set had over 100,000 line so queries were created to filter our data for intended use. 

## Final Visualisation 

https://user-images.githubusercontent.com/96545188/177249800-2d4b9b4e-1896-4824-84e1-bd5d11d12b4f.mp4

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
Add config file: pg_keys.py
pg_key="YOUR_SQL_PASSWORD"
```

