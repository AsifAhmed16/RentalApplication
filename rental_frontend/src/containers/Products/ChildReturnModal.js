import React from 'react';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux';
import { productReturnCosting, returnProduct } from '../../redux/action';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function ChildReturnModal({product_id, start_date, end_date, used_mileage}) {
    const [state, setState] = React.useState({
        total_cost: null,
    });

    let dispatch = useDispatch();
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      dispatch(productReturnCosting(product_id, start_date, end_date));
      setOpen(true);
    };

    const { total_cost } = useSelector(state => state.data);

    const handleClose = () => {
      setOpen(false);
    };

    const handleConfirm = () => {
        dispatch(returnProduct(product_id, start_date, end_date, used_mileage));
        setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Yes</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 210, height: 350 }}>
            <br />
            <h2 id="child-modal-title">Are you sure want to return the product ... ?</h2>
            <br />
            <p id="child-modal-description">
              Booked from {start_date} till {end_date}
            </p>
            <br />
            <p id="child-modal-description">
              Total price : ${total_cost}
            </p>
            <br />
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
}

export default ChildReturnModal;
