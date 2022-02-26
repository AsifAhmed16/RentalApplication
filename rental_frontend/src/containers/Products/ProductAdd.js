import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct, loadProducts } from '../../redux/action';


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

const ProductAdd = () => {
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

    const [error, setError] = useState("");

    const {name, code, type, mileage, availability, durability, max_durability, 
        price, minimum_rent_period, needing_repair} = state;

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({ ...state, [name]: value });
    };

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!name || !code || !type || !mileage || !durability || !max_durability || !price || !minimum_rent_period){
            setError("Please fill all the input fields.");
        } else {
            dispatch(addProduct(state));
            dispatch(loadProducts());
            navigate("/product/");
            setError("");
        }
    };

    return (
        <div>
            <Toolbar className={classes.toolbar}>
					<Typography
						color="inherit"
						noWrap
                        component={'span'} variant={'body2'}
						className={classes.toolbarTitle}
					    ><h1> Add a Product</h1>
					</Typography>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to='/product/'
					>
                        Product List
					</Button>
			</Toolbar>
            {error && <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    marginTop: 10,
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                >
                <TextField id="standard-basic" label="Name" onChange={handleInputChange} value={name || ""} name="name"/>
                <TextField id="standard-basic" label="Code" onChange={handleInputChange} value={code || ""} name="code"/>
                <TextField id="standard-basic" label="Type" onChange={handleInputChange} value={type || ""} name="type"/>
                <TextField id="standard-basic" type="number" onChange={handleInputChange} label="Mileage" value={mileage || 0.0} name="mileage"/>
                <FormControlLabel control={<Checkbox onChange={handleInputChange}
  checked={availability || true}/>} label="Availability" name="availability"/>
                <TextField id="standard-basic" type="number" onChange={handleInputChange} label="Durability" value={durability || 0.0} name="durability"/>
                <TextField id="standard-basic" type="number" onChange={handleInputChange} label="Max-Durability" value={max_durability || 0.0} name="max_durability"/>
                <TextField id="standard-basic" type="number" onChange={handleInputChange} label="Price" value={price || 0.0} name="price"/>
                <TextField id="standard-basic" type="number" onChange={handleInputChange} label="Minimum Rent Period" value={minimum_rent_period || 0} name="minimum_rent_period"/>
                <FormControlLabel control={<Checkbox onChange={handleInputChange}
  checked={needing_repair || true} />} label="Needing Repair" name="needing_repair"/>
                <br />
                <br />
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.setItemRight}
                    type="submit"
                    >
                    Submit
                </Button>
            </Box>
        </div>
    );
};

export default ProductAdd;
