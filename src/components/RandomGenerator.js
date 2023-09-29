import React, { useEffect, useState, useRef, useCallback } from 'react';
import { naturalChords, flatChords, sharpChords } from '../Datas';
import { Howl } from 'howler';

function RandomGenerator() {
  const [chord, setChord] = useState('C')
  const [selectChords, setSelectChords] = useState('all')
  const [selectTimer, setSelectTimer] = useState(2)
  const [hasStarted, setHasStarted] = useState(false)
  // const [intervalId, setIntervalId] = useState(null)
  const [hasVariation, setHasVariation] = useState(true)

  // const soundSrc = 'https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

  const playSound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play()
  }

  const randomChords = useCallback((arrayChords) => {
    const index = Math.floor(Math.random() * arrayChords.length);
    // let variation = Math.floor(Math.random() * 2);
    // console.log(arrayChords);
    let newChord = arrayChords[index];
    if (hasVariation && Math.random() > 0.5) {
      newChord = newChord + 'm';
    }
    if (hasVariation && Math.random() > 0.5) {
      newChord = newChord + '7';
    }
    if (hasVariation && Math.random() > 0.5 && newChord.includes('7')) {
      newChord = newChord + 'M';
    }

    setChord(newChord);
  }, [hasVariation]);


  const chordsGenerator = useCallback(() => {
    if (selectChords === 'flat') {
      return randomChords(naturalChords.concat(flatChords))
    }
    if (selectChords === 'sharp') {
      return randomChords(naturalChords.concat(sharpChords))
    }
    if (selectChords === 'all') {
      return randomChords(naturalChords.concat(sharpChords.concat(flatChords)))
    }
    return randomChords(naturalChords)
  }, [selectChords, randomChords]);


  const intervalIdRef = useRef(null);
  
  const startTimer = useCallback(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
    }

    const timerInterval = selectTimer * 1000;
    const id = setInterval(() => {
      playSound('/timerSound.wav');
      chordsGenerator();
    }, timerInterval);
    intervalIdRef.current = id;
  }, [selectTimer, chordsGenerator]);

  const stopTimer = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  useEffect(() => {
    if (hasStarted) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [hasStarted, selectChords, selectTimer, hasVariation, startTimer]);

  const handleClick = () => {
    setHasStarted(!hasStarted)
  }

  const handleSelect = (event, selectName) => {
    if (selectName === 'chords') {
      setSelectChords(event.target.value)
    }
    if (selectName === 'timer') {
      setSelectTimer(event.target.value)
    }
    if (hasStarted) {
      stopTimer();
      startTimer()
    }
  }

  const handleCheckboxChange = (event) => {
    setHasVariation(event.target.checked);
  };


    

  return (
    <div className='bg-zinc-900 container h-screen mx-auto flex flex-col items-center'>
      <h1 className='text-9xl mt-40 font-extrabold text-emerald-500'>{chord}</h1>
      <button onClick={handleClick} className='text-white font-bold bg-emerald-500 text-3xl p-2 my-32 w-[150px] rounded-sm'>
        {hasStarted ? 'STOP' : 'START'}
      </button>

      <div className='flex flex-col items-center m-4 text-white text-lg font-bold'>
        <label>ChordsList</label>
        <select value={selectChords} className='bg-zinc-900 p-2' onChange={(event) => handleSelect(event, 'chords')}>
          <option value='natural'>only natural</option>
          <option value='flat'>flat</option>
          <option value='sharp'>sharp</option>
          <option value='all'>all</option>
        </select>
      </div>

      <div className='flex flex-col items-center mt-4 text-white text-lg font-bold'>
        <label for='variations'>Variations</label>
        <input type='checkbox' name='variations' checked={hasVariation} onChange={handleCheckboxChange} className='p-2'/>
      </div>

      <div className='flex flex-col items-center mt-4 text-white text-lg font-bold'>
        <label for='timer'>Timer</label>
        <select name='timer' className='bg-zinc-900 p-2' value={selectTimer} onChange={(event) => handleSelect(event, 'timer')}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
        </select>
      </div>
    </div>
  );
}

export default RandomGenerator;