import { PropagateLoader } from "react-spinners";
import MainContainer from "../container/MainContainer";

const LoadingContainer = () => {
  return (
    <MainContainer>
      <div className="min-h-[80vh] w-full flex justify-center items-center">
        <PropagateLoader color="#ebe114" size={15} />
      </div>
    </MainContainer>
  );
};
export default LoadingContainer;
