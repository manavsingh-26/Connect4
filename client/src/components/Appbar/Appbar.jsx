import React, { useEffect, useState } from 'react'
import './Appbar.css'
import socket from '../../Socket/Socket'
import music from './background-music.wav';
import useSound from 'use-sound';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';



const Appbar = () => {


  const [playMusic, setPlayMusic] = useState(false);
  const [play, { stop, isPlaying }] = useSound(music);

  useEffect(() => {

    if (playMusic) {
      if (!isPlaying)
        play();
    }

    else {
      stop();

    }

  }, [playMusic])

  useEffect(() => {
    if (playMusic && !isPlaying)
      play();
  }, [isPlaying])

  const [code, setcode] = useState('');
  useEffect(() => {
    socket.on('gameCode', (gameCode) => {
      setcode(gameCode);
    })
  })

  return (
    <header className='appbar'>

      <h1> CONNECT - 4 </h1>
      <button className='music' onClick={() => { setPlayMusic(!playMusic) }} >{playMusic ? <MusicNoteIcon color='white' /> : <MusicOffIcon />}</button>


      <h2>{code === '' ? '' : `Game code : ${code}`}</h2>

    </header>
  )
}

export default Appbar