import React, { Component } from 'react';
import Pagination from './pagination'
import { paginate } from './paginate'
// import ListGroup from './listGroup';
import _ from 'lodash'
import "font-awesome/css/font-awesome.css"

// import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'
// import UpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up'

const invertDirection = {
    asc : 'desc',
    desc : 'asc'
}




    class Form extends Component {
        state = { 
            list : [],
            specie: { specieName : '', addNotes : '', found : '', key : '' },
            pageSize: 3,
            currentPage: 1,
            columnToSort: '',
            sortDirection: ''
           // sortColumn: { path: 'name', order: 'asc'}
        }

componentDidMount() {
    this.hydrateStateWithLocalStorage();            
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this)) }

componentWillUnmount() {
    window.removeEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this)
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();}

hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty(key)) {
    // get the key's value from localStorage
    let value = localStorage.getItem(key);
    // parse the localStorage string and setState
    try {
    value = JSON.parse(value);
    this.setState({ [key]: value });
    } catch (e) {
    // handle empty string
    this.setState({ [key]: value }); }}}}

saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
    // save to localStorage
    localStorage.setItem(key, JSON.stringify(this.state[key]));}}

updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });}

handleSubmit = (e) => {
e.preventDefault()
const timeStamp = Date.now()
const specie = this.state.specie
if (specie.specieName !== ''){
const list = [...this.state.list, specie]
this.setState({ list: list, 
specie: {specieName: ' ', addNotes:' ', found:' ', timeStamp: Date.now() }}) } 
}

handleChange = (e) => {
e.preventDefault()
const specie = {...this.state.specie}
specie[e.currentTarget.name] = e.currentTarget.value.toUpperCase()
this.setState({ specie : specie })
// console.log(this.state.specie.timeStamp)

}

createEntry = obs => {
return ( <table className="ui fixed table">
<tbody>
<tr key={obs.key}>
<td>{obs.specieName}</td>
<td>{obs.found}</td>
<td>{obs.addNotes}</td>
<td>{obs.timeStamp}</td>
<td><button onClick={()=>this.handleDelete(obs.key)}>Delete</button></td>
</tr></tbody>
</table>)}

handleDelete = key => {
const list = [...this.state.list]
const filteredList = list.filter( obs => {   return obs.key !== key     })
this.setState({list: filteredList})  } 

handlePageChange = page => {
this.setState ({ currentPage : page})
}
handleItemSelect = item => {
console.log()
 }
handleSort = (columnName) => {
// const sortColumn = {...this.state.sortColumn}
// if (sortColumn.path === path)
//    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc"
//    else {
//        sortColumn.path = path
//        sortColumn.order = "asc"
//    }
// setState({ sortColumn : { path: path, order: 'asc' } })
this.setState ( state => ({
    columnToSort: columnName,
    sortDirection:
    state.columnToSort === columnName
    ? invertDirection[state.sortDirection]
    : 'asc'
}))

} 
renderSortIcon = column => {
   if (this.state.columnToSort !== this.state.columnToSort) return null
   if (this.state.sortDirection === "asc") return <i className='fa  fa-sort-asc' />
   return <i className='fa fa-sort-desc' />
   
}


render() { 
  //  const sorted = _.orderBy(this.state.list, [this.state.sortColumn.path], [this.state.sortColumn.order])
    const sorted = _.orderBy(this.state.list, this.state.columnToSort, this.state.sortDirection)
    const species = paginate(sorted, this.state.currentPage, this.state.pageSize)
    const speciesList = species.map(this.createEntry)

// {this.state.columnToSort === 'name' ? (this.state.sortDirection === "asc" ? ( <UpArrow /> ) : ( <DownArrow />) ) : null}
    
return (         
          
<div>
        <div className="container">
            <div style={{margin:'50px'}}>
            <form onSubmit={this.handleSubmit}>
                <div className="ui inverted segment">                
                <div className="ui inverted form">                
                <div className="field" style={{textAlign: 'center'}}><h1>Birds Observation Form</h1></div>
                    <div className="field">
                        <label htmlFor="specieName">Name</label>
                        <input value={this.state.specieName} name="specieName" id="specieName" onChange={this.handleChange} placeholder="Name of Specie.." type="text" />
                    </div>
                    <div className="field">
                        <label htmlFor="addNotes">Add Notes</label>
                        <textarea value={this.state.addNotes} name="addNotes" id="addNotes" onChange={this.handleChange} placeholder="Add Notes.." type="text" />
                    </div>
                    <div className="field">
                        <select  value={this.state.found} name="found" onChange={this.handleChange} id="found">
                        <option value="extremelyRare"> Extremely Rare </option>
                        <option value="rare"> Rare </option>
                        <option defaultValue value="common"> Common </option>
                        </select>
                    </div>
                    <button className="ui submit button field">Save</button>
                </div></div></form>      
            </div> </div>
           
            
            <div className="container">
                    <div>
                    <h1 style={{textAlign:'center'}}>YOUR SIGHTINGS</h1>
                      <table class="ui fixed table">
                       <thead >
                       <tr>
                       <th onClick={() => this.handleSort('name')} style={{cursor: 'pointer'}}> name {this.renderSortIcon()} </th>
                       <th onClick={() => this.handleSort('found')} style={{cursor: 'pointer'}}> found {this.renderSortIcon()}</th>
                       <th>Description</th>
                       <th>timeStamp</th>
                       <th></th>
                       
                       </tr>
                       </thead>
                       </table>
                       {speciesList}</div>

                    <div style={{marginTop: '20px'}}>
                       <Pagination obsCount={this.state.list.length}
                                    pageSize={4}
                                    currentPage={this.state.currentPage}
                                    onPageChange={this.handlePageChange}/>
                    </div>
            </div>
    </div>                  
            
           

        
         );
    }}

 
export default Form;
