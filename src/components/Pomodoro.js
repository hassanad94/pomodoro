import { useContext, useEffect, useState } from "react";
import Button from './Button';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';
import { SettingContext } from '../context/SettingContext';

const Pomodoro = () => {

    var currentClockTime = null;

    const changeWorkState = ( i ) => {

        if( isPlaying ){
    
          setIsPlaying( false ); 
          
        }
    
        setRemainTimer();
    
        setActiveWorkState( i );
    
    }
    
    const setRemainTimer = () => {
            
        let currentClock = remainTime;
    
        currentClock[ activeWorkState ] = currentClockTime;
    
        setRemainTime( currentClock );
    
    }
    
    const {
        durations,
        remainTime,
        setRemainTime,
        focusQuestion,
        setPomodoroIsSet,
        newQuestion,
        setNewQuestion,
        setFocusQuestion,
        setDuration
    } = useContext(SettingContext);
    
    const [activeWorkState, setActiveWorkState] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);  
    const [round, setRound] = useState(1);

    useEffect(() => {
    
        const allbutton = document.querySelectorAll( ".labels button" );
    
        for (let i = 0; i < allbutton.length; i++) {
          
          const button = allbutton[i];
          
          if( i === activeWorkState ){
    
            button.classList.add('active-label');
            continue;
    
          }
          
          button.classList.remove('active-label');
          
        }

        if( round > 3 & activeWorkState === 0 ){
            //setRound(1);
        }
      
    }, [activeWorkState]);

    useEffect(() => {

        if( round > 3 & remainTime[2] !==0 ){
            
            setIsPlaying( false );

            setActiveWorkState( 2 );
           

        }

    },[ round ]);

    const renderTime = ({remainingTime}) => {

        currentClockTime = remainingTime;

        const minutes = Math.floor( remainingTime / 60 );

        const seconds = remainingTime % 60;


        return (
            <div className="timer">
              <div className="value">{`${minutes}:${seconds}`}</div>
            </div>
        );

    };

    const setUpnewQuestion = () =>{

        setIsPlaying( false );

        setNewQuestion( true );

    }

    const newFocusQuestion = () =>{

        const focusQuestionInput = document.querySelector( "#new-focus-question" );

        const focusQuestionValue = focusQuestionInput.value;

        if( focusQuestionValue.length === 0 ){

            focusQuestionInput.classList.add( "required" );

            focusQuestionInput.addEventListener( 'focus', ( e ) => {

                e.target.classList.remove( "required" );
        
            } );


            alert( "Kérlek adj meg Fokuszkérdést" );
            return false
        }


        setRound(1);
        setFocusQuestion( focusQuestionValue );
        setNewQuestion( false );
        setRemainTime( [ remainTime[0] , durations[1] , durations[2] ] );
        setActiveWorkState(0);

    }

    return (
    <>

        <div className="pomodoro-actions">

            <Button title="Új Pomodoró Beállítás" _callback={() => setPomodoroIsSet( false ) } /> 
            { (! newQuestion && round > 3   )  &&  <Button title="Új kérdés" _callback={setUpnewQuestion}/> }

        </div>

        <div className="pomodoro-container">

            <div className="pomodoro-count">

                { `${round}. Pomodoro` }
                
            </div>

            { newQuestion ? 
                <>            
                    <div className='question-container'>

                        <input className="" name="question" id="new-focus-question" placeholder='Mi a fokuszód témája?'/>
                        <label>Mi a fokuszód témája?</label>

                    </div>
                    <Button title="Beállítom a fokusz kérdésem" _callback={ newFocusQuestion } /> 
                </>
                :

                <div className='the-focus'>{focusQuestion}</div>

            }



            <ul className='labels'>
    
                <li onClick={()=> changeWorkState(0) }>
                    <Button role='work' title="Munka"
                    />
                </li>


                {  remainTime[1] > 0 && 
                                
                    <li onClick={()=> changeWorkState(1) }>
                        <Button role='short' title="Rövid Szünet"
                        />
                    </li>
                                
                }

                {  remainTime[2] > 0 && 
                                
                    <li onClick={()=> changeWorkState(2) }>
                        <Button role='long' title="Nagy Szünet"
                        />
                    </li>
                                
                }


            </ul>

            { activeWorkState === 0 &&  
            <>
                <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={durations[0]} //Kezdeti állapot
                initialRemainingTime={remainTime[0] % 60}// Hol tart
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                strokeWidth={6}
                size={220}
                trailColor="#151932"
                onComplete={ () => {
                    
                    setRound( ( prev ) =>  prev + 1 );
                    
                    return { shouldRepeat: true, delay: 0 };

                }}
                >
                    {renderTime}
                </CountdownCircleTimer>

                <Button title={ isPlaying ? "Szünet" : "Mehet!"  } _callback={() =>{ setIsPlaying( !isPlaying ) }}/>

            </> 
            }

            { activeWorkState === 1 &&  
            <>
                <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={durations[1]} //Kezdeti állapot
                initialRemainingTime={remainTime[1] % 60}// Hol tart
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                strokeWidth={6}
                size={220}
                trailColor="#151932"
                onComplete={ () => {
                    setIsPlaying(false);
                    
                    const timeLeft = remainTime;

                    timeLeft[ 1 ] = 0;

                    setRemainTime( timeLeft );

                    setActiveWorkState(0);
                    return { shouldRepeat: false, delay: 0 };
                }}
                >
                    {renderTime}
                </CountdownCircleTimer>

                <Button title={ isPlaying ? "Szünet" : "Mehet!"  } _callback={() =>{ setIsPlaying( !isPlaying ) }}/>
            </>    
            }

            { activeWorkState === 2 &&  
            <>
                <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={durations[2]} //Kezdeti állapot
                initialRemainingTime={remainTime[2] % 60}// Hol tart
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                strokeWidth={6}
                size={220}
                trailColor="#151932"
                onComplete={ () => {
                    setIsPlaying(false);
                    
                    const timeLeft = remainTime;

                    timeLeft[ 2 ] = 0;

                    setRemainTime( timeLeft );

                    setActiveWorkState(0);
                    return { shouldRepeat: false, delay: 0 };
                }}
                >
                    {renderTime}
                </CountdownCircleTimer>

                <Button title={ isPlaying ? "Szünet" : "Mehet!"  } _callback={() =>{ setIsPlaying( !isPlaying ) }}/>
            </>     
            }

        </div>


    </>
    )
}

export default Pomodoro