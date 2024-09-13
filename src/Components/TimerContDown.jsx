import { useState, useEffect, Fragment } from 'react';

export const TimerContDown = () => {
    const [hr, setHr] = useState('');
    const [mm, setMm] = useState('');
    const [ss, setSs] = useState('');
    const [running, setRunning] = useState(false);

    const handleStart = () => {
        setRunning(true);
    };

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                if (ss === 0) {
                    if (mm === 0) {
                        if (hr === 0) {
                            clearInterval(interval);
                            setRunning(false);
                            alert('Enter CountDown time')
                            return;
                        } else {
                            setHr(prevHr => prevHr - 1);
                            setMm(59);
                            setSs(59);
                        }
                    } else {
                        setMm(prevMm => prevMm - 1);
                        setSs(59);
                    }
                } else {
                    setSs(prevSs => prevSs - 1);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [running, hr, mm, ss]);

    return (
        <div className='w-full h-screen bg-slate-400 flex flex-col justify-center items-center'>
            <h1 className='text-3xl'>Countdown Timer</h1>

            <Fragment className=''>
                {running ? (
                    <div className='flex gap-2'>
                        <h1>{hr}</h1>
                        <h1>{mm}</h1>
                        <h1>{ss}</h1>
                    </div>
                ) : (
                    <div className='w-[500px] h-[100px] flex justify-center items-center gap-4'>
                        <input type='number' placeholder='HH' className='w-[10%] h-[50px] flex justify-center items-center text-center' onChange={(e) => setHr(parseInt(e.target.value))} value={hr} />
                        <input type='number' placeholder='MM' className='w-[10%] h-[50px] flex justify-center items-center text-center' onChange={(e) => setMm(parseInt(e.target.value))} value={mm} />
                        <input type='number' placeholder='SS' className='w-[10%] h-[50px] flex justify-center items-center text-center' onChange={(e) => setSs(parseInt(e.target.value))} value={ss} />
                    </div>
                )}
            </Fragment>
            <div>
                <button onClick={handleStart}>Start</button>
            </div>
        </div>
    );
};
