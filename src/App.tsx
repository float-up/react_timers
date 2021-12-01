import React, {useEffect, useState} from 'react';
import Button from "./Components/Button";
import './App.scss';

const App = () => {
    const [logs, setLogs] = useState<Array<string>>([])
    const [currentTimers, setCurrentTimers] = useState<Array<number>>([])
    const [timeoutId, setTimeoutId] = useState<any>()
    const [isTimersStarted, setIsTimerStarted] = useState<boolean>(false)

    console.log('currentTimers', currentTimers)

    // добавляет таймер в очередь
    const addTimer = (timer: number) => {
        setCurrentTimers(timers => [...timers, timer])
        if (!isTimersStarted) {
            startTimer()
        }
    }

    // пишет в лог вывод
    const writeLog = (delay: number) => {
        setLogs(oldValues => [...oldValues, new Date().toLocaleTimeString() + ": " + delay + '\n'])
    }

    // создаем генератор таймеров
    function* generateTimers() {
        for (let i = 0; i < currentTimers.length; i++) {
            console.log('currentTimers[i]', currentTimers[i])
            yield currentTimers[i]
        }
    }

    // инициализируем генератор


    // Запуск генератора

    let timersGenerator:  Generator<number, void, unknown>;

    function startTimer() {
        let timer = timersGenerator.next()
        console.log('timer', timer)
        if (timer.done) return;

        const timeoutId = setTimeout(() => {
            console.log(timer.value)
            // writeLog(Number(timer.value))
            startTimer()
        }, timer.value * 1000)
        setTimeoutId(timeoutId)
    }

    useEffect(() => {
        timersGenerator = generateTimers()
    }, [currentTimers])


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
