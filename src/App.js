import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props) {
      super(props);
      this.child = React.createRef();
    }
    state = {

        maxNo: 3,   // record for next no of boardno

        boards: [

            {

                brdno: 1,

                brdwriter: 'Kwon Julia',

                brdtitle: 'Save up to 30% on Tickets',

                brddate: new Date()

            },

            {

                brdno: 2,

                brdwriter: 'Kim Simon',

                brdtitle: 'Get A 2019 Season Pass',

                brddate: new Date()

            }

        ]

    }

    // add new data
    // handleSaveData = (data) => {
    //   this.setState({
    //     maxNo: this.state.maxNo+1,
    //     boards: this.state.boards.concat({brdno:this.state.maxNo, brddate: new Date(), ...data})
    //   });
    // }

    // remove the selected data using filter
    handleRemove = (brdno) => {
      this.setState({
        boards: this.state.boards.filter(row => row.brdno !== brdno)
      })
    }

    handleSelectedRow = (row) => {

      this.setState({selectedBoard: row});

    }

    render() {

        const { boards } = this.state;

        return (

           <div>

              <BoardForm selectedBoard = {selectedBoard} onSaveData = {this.handleSaveData} />

                   {

                       boards.map(row =>

                          // show all data
                          // (<BoardItem key={row.brdno} row={row} />)

                          // show data without the deleted data
                          (<BoardItem key={row.brdno} row={row} onRemove={this.handleRemove}
                            onSelectRow = {this.handleSelectRow} />)
                       )

                   }

           </div>

       );

    }

}

// return Form with title and writer fields to save new board item
class BoardForm extends React.Component{
  state = {
    brdwriter:'',
    brdtitle:''
  }

  handleSelectedRow = (row) => {
      this.setState(row);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {

        e.preventDefault();

        this.props.onSaveData(this.state);

        this.setState({
          brdno:'',
          brdwriter:'',
          brdtitle:'
        });

    }

    render() {

        return (

            <form onSubmit={this.handleSubmit} class="BoardForm-form">
             <table><tr><td>
              Name:  </td><td><input size="30" name="brdwriter" value={this.state.brdwriter} onChange={this.handleChange}/>
              </td></tr>
              <tr><td>
              Title:  </td><td><input size="30"  name="brdtitle" value={this.state.brdtitle} onChange={this.handleChange}/>

                <button type="submit">Save</button>
                </td></tr>
            </table>
            </form>

        );

    }
}

// to return one borad item into tr tag
class BoardItem extends React.Component {

    handleRemove = () => {
      const {row, onRemove} = this.props;
      onRemove(row.brdno);
    }

    render() {

        return(

          <table class="BoardItem-table">
            <tr>
                <td>No. {this.props.row.brdno}</td>
                <td class="BoardItem-button"> <button onClick={this.handleRemove}>X</button> </td>
            </tr>
            <tr>
                <td class="BoardItem-writer" colspan="2">By  {this.props.row.brdwriter}
               ({this.props.row.brddate.toLocaleDateString('en')}) </td>
            </tr>
            <tr>
                <td class="BoardItem-title" colspan="2">
                  {this.props.row.brdtitle}
                </td>
            </tr>
         </table>
        );

    }

}

export default App;
