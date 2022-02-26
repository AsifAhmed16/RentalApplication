import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import React, { useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux';
import { deleteProduct, loadProducts } from '../../redux/action';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
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

function ChildReturnModal({product_id, used_mileage}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
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
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            {used_mileage}
          </p>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}


const columns = [
  { id: 'name', label: 'Name', minWidth: 120, align: 'center' },
  { id: 'code', label: 'Code', minWidth: 100, align: 'center' },
  { id: 'type', label: 'Type', minWidth: 100, align: 'center' },  
  { id: 'durability', label: 'Durability', minWidth: 100, align: 'center' },
  { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 180, align: 'right' },
];

const useStyles = makeStyles((theme) => ({
  link: {
      margin: theme.spacing(1, 1.5)
  },
  toolbarTitle: {
      flexGrow: 1
  },
  setItemRight: {
    margin: theme.spacing(1),
    float: "right",
    position: "relative",
  }
}));

function Products() {
  const [state, setState] = React.useState({
    product_id: null,
    used_mileage: null,
  });

  const {product_id, used_mileage} = state;

  const classes = useStyles();
  let dispatch = useDispatch();

  const { products } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure to delete the product ?")){
      dispatch(deleteProduct(id));
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [openReturn, setOpenReturn] = React.useState(false);
  const handleOpenReturn = () => {
    setOpenReturn(true);
  };
  const handleCloseReturn = () => {
    setOpenReturn(false);
  };

  const [openBook, setOpenBook] = React.useState(false);
  const handleOpenBook = () => {
    setOpenBook(true);
  };
  const handleCloseBook = () => {
    setOpenBook(false);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState({ ...state, [name]: value });
};

  return (
    <div>
      <Toolbar className={classes.toolbar}>
					<Typography
						color="inherit"
						noWrap
            component={'span'} variant={'body2'}
						className={classes.toolbarTitle}
					><h1> Latest Products</h1>
					</Typography>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/product/add/"
					>
						Add A Product
					</Button>
			</Toolbar>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <br />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={product.code}>
                    {columns.map((column) => {
                      const value = product[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "action" ? 
                            <ButtonGroup variant="contained" aria-label="outlined button group">
                            <Button color="primary" component={NavLink} to={`/product/details/${product.id}/`} 
                            >Details</Button>
                            <Button variant="contained" color="inherit" component={NavLink} to={`/product/edit/${product.id}/`}
                            >Edit</Button>
                            <Button color="secondary" 
                            onClick={() => handleDelete(product.id)}
                            >Delete</Button>
                          </ButtonGroup>
                          : <>
                            {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                            </>
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button color="secondary" variant="contained" className={classes.setItemRight} 
        			onClick={handleOpenReturn}>
        Return
      </Button>
      <Button color="primary" variant="contained" className={classes.setItemRight} 
        			onClick={handleOpenBook}>
        Book
      </Button>
      <Modal
        open={openReturn}
        onClose={handleCloseReturn}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 200 }}>
          <h2 id="parent-modal-title">Return a Product</h2>
          <select onChange={handleInputChange} >
            <option selected value={0} name="product_id">--- Select Product ---</option>
            {
            products.map( (product) => 
              <option key={product.id} value={product.id || 0} name="product_id">{product.name}</option> )
          }</select>
          <br />
          <br />
          <TextField id="standard-basic" type="number" onChange={handleInputChange} label="Used Mileage" value={used_mileage || 0} name="used_mileage" />
          <br />
          <br />
          <Button onClick={handleCloseReturn}>No</Button>
          <ChildReturnModal 
            product_id={product_id}
            used_mileage={used_mileage}
          />
        </Box>
      </Modal>
      <Modal
        open={openBook}
        onClose={handleCloseBook}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 200 }}>
          <h2 id="parent-modal-title">Book a Product</h2>
          <select onChange={handleInputChange} >
            <option selected value={0} name="product_id">--- Select Product ---</option>
            {
            products.map( (product) => 
              <option key={product.id} value={product.id || 0} name="product_id">{product.name}</option> )
          }</select>
          <br />
          <br />
          <br />
          <br />
          <Button onClick={handleCloseBook}>No</Button>
          <ChildReturnModal 
            product_id={product_id}
            used_mileage={used_mileage}
          />
        </Box>
      </Modal>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}

export default Products;
