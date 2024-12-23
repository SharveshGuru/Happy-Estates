import React,{useContext} from 'react';

import './Home.module.css';
import { UserContext } from '../UserContext';

const Home = () => {

  const {user}=useContext(UserContext)
  return (
    <div className="home-container">
      <h1>Welcome {user?.username}!!</h1>
    </div>
  );
};

export default Home;
