import React, {useEffect, useState} from 'react';
import Button from "./Components/Button";
import './App.scss';

// создаем генератор таймеров
function* generateTimers(timersQueue: Array<number>) {
    for (let i = 0; i < timersQueue.length; i++) {
        yield timersQueue[i]
    }
}

const timersQueue: Array<number> = []

const App = () => {

    const [logs, setLogs] = useState<Array<string>>([])
    const [timeoutId, setTimeoutId] = useState<any>()
    const [isTimersStarted, setIsTimerStarted] = useState<boolean | undefined>(false)
    const [timersGenerator, setTimersGenerator] = useState(generateTimers(timersQueue))

    console.log('isTimersStarted', isTimersStarted)

    // добавляет таймер в очередь
    const addTimer = (timer: number) => {
        timersQueue.push(timer)

        if (!isTimersStarted) {
            setTimersGenerator(generateTimers(timersQueue))
            setIsTimerStarted(true)
            startTimer()
        }
    }

    // пишет в лог вывод
    const writeLog = (delay: number) => {
        setLogs(oldValues => [...oldValues, new Date().toLocaleTimeString() + ": " + delay + '\n'])
    }

    // Запуск таймера
    function startTimer() {

        let timer = timersGenerator.next()

        if (timer.done) {
            console.log('if (timer.done) {')
            setIsTimerStarted(false);
            timersQueue.length = 0
            return;
        }

        const timeoutId = setTimeout(() => {
            writeLog(Number(timer.value))
            startTimer()
        }, timer.value * 1000)
        setTimeoutId(timeoutId)
    }

    // clear the text area logs field
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

                <textarea className="TimersApp__logs-output" readOnly={true} value={logs.join('')} rows={15}/>

            </div>


        </div>
    );
}

export default App;
