import React from 'react'
import './index.css';
import Banner from "./component/home-component/Banner"
import Header from "./component/home-component/Header"
import Recipies from "./component/home-component/Recipie"

const App = () => {
  return (
    <div>
     <Header />
     <Banner />
     <Recipies />
    </div>
  )
}

export default App

