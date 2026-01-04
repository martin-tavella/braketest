import os
import fastf1
from fastapi import FastAPI
# import pandas as pd

app = FastAPI()

cache_dir = "cache"
if not os.path.exists(cache_dir):
    os.makedirs(cache_dir)

fastf1.Cache.enable_cache(cache_dir)

@app.get("/")
def test():
    return {"message": "Hello World"}

@app.get("/telemetry/{year}/{gp}/{driver}")
def get_telemetry(year: int, gp: str, driver: str):
    session = fastf1.get_session(year, gp, "R")
    session.load(telemetry=True, laps=True, weather=False)
    
    fastest_lap = session.laps.pick_driver(driver).pick_fastest()
    telemetry = fastest_lap.get_telemetry()
    
    data = telemetry[["Speed", "RPM", "nGear", "X", "Y", "Z"]].to_dict(orient="records")
    
    return {
        "driver": driver,
        "session": f"{year} {gp}",
        "data": data
    }

@app.get("/drivers/{year}/{gp}")
def get_drivers(year: int, gp: str):
    session = fastf1.get_session(year, gp, "R")
    session.load(telemetry=False, laps=False, weather=False)
    drivers = []
    for driver_num in session.drivers:
        drivers.append(session.get_driver(str(driver_num)))
    return drivers