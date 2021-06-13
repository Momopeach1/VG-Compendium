import React from 'react';
import useHeading from '../hooks/useHeading';


const Heading = () => {
  const [heading] = useHeading();
    return (
      <h1 className='page-common'>
        {heading}
      </h1>
    )
}

export default Heading;