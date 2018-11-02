import React, { Component } from "react";
import ReactTable from "react-table";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Addcar from "./addcar";
import SaveIcon from "@material-ui/icons/Save";
import "react-table/react-table.css";

class Carlist extends Component {
  constructor(params) {
    super(params);
    this.state = { cars: [], showSnack: false };
  }

  componentDidMount() {
    this.listCars();
  }

  // Get all cars
  listCars = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ cars: responseData._embedded.cars });
      });
  };

  // Delete a car
  deleteCar = link => {
    fetch(link, { method: "DELETE" }).then(response => {
      this.listCars();
      this.setState({ showSnack: true });
    });
  };

  // Save a new car and get updated listing (car comes from addcar.js)
  saveCar = car => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    }).then(response => {
      this.listCars();
    });
  };

  // Update a car
  updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    }).then(response => {
      this.listCars();
    });
  };

  // Render table cells in editable form
  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.cars];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ cars: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.cars[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  handleClose = () => {
    this.setState({
      showSnack: false
    });
  };

  render() {
    const columns = [
      {
        Header: "Brand",
        accessor: "brand",
        Cell: this.renderEditable
      },
      {
        Header: "Model",
        accessor: "model",
        Cell: this.renderEditable
      },
      {
        Header: "Year",
        accessor: "year",
        Cell: this.renderEditable
      },
      {
        Header: "Color",
        accessor: "color",
        Cell: this.renderEditable
      },
      {
        Header: "Fuel",
        accessor: "fuel",
        Cell: this.renderEditable
      },
      {
        Header: "Price (€)",
        accessor: "price",
        Cell: this.renderEditable
      },
      {
        Header: "",
        accessor: "_links.self.href",
        filterable: false,
        sortable: false,
        Cell: ({ row, value }) => (
          <IconButton
            onClick={() => this.updateCar(row, value)}
            aria-label="Save"
          >
            <SaveIcon fontSize="small" />
          </IconButton>
        )
      },
      {
        Header: "",
        accessor: "_links.self.href",
        filterable: false,
        sortable: false,
        Cell: ({ value }) => (
          <IconButton onClick={() => this.deleteCar(value)} aria-label="Delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        )
      }
    ];

    return (
      <div>
        <Addcar saveCar={this.saveCar} />
        <ReactTable
          filterable={true}
          defaultPageSize={10}
          data={this.state.cars}
          columns={columns}
        />
        <Snackbar
          message={"Car deleted"}
          open={this.state.showSnack}
          autoHideDuration={3000}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Carlist;
