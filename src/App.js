import SetPomodoro from './components/SetPomodoro';
import './App.css';
import Button from './components/Button';
import { useState, useEffect, useContext } from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import { SettingContext } from './context/SettingContext';
import Pomodoro from './components/Pomodoro';

function App() {

  const { pomodoroIsSet } = useContext( SettingContext );
  
  const themeClick = ( theme ) =>{

    document.querySelector( "body" ).setAttribute( "data-theme" , theme );

  }

  return (

    <div className="container">

      <div className='theme-picker' >

        <div className='title'><p>Témák!</p></div>

        <div className='theme dark' data-theme-color="#151932" onClick={() => themeClick( "dark" )}>Sötét</div>
        <div className='theme light' data-theme-color="#878794" onClick={() => themeClick( "light" )}>Világos</div>
        <div className='theme green' data-theme-color="#436b3a" onClick={() => themeClick( "green" )}>Zöld</div>

      </div>

      { pomodoroIsSet ? 
      
        <Pomodoro/>
      
        :
      
        <SetPomodoro/>
      
      }



    </div>
     
  );
}

export default App;
