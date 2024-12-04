import React from 'react'
import SyncLoader from "react-spinners/SyncLoader";

const Loadingpage = () => {
  return (
<div className='text-violet-950 flex justify-center h-full items-center'>
      <p className='text-2xl opacity-40'>Loading</p>
      <SyncLoader  className="text-violet-950 opacity-40" />
    </div>
  )
}

export default Loadingpage;
