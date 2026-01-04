const Driver = ({ driverInfo }) => {
  return (
    <div className="flex gap-3 my-1">
      <div className={`w-6 h-full`}
      style={{
        backgroundColor: `#${driverInfo.TeamColor}`
      }}
      >
        <div className="text-center">{driverInfo.DriverNumber}</div>
      </div>
      <div>{driverInfo.Abbreviation}</div>
    </div>
  );
};
export default Driver;
