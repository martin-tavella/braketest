import os
import fastf1
from fastapi import FastAPI
# import pandas as pd

app = FastAPI()

cache_dir = "cache"
if not os.path.exists(cache_dir):
    os.makedirs(cache_dir)

fastf1.Cache.enable_cache(cache_dir)

# @app.get("/telemetry/{year}/{gp}/{driver}")
# def get_telemetry(year: int, gp: str, driver: str):
#     session = fastf1.get_session(year, gp, "R")
#     session.load(telemetry=True, laps=True, weather=False)
    
#     fastest_lap = session.laps.pick_driver(driver).pick_fastest()
#     telemetry = fastest_lap.get_telemetry()
    
#     data = telemetry[["Speed", "RPM", "nGear", "X", "Y", "Z"]].to_dict(orient="records")
    
#     return {
#         "driver": driver,
#         "session": f"{year} {gp}",
#         "data": data
#     }


@app.get("/session-info/{year}/{gp}")
def get_session_info(year: int, gp: str):
    session = fastf1.get_session(year, gp, "R")
    session.load(telemetry=False, laps=True, weather=False)
    session_info = session.session_info
    total_laps = session.total_laps

    drivers = []
    for driver_num in session.drivers:
        driver = session.get_driver(str(driver_num))
        driver_dict = {
            "DriverNumber": driver.DriverNumber,
            "Abbreviation": driver.Abbreviation,
            "TeamId": driver.TeamId,
            "FullName": driver.FullName,
            "TeamId": driver.TeamId,
            "TeamName": driver.TeamName,
            "CountryCode": driver.CountryCode,
            "TeamColor": driver.TeamColor,
        }
        drivers.append(driver_dict)
    
    return {
        "session_info": session_info,
        "total_laps": total_laps,
        "drivers": drivers
    }
        
@app.get("/telemetry/lap1/{year}/{gp}")
def get_lap1_telemetry(year: int, gp: str):
    session = fastf1.get_session(year, gp, "R")
    session.load(telemetry=True)
    drivers = session.laps.pick_lap(1)['DriverNumber'].unique()
    all_drivers_data = {}
    
    for driver in drivers:
        try:
            lap = session.laps.pick_driver(driver).pick_lap(1)
            tel = lap.get_telemetry()
            
            tel['ms'] = tel["Time"].dt.total_seconds() * 1000
            
            clean_tel = tel[["ms", "Speed", "RPM", "nGear", "X", "Y"]]
            
            all_drivers_data[driver] = clean_tel.to_dict(orient="records")
        except:
            continue
    return all_drivers_data