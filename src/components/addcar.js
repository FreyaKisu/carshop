import React, { Component } from "react";
import SkyLight from "react-skylight";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from '@material-ui/core/TextField';
import SaveIcon from "@material-ui/icons/Save";

class addcar extends Component {
  constructor(props) {
    super(props);
    this.state = {brand: '', model: '', color: '', year: '', fuel: '', price: ''};
    this.addModal = React.createRef();
  }

  // Get inputted values
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  // Save input data to states, save them to a variable 'car' and send that variable to the saveCar function in carlist.js
  // or get the function saveCar from carlist.js as a prop
  saveCar = () => {
      const car = {
          brand: this.state.brand, 
          model: this.state.model, 
          color: this.state.color, 
          year: this.state.year, 
          fuel: this.state.fuel, 
          price: this.state.price};
      this.props.saveCar(car);
      // This clears the previously inputted values from the textfields
      this.setState({brand: '', model: '', color: '', year: '', fuel: '', price: ''});
      this.addModal.current.hide();
  }

  render() {
    const addDialog = {
        width: '250px',
        height: '250px',
        marginLeft: '-15%'
      };
  
    return (
      <div>
        <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={() => this.addModal.current.show()}>
        <AddIcon />New car
        </Button>
        <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Add a new car">
            <TextField placeholder="Brand" name="brand" onChange={this.handleChange} value={this.state.brand}></TextField><br/>
            <TextField placeholder="Model" name="model" onChange={this.handleChange} value={this.state.model}></TextField><br/>
            <TextField placeholder="Color" name="color" onChange={this.handleChange} value={this.state.color}></TextField><br/>
            <TextField placeholder="Year" name="year" onChange={this.handleChange} value={this.state.yesr}></TextField><br/>
            <TextField placeholder="Fuel" name="fuel" onChange={this.handleChange} value={this.state.fuel}></TextField><br/>
            <TextField placeholder="Price" name="price" onChange={this.handleChange} value={this.state.price}></TextField>
            <Button style={{ margin: 10 }} variant="contained" color="primary" onClick={this.saveCar}>
            <SaveIcon/>Save</Button>
        </SkyLight>
      </div>
    );
  }
}

export default addcar;
