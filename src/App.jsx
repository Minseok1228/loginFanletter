import { useEffect } from "react";
import Router from "./shared/router";
import { useDispatch, useSelector } from "react-redux";
import { __getFanLetters } from "./redux/modules/fanletters";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getFanLetters());
    console.log("Dispatched __getFanLetters");
  }, []);

  return <Router />;
}

export default App;
