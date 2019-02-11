import React, { Component } from 'react';
import Pagination from './pagination'
import { paginate } from './paginate'
// import ListGroup from './listGroup';
import _ from 'lodash'
import "font-awesome/css/font-awesome.css"
import Joi from 'joi-browser'


const invertDirection = {
    asc : 'desc',
    desc : 'asc'
}
class Form extends Component {
        state = { 
            list : [],
            specie: { specieName : '', addNotes : '', found : '',time: '', key : ''},
            
            errors: {},
            pageSize: 3,
            currentPage: 1,
            columnToSort: '',
            sortDirection: '',
            sortColumn: { path: 'name', order: 'desc'}
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

 schema = {
    specieName: Joi.string().required().label('Specie Name'),
    addNotes: Joi.string().required().label('Description')
}

validate = () => {  
   // validate entire form
//const options = { abortEarly : false }
//const { error } = Joi.validate(this.state.specie, this.schema, options )
//if (!error) return null 

// const errors = {}
// for (let item of error.details) errors[item.path[0]] = item.message
// return errors


//const errors = {}
//const { specie } = this.state
//if (specie.specieName.trim() === '')  
//errors.specieName = 'Specie name is required.'
//if (this.state.specie.addNotes.trim() === '')   
//this.state.errors.addNotes = 'Say something.'
//return Object.keys(errors).length === 0 ? null : errors
//console.log('validate') 
        }

handleSubmit = (e) => {
e.preventDefault()

//const errors = this.validate()

const specie = this.state.specie
if (specie.specieName !== '' && specie.addNotes !== '' && specie.found !== ''){
const list = [...this.state.list, specie]

this.setState({ list: list, 
specie: {specieName: '', addNotes:'', found:'', key: '', time:'' }})  //errors property should be object never be null
//if (errors) return
}}

handleChange = (e) => {
const specie = {...this.state.specie}
specie[e.currentTarget.name] = e.currentTarget.value.toUpperCase()
specie.key = Date.now()
specie.time = new Date().toLocaleString()
this.setState({ specie : specie })}

createEntry = obs => {
return ( <table className="ui fixed table">
<tbody>
<tr key={obs.key}>
<td>{obs.specieName}</td>
<td>{obs.found}</td>
<td>{obs.addNotes}</td>
<td>{obs.time}</td>

<td key={obs.key}><button onClick={()=>this.handleDelete(obs.key)}>Delete</button></td>
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
   
   if (this.state.sortDirection === "asc") return <i className='fa  fa-sort-asc' />
   return <i className='fa fa-sort-desc' />
   
}

// {this.state.errors && <div>{this.state.errors.specieName}</div>}

render() { 
    const sorted = _.orderBy(this.state.list, this.state.columnToSort, this.state.sortDirection)
    const species = paginate(sorted, this.state.currentPage, this.state.pageSize)
    const speciesList = species.map(this.createEntry)

    
return (         
          
<div>
        <div className="container">
            <div style={{margin:'50px'}}>
            <form onSubmit={this.handleSubmit}>
                <div className="ui inverted segment">                
                <div className="ui inverted form">                
                <div className="field" style={{textAlign: 'center'}}><h1>Birds Observation Form</h1></div>
                    <div className="field">
                        <label htmlFor="specieName">Name <span style={{color: '#8B0000'}}>*</span></label>
                        <input name="specieName" id="specieName" value={this.state.specie.specieName} onChange={this.handleChange} placeholder="Name of Specie.." type="text" />
                        {this.state.errors.specieName && <div>{this.state.errors.specieName}</div>}

                    </div>
                    <div className="field">
                        <label htmlFor="addNotes">Add Notes <span style={{color: '#8B0000'}}>*</span> </label>
                        <textarea name="addNotes" id="addNotes" value={this.state.specie.addNotes} onChange={this.handleChange} placeholder="Add Notes.." type="text" />
                    </div>
                    <div className="field">
                        <label>Rarity <span style={{color: '#8B0000'}}>*</span></label>
                        <select  value={this.state.found} name="found" onChange={this.handleChange} id="found">
                        <option defaultValue className="disabled">-- Select one  --</option>
                        <option value="extremelyRare"> Extremely Rare </option>
                        <option value="rare"> Rare </option>
                        <option value="common"> Common </option>
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
                       <th onClick={() => this.handleSort('time')} style={{cursor: 'pointer'}}> Time {this.renderSortIcon()}</th>
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
