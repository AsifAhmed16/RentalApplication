import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux';
import { deleteProduct, loadProducts } from '../../redux/action';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MUIDataTable from "mui-datatables";
import ChildBookModal from "./ChildBookModal";
import ChildReturnModal from "./ChildReturnModal";


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
    start_date: null,
    end_date: null,
  });

  const {product_id, used_mileage, start_date, end_date} = state;

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
    let target = event.target;
    let value = target.value;
    let name = target.name;
    if (target.type === 'select-one'){
      name = 'product_id';
    };

    setState({ ...state, [name]: value });
  };

  const columns = [
    { id: 'name', name: 'name', label: 'Name', minWidth: 120, align: 'center', options: {
      filter: true,
      sort: true,
    }},
    { id: 'code', name: 'code', label: 'Code', minWidth: 100, align: 'center', options: {
      filter: true,
      sort: false,
    }},
    { id: 'type', name: 'type', label: 'Type', minWidth: 100, align: 'center', options: {
      filter: true,
      sort: false,
    }},  
    { id: 'durability', name: 'durability', label: 'Durability', minWidth: 100, align: 'center', options: {
      filter: true,
      sort: false,
    }},  
    { id: 'price', name: 'price', label: 'Price', minWidth: 100, align: 'center', options: {
      filter: true,
      sort: false,
    }},  
    { name: "Details", options: { filter: false, sort: false, empty: true,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <Button color="primary" variant="outlined" component={NavLink} 
          to={`/product/details/${products[dataIndex].id}/`}>Details</Button>
        );
      }
    }},
    { name: "Edit", options: { filter: false, sort: false, empty: true,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <Button variant="contained" color="inherit" component={NavLink} 
          to={`/product/edit/${products[dataIndex].id}/`}>Edit</Button>
        );
      }
    }},
    { name: "Delete", options: { filter: false, sort: false, empty: true,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (<Button color="secondary" variant="outlined" 
          onClick={() => handleDelete(products[dataIndex].id)}
          >Delete</Button>
        );
      }
    }}
  ];
  
  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    filter: false,
    download: false,
    print: false
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
      <MUIDataTable data={products.map(product => {
            return [
                product.name,
                product.code,
                product.type,
                product.durability,
                product.price,
            ]
        })}
        columns={columns} 
        options={options} 
      />
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
        <Box sx={{ ...style, width: 300, height: 300 }}>
          <h2 id="parent-modal-title">Return a Product</h2>
          <select onChange={handleInputChange} >
            <option selected value={0} name="product_id">--- Select Product ---</option>
            {
            products.map( (product) => 
              <option key={product.id} value={product.id || 0} name="product_id">{product.name}</option> )
          }</select>
          <br />
          <br />
          <label>Start Date : </label>
          <input 
            type="date" 
            name="start_date"
            className="form-control"
            value={start_date}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <label>End Date &nbsp;&nbsp;: </label>
          <input 
            type="date" 
            name="end_date"
            className="form-control"
            value={end_date}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <TextField id="standard-basic" type="number" onChange={handleInputChange} label="Used Mileage" value={used_mileage || 0} name="used_mileage" />
          <br />
          <br />
          <Button onClick={handleCloseReturn}>No</Button>
          <ChildReturnModal 
            product_id={product_id}
            used_mileage={used_mileage}
            start_date={start_date}
            end_date={end_date}
          />
        </Box>
      </Modal>
      <Modal
        open={openBook}
        onClose={handleCloseBook}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 250 }}>
          <h2 id="parent-modal-title">Book a Product</h2>
          <select onChange={handleInputChange} required>
            <option selected value={0} name="product_id">--- Select Product ---</option>
            {
            products.map( (product) => 
              <option key={product.id} value={product.id || 0} name="product_id">{product.name}</option> )
          }</select>
          <br />
          <br />
          <br />
          <label>Start Date : </label>
          <input 
            type="date" 
            name="start_date"
            className="form-control"
            value={start_date}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <label>End Date &nbsp;&nbsp;: </label>
          <input 
            type="date" 
            name="end_date"
            className="form-control"
            value={end_date}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <Button onClick={handleCloseBook}>No</Button>
          <ChildBookModal 
            product_id={product_id}
            start_date={start_date}
            end_date={end_date}
          />
        </Box>
      </Modal>
    </Paper>
    </div>
  );
}

export default Products;
