import Driver from "./Driver";

const Grid = ({ sessionData, sessionDrivers, totalLaps }) => {
  return (
    <div className="max-w-[80%] w-full border-3 rounded-xl border-gray-400 mx-auto">
      <div>
        <h3 className="text-white text-center">{sessionData?.Meeting?.Name}</h3>
      </div>
      <div className="grid-cols-1 p-4 bg-black text-white">
        {
            sessionDrivers.map((driver, index) => {
                return <Driver driverInfo={driver} key={index} />
            })
        }
      </div>
    </div>
  );
};
export default Grid;
