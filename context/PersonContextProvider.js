import React from 'react'
import PersonContext from './PersonContext'
import { useState } from 'react';

const PersonContextProvider = ({children}) => {
    const [total, setTotal] = useState(0);

  return (
    <>
    <PersonContext.Provider value={{total, setTotal}} >
        {children}
    </PersonContext.Provider>
    </>
  )
}

export default PersonContextProvider

