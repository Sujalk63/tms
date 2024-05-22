export const TopNavBar = ({ username }) => {
  return (
    <div className="flex items-center text-white p-5 pl-8  pr-8 justify-between bg-customColor">
      <div className="flex-col justify-center items-start">
        <h1 className="text-3xl font-bold text-customSideColor" >Welcome to TMS</h1>
        <div>Collaborate teams with tasks digitally</div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div  className="flex justify-center items-center gap-2">
            <div className="text-customSideColor text-2xl">Welcome,</div>
            <div className="pt-1" >{username}</div>
        </div>
        <div className="w-14 h-14 bg-gray rounded-full mb-1 border-4 border-customColorLight"></div>
      </div>
    </div>
  );
};
