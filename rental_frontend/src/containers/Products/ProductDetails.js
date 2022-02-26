import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadSingleProduct } from '../../redux/action';


const useStyles = makeStyles((theme) => ({
    link: {
        margin: theme.spacing(1, 1.5)
    },
    toolbarTitle: {
        flexGrow: 1
    }
  }));

const ProductDetails = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        name: "",
        code: "",
        type: "",
        mileage: null,
        availability: true,
        durability: null,
        max_durability: null,
        price: null,
        minimum_rent_period: null,
        needing_repair: true,
    });

    const {name, code, type, mileage, availability, durability, max_durability, 
        price, minimum_rent_period, needing_repair} = state;
    
    const { product } = useSelector(state => state.data);
    let { id } = useParams();
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(loadSingleProduct(id));
    }, []);

    useEffect(() => {
      if(product){
          setState({ ...product });
      }
    }, [product]);

    return (
        <div>
            <Toolbar className={classes.toolbar}>
              <Typography
                color="inherit"
                noWrap
                            component={'span'} variant={'body2'}
                className={classes.toolbarTitle}
                  ><h1> Product Details</h1>
              </Typography>
              <Button
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
                component={NavLink}
                to='/product/'
              >Product List
              </Button>
			      </Toolbar>
            <Toolbar className={classes.toolbar}>
                <Typography
                  color="inherit"
                  noWrap
                  component={'span'} variant={'body2'}
                  className={classes.toolbarTitle}>
                    <br />
                    <br />
                    <span>
                      <b style={{ color: 'blue', fontSize: 20 }}>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {name}</label>
                      <br />
                      <b style={{ color: 'blue', fontSize: 20 }}>Code &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {code}</label>
                      <br />
                      <b style={{ color: 'blue', fontSize: 20 }}>Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {type}</label>
                      <br />
                      <b style={{ color: 'blue', fontSize: 20 }}>Durability &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {durability}</label>
                      <br />
                      <b style={{ color: 'blue', fontSize: 20 }}>Maximum Durability &nbsp;&nbsp; : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {max_durability}</label>
                      <br />
                      <b style={{ color: 'blue', fontSize: 20 }}>Needing Repair &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {needing_repair ? "Yes": "No"}</label>
                      <br />
                      <b style={{ color: 'blue', fontSize: 20 }}>Availability &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {availability ? "Yes": "No"}</label>
                      <br />
                      <b style={{ color: 'blue', fontSize: 20 }}>Mileage &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {mileage}</label>
                      <br />
                      <b style={{ color: 'blue', fontSize: 20 }}>Price &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {price}</label>
                      <br />
                      <b style={{ color: 'blue', fontSize: 20 }}>Minimum Rent Period : &nbsp;</b>
                      <label style={{ color: 'brown', fontSize: 20 }}>&nbsp;&nbsp; {minimum_rent_period}</label>
                    </span>
                </Typography>
            </Toolbar>
        </div>
    );
};

export default ProductDetails;
