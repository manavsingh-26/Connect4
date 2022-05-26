import React, { useEffect, useState } from 'react';
import { Launcher } from 'popup-chat-react';
import socket from '../../Socket/Socket';



const Chat = () => {

    const [state, setState] = useState({
        messageList: [],
        newMessagesCount: 0,
        isOpen: false,
        fileUpload: true,
    });

    useEffect(() => {
        socket.on('message_recieve', (message) => {
            const newMessagesCount = state.isOpen ? state.newMessagesCount : state.newMessagesCount + 1;
            console.log(newMessagesCount)
            setState(state => ({
                ...state,
                newMessagesCount: newMessagesCount,
                messageList: [
                    ...state.messageList,
                    message

                ]
            }));
        })


        return function cleanup() { socket.off('message_recieve') }
    }, [])



    function onMessageWasSent(message) {

        socket.emit('new_message', message);
        setState(state => ({
            ...state,
            messageList: [...state.messageList, message]
        }));


    }


    function onClick() {
        setState(state => ({
            ...state,
            isOpen: !state.isOpen,
            newMessagesCount: 0
        }));
    }


    return (

        <div>
            <Launcher
                agentProfile={{
                    teamName: 'You',

                }}
                onFilesSelected={() => { }}
                onMessageWasSent={onMessageWasSent}
                messageList={state.messageList}
                newMessagesCount={state.newMessagesCount}
                onClick={onClick}
                isOpen={state.isOpen}
                showEmoji
                fileUpload={false}
                placeholder='Enter text'
            />



        </div>

    )
}

export default Chat
