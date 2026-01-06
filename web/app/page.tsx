"use client";
import Grid from "@/components/Grid";
import { getSession } from "@/services/session";
import { useEffect, useState } from "react";

export default function Home() {
  const [year, setYear] = useState<number>(2025);
  const [gp, setGp] = useState<string>("Austria");
  const [sessionData, setSessionData] = useState({});
  const [sessionDrivers, setSessionDrivers] = useState([]);
  const [totalLaps, setTotalLaps] = useState<number>();


  useEffect(() => {
    const fetchData = async () => {
      const response = await getSession(year, gp);
      if (response) {
        setSessionData(response.session_info);
        setSessionDrivers(response.drivers);
        setTotalLaps(response.total_laps);
      }
    };
    fetchData();
  }, [year, gp]);

  return (
    <div>
      <header className="text-red-700 text-center p-10">
        <h1 className="text-7xl font-extrabold">
          BreakTest <br />
          🏎️
        </h1>
      </header>
      <main>
        <Grid sessionData={sessionData} sessionDrivers={sessionDrivers} totalLaps={totalLaps} year={year}/>
      </main>
    </div>
  );
}
