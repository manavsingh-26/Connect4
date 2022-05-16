import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Winnertext from './Winnertext'



export default function Winner(props) {


    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        setOpen(props.onWin)
    }, [props.onWin])

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}

                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 1000,
                }}
            >
                <Fade in={open}>
                    <div>
                        <Winnertext text={props.winnerText} />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}



