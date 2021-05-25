import React, { useState } from "react";

const HeadingContext = React.createContext();

export const HeadingProvider = ({ children }) => {
  const [heading, setHeading] = useState('Welcome to VG Compenduim!');


  return (
    <HeadingContext.Provider value={{ heading, setHeading }}>
      { children }
    </HeadingContext.Provider>
  );
}

export default  HeadingContext;