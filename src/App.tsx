import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import "react-toggle/style.css";

// text components
// import { Calender } from "./testComponents";

const App = () => {
  const content = useRoutes(routes);

  return <div>{content}</div>;
};

export default App;
