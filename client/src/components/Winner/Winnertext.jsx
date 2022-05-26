import React from 'react'
import Box from '@mui/material/Box';
import './winner.css'




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25%',
  height: '25%',
  backgrounColor: 'rgb(196, 196, 255)',
  bgcolor: 'background.paper',

  borderRadius: '10%',
  boxShadow: 24,
  p: 4,
};



const Winnertext = (props) => {

  return (



    <div className='boxx'>

      <div style={{ textAlign: 'center' }}>

        <h1 >{props.text}</h1>

      </div>




    </div>
  )
}

export default Winnertext