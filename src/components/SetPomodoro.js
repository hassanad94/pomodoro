import { useState } from 'react';
import Button from './Button';
import { useContext } from 'react';
import { SettingContext } from '../context/SettingContext';

const SetPomodoro = () => {

    const {durations,setDuration,setFocusQuestion,setPomodoroIsSet,setRemainTime} = useContext(SettingContext);
   
    const setSettings = ()=>{

        const inputs = document.querySelectorAll( ".interval input" );

        for(let i = 0; i < inputs.length; i++) {
            const element = inputs[i];
            
        };
        
        const durationFromInput = [].map.call(inputs, function( input ) {
            return input.value;
        });

        const focusQuestionInput = document.querySelector( "#focus-question" );

        const focusQuestionValue = focusQuestionInput.value;

        if( focusQuestionValue.length === 0 ){

            focusQuestionInput.classList.add( "required" );

            focusQuestionInput.addEventListener( 'focus', ( e ) => {

                e.target.classList.remove( "required" );
        
            } );


            alert( "Kérlek adj meg Fokuszkérdést" );
            return false
        }

        setFocusQuestion( focusQuestionValue );

        setRemainTime( durationFromInput );

        setPomodoroIsSet( true );

    }

    const handleChange = input => {
       
        var { name, value } = input.target;

        value = +value.replace(/[^0-9.]/g, '');

        if( name === "work" ){

            let newDuration = [ ...durations ];

            newDuration[ 0 ] = value;

            setDuration( newDuration );
            
            return;
        }

        if( name === "short" ){

            let newDuration = [ ...durations ];

            newDuration[ 1 ] = value;

            setDuration( newDuration );
            
            return;
        }

        if( name === "long" ){

            let newDuration = [ ...durations ];

            newDuration[ 2 ] = value;

            setDuration( newDuration );
            
            return;
        }
   
    }


    return (

    <>

    <div className="settings-container">

        <div className='question-container'>

            <input className="" name="question" id="focus-question" placeholder='Mi a fokuszód témája?'/>
            <label>Mi a fokuszód témája?</label>

        </div>

        <div className="input-wrapper">

            <span className="interval"><input className="input" name="work" onChange={handleChange} value={ durations[0] } /></span>
            <span className="interval"><input className="input" name="short" onChange={handleChange} value={durations[1] } /></span>
            <span className="interval"><input className="input" name="long" onChange={handleChange} value={durations[2] } /></span>

        </div>

        <Button title="Ídőzítő Beállítása" _callback={setSettings} />




    </div>
    </>
    )

}

export default SetPomodoro