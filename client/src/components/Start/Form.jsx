import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import socket from '../../Socket/Socket';


import './start.css';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  justifyContent: 'center',

  textAlign: 'center',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  height: '25%',
  backgrounColor: 'rgb(196, 196, 255)',
  bgcolor: 'background.paper',

  borderRadius: '10%',
  boxShadow: 24,
  p: 4,
};



const Form = (props) => {

  const [code, setcode] = useState('');

  const handleChange = (e) => {
    setcode(e.target.value);
  }

  const handleNewGame = () => {

    socket.emit('new-game');
    socket.on('gameCode', (gamecode) => {

    })


    props.onClick()
  }

  const handleJoinGame = (e) => {
    e.preventDefault();
    socket.emit('join-game', code);

    socket.on('unknownCode', () => {
      alert('wrong code')
    })

    socket.on('roomFull', () => {
      alert('Room Full');
    })

    socket.on('gameCode', (e) => {
      props.onClick();
    })




  }


  return (
    <Box sx={style}>
      <div className='boxx'>
        <div className='new-game'>
          <Button onClick={handleNewGame} size='large' variant="contained" style={{ padding: '0.9rem 2rem' }}>New Game</Button>
          <h1>{''}</h1>
        </div>
        <div className='join-game'>
          <form onSubmit={handleJoinGame}>
            <TextField id="outlined-basic" label="Enter Code" size='large' variant="outlined" style={{ marginRight: '10px' }} value={code} onChange={handleChange} required />
            <Button type='submit' variant="contained" size='large' style={{ padding: '0.9rem 2rem' }}>Join Game</Button>
          </form>
        </div>
      </div>
    </Box>
  )
}

export default Form