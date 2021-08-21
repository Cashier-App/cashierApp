import Navbar from "../components/Navbar";

const Statistic = () => {
  return (
    <div>
      <Navbar />
      <div className="container-xl flex flex-row justify-center my-3">
        <div className="mini-box flex flex-wrap">
          <div className="input-box mx-1 my-1"></div>
          <div className="input-box mx-1 my-1"></div>
          <div className="input-box mx-1 my-1"></div>
          <div className="input-box mx-1 my-1"></div>
        </div>
        <div className="box-statistic mx-3"></div>
      </div>
    </div>
  );
};

export default Statistic;
