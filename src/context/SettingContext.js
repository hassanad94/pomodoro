import { createContext, useState } from "react"

export const SettingContext = createContext();

function SettingsContextProvider( props ) {

    const [ durations, setDuration ] = useState([40 ,10 ,20]); // work / short / long
    const [ remainTime, setRemainTime ] = useState([40 ,10 ,20]); // work / short / long
    const [focusQuestion, setFocusQuestion] = useState("");
    const [completedPomodoro, setCompletedPomodoro] = useState(0);
    const [newQuestion, setNewQuestion] = useState( false );

    const [pomodoroIsSet, setPomodoroIsSet] = useState( false );

    return (
    <SettingContext.Provider value={{
        durations,
        setDuration,
        remainTime,
        setRemainTime,
        focusQuestion,
        setFocusQuestion,
        pomodoroIsSet,
        setPomodoroIsSet,
        completedPomodoro,
        setCompletedPomodoro,
        newQuestion,
        setNewQuestion,   
    }}>
        {props.children}
        
    </SettingContext.Provider>
    )
}

export default SettingsContextProvider