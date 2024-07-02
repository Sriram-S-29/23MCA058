import React from "react";
import Display from "./components/Display";

const App = () => {
  return (
    <div>
      <Display
        companyName="AMZ"
        categoryName="Laptop"
        top={10}
        minPrice={1}
        maxPrice={1000}
      />
    </div>
  );
};

export default App;
