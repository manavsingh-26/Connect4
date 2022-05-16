import React, { useState } from 'react'
import socket from '../../Socket/Socket'
import './Board.css'



const Tile = (props) => {

  const handleAnimationIn = () => {
    let coords = props.id.split('-');

    let c = parseInt(coords[1]);
    if (props.turn) {
      for (let r = 0; r < 6; r++) {
        let tile = document.getElementById(r.toString() + '-' + c.toString());
        tile.style.borderColor = "#4381b0"
      }
    }

  }
  const handleAnimationOut = () => {
    let coords = props.id.split('-');
    let c = parseInt(coords[1]);
    if (props.turn) {
      for (let r = 0; r < 6; r++) {
        let tile = document.getElementById(r.toString() + '-' + c.toString());
        tile.style.borderColor = "#1f2a75"

      }
    }


  }

  const handleClick = () => {
    props.getid(props.id);
    let coords = props.id.split('-');
    let c = parseInt(coords[1]);
    if (props.turn) {
      for (let r = 0; r < 6; r++) {
        let tile = document.getElementById(r.toString() + '-' + c.toString());
        tile.style.borderColor = "#1f2a75"

      }
    }
  }

  return (
    <div onClick={handleClick} onMouseOver={handleAnimationIn} onMouseLeave={handleAnimationOut} className={'tile'} id={props.id} ></div>
  )
}

export default Tile