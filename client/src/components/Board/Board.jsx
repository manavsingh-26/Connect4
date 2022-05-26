import React, { useEffect } from 'react'
import './Board.css'
import Tile from './Tile'
import Winner from '../Winner/Winner'
import socket from '../../Socket/Socket'
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import useSound from 'use-sound';
import coin from './coin.wav'
import Chat from '../Chat/Chat'


const Board = () => {


    const [win, setWin] = React.useState(false);
    const [winText, setWinText] = React.useState('');
    const [board, setBoard] = React.useState([]);
    const [player, setPlayer] = React.useState(0);
    const [turn, setTurn] = React.useState(false);
    const [confettiOn, setConfetti] = React.useState(false);

    const [play] = useSound(coin);

    socket.once('init', num => setPlayer(num));
    socket.once('gameBoard', (data) => {
        setBoard(data.currBoard);
    })
    socket.on('active', isTrue => setTurn(isTrue));
    socket.on('new_move', (coords) => {
        let r = coords[0][0];
        let c = coords[0][1];
        let color = coords[1];
        let tile = document.getElementById(r.toString() + "-" + c.toString());


        if (color == 'm') {
            if (player === 1)
                tile.classList.add("red-piece");
            else if (player === 2)
                tile.classList.add("yellow-piece");
        }
        else {
            if (player === 2)
                tile.classList.add("red-piece");
            else if (player === 1)
                tile.classList.add("yellow-piece");
        }

    })

    socket.on("winner", () => {
        setWinText("Congratulations You Won!!");
        setWin(true);
        setConfetti(true);
    })

    socket.on("loser", () => {
        setWinText("You Lose :( ");
        setWin(true);
    })

    socket.on("draw", () => {
        setWinText("Oops.. Its a Draw!!!");
        setWin(true);
    })



    const setTile = (id) => {
        if (turn) {
            play();
            socket.emit('make_move', [id, player]);
        }

    }

    const { width, height } = useWindowSize()




    if (turn) {
        let doc = document.getElementById('tt');
        if (player === 1) {
            doc.style.backgroundColor = '#cf0000';
        }
        else {
            doc.style.backgroundColor = '#afaa00';
        }
    }
    else {
        let doc = document.getElementById('tt');
        if (doc) {
            if (player === 1) {
                doc.style.backgroundColor = '#afaa00';
            }
            else {
                doc.style.backgroundColor = '#cf0000';
            }
        }


    }



    return (
        <div style={{ textAlign: 'center' }}>
            {confettiOn && <Confetti
                width={width}
                height={height}
            />}
            <div id='board'>
                <Winner onWin={win} winnerText={winText} />
                {board.map((row, rid) => {
                    return row.map((val, cid) => {
                        return <Tile turn={turn} column={cid} key={rid.toString() + '-' + cid.toString()} getid={setTile} id={rid.toString() + '-' + cid.toString()} />
                    })
                })}

            </div>
            <div></div>
            <div id='tt' className='turns' > {turn ? <h1>Your Turn</h1> : <div className='waiting'><h2>Waiting for Opponent</h2><span></span><span></span><span></span> </div>}</div>
            <Chat />
        </div>
    )
}

export default Board