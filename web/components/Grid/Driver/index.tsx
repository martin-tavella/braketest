import Image from "next/image";

const Driver = ({ driverInfo, year }) => {
  return (
    <div className="flex gap-3 my-1">
      <div className={`w-6 h-full`}
      style={{
        backgroundColor: `#${driverInfo.TeamColor}`
      }}
      >
        <div className="text-center">{driverInfo.DriverNumber}</div>
      </div>
      {/* <div><Image src={`https://media.formula1.com/content/dam/fom-website/teams/${year}/${driverInfo.TeamId}-logo.png`} alt={driverInfo.TeamName} width={40} height={40}/></div> */}
      <div>{driverInfo.Abbreviation}</div>
    </div>
  );
};
export default Driver;
