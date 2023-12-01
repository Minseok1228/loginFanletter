import { useEffect } from "react";
import Router from "./shared/router";
import { useDispatch, useSelector } from "react-redux";
import { __getFanLetters } from "./redux/modules/fanletters";
function App() {
  const { isLoading, isError, error } = useSelector(
    (state) => state.fanletters
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getFanLetters());
    console.log("Dispatched __getFanLetters");
  }, []);
  // if (isLoading) {
  //   return <div>로딩중</div>;
  // } else if (isError) {
  //   console.log(error);
  // }
  return <Router />;
}

export default App;
