import React, { useContext } from 'react';
import useHeading from '../hooks/useHeading';


const Heading = () => {
  const [heading, setHeading] = useHeading();
    return (
      <h1 className='page-common'>
        {heading}
      </h1>
    )
}

export default Heading;