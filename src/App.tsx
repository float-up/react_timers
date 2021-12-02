import React, {useState} from 'react';
import Button from "./Components/Button";
import Textarea from "./Components/Textarea";
import {Timer} from "./utils/interfaces";
import './App.scss';

// create a timers generator
function* generateTimers(timersQueue: Array<Timer>) {
    for (let i = 0; i < timersQueue.length; i++) {
        yield timersQueue[i]
    }
}

const timersQueue: Array<Timer> = []

const App = () => {

    // output to the logs field
    const [logs, setLogs] = useState<Array<string>>([])
    // current timeout ID for cancelling
    const [timeoutId, setTimeoutId] = useState<any>()
    // mark the generator is running
    const [isTimersStarted, setIsTimerStarted] = useState<boolean>(false)
    // generator initializer
    const [timersGenerator, setTimersGenerator] = useState(generateTimers(timersQueue))

    const addTimer = (timer: number) => {
        const clickTime = new Date().toLocaleTimeString();
        timersQueue.push({delay: timer, clickTime: clickTime})

        if (!isTimersStarted) {
            setTimersGenerator(generateTimers(timersQueue))
            setIsTimerStarted(true)
            startTimer()
        }
    }

    const writeLog = (timer: Timer) => {
        setLogs(oldValues => [...oldValues, new Date().toLocaleTimeString() + ": " + timer.delay + ' / ' + timer.clickTime + '\n'])
    }

    function startTimer() {
        let timer = timersGenerator.next()

        if (timer.done) {
            setIsTimerStarted(false);
            timersQueue.length = 0
            return;
        }

        const timeoutId = setTimeout(() => {
            writeLog(timer.value!)
            startTimer()
        }, timer.value.delay * 1000)
        setTimeoutId(timeoutId)
    }

    const clearLogs = () => {
        setLogs([])
        clearTimeout(timeoutId)
    }

    return (
        <div className="TimersApp">
            <div className="TimersApp__controls">
                <Button title="Таймер 1" onClick={() => addTimer(1)}/>
                <Button title="Таймер 2" onClick={() => addTimer(2)}/>
                <Button title="Таймер 3" onClick={() => addTimer(3)}/>
                <Button title="Таймер 4" onClick={() => addTimer(4)}/>
                <Button title="Сбросить" onClick={() => clearLogs()}/>
            </div>

            <div className="TimersApp__logs">
                <h5 className="TimersApp__logs-title">Логи</h5>

                <Textarea data={logs.join('')} className="TimersApp__logs-output" rows={15} readOnly={true}/>
            </div>
        </div>
    );
}

export default App;
