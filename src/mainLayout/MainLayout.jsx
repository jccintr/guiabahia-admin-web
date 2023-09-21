import React from 'react'
import { Outlet } from 'react-router-dom';
import styles from "./styles.module.css";
import SideBar from '../components/sidebar/SideBar';


const MainLayout = () => {

  return (
    <div className={styles.container}>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout