import React, { Component } from 'react';
import Pagination from './pagination'
import { paginate } from './paginate'
import "font-awesome/css/font-awesome.css"
import Joi from 'joi-browser'
import _ from 'lodash'


const invertDirection = {
    asc : 'desc',
    desc : 'asc'
}
  
class Form extends Component {
        state = { 
            list : [],
            specie: { specieName : '', addNotes : '', found : '',time: '',image : '', key : ''},            
            errors: {},
            pageSize: 3,
            currentPage: 1,
            columnToSort: '',
            sortDirection: '',
            sortColumn: { path: 'name', order: 'desc'}
                   }

                   componentDidMount() {
                    this.hydrateStateWithLocalStorage();
                    window.addEventListener(
                    "beforeunload",
                    this.saveStateToLocalStorage.bind(this)) }
                
                componentWillUnmount() {
                    window.removeEventListener(
                    "beforeunload",
                    this.saveStateToLocalStorage.bind(this)
                    );
                    this.saveStateToLocalStorage();}
                
                hydrateStateWithLocalStorage() {
                    for (let key in this.state) {
                    if (localStorage.hasOwnProperty(key)) {
                    let value = localStorage.getItem(key);
                    try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                    } catch (e) {
                    this.setState({ [key]: value }); }}}}
                
                saveStateToLocalStorage() {
                    for (let key in this.state) {
                    localStorage.setItem(key, JSON.stringify(this.state[key]));}}

updateInput(key, value) {
    this.setState({ [key]: value });}

 schema = {
    specieName: Joi.string().required().label('Specie Name'),
    addNotes: Joi.string().required().label('Description')
}

    handleChange = (e) => {
        const specie = {...this.state.specie}
        specie[e.currentTarget.name] = e.currentTarget.value
        specie.key = Date.now()
        specie.time = new Date().toLocaleString()
        this.setState({ specie : specie })}
    
    handleSubmit = (e) => {
        e.preventDefault()
        const specie = this.state.specie
        if (specie.specieName !== '' && specie.addNotes !== '' && specie.found !== ''){
        const list = [...this.state.list, specie]
        
        this.setState({ list: list, 
        specie: {specieName: '', addNotes:'', found:'',image: '', key: '', time:'' }})
        }}


    createEntry = obs => {
            return ( <table className="ui fixed table">
            <tbody>
            <tr key={obs.key}>
            <td>{obs.specieName}</td>
            <td>{obs.found}</td>
            <td>{obs.addNotes}</td>
            <td>{obs.time}</td>
            <td>{obs.image}</td>
            
            <td key={obs.key}><button onClick={()=>this.handleDelete(obs.key)} className="btn btn-danger" >Delete</button></td>
            </tr></tbody>
            </table>)}

    handleDelete = key => {
        const list = [...this.state.list]
        const filteredList = list.filter( obs => {   return obs.key !== key     })
        this.setState({list: filteredList})  } 
    
    handlePageChange = page => {
        this.setState ({ currentPage : page})
        }
    
    handleSort = (columnName) => {
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
       return <i className='fa fa-sort-desc' />}


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
                       

                    </div>
                    <div className="field">
                        <label htmlFor="addNotes">Add Notes <span style={{color: '#8B0000'}}>*</span> </label>
                        <textarea name="addNotes" id="addNotes" value={this.state.specie.addNotes} onChange={this.handleChange} placeholder="Add Notes.." type="text" />
                    </div>
                    
                    <div className="field">
                        <label>Rarity <span style={{color: '#8B0000'}}>*</span></label>
                        <select  value={this.state.found} name="found" onChange={this.handleChange} id="found">
                        <option defaultValue className="disabled">-- Select one  --</option>
                        <option value="Extremely Rare" id="1"> Extremely Rare </option>
                        <option value="Rare" id=""> Rare </option>
                        <option value="Common" id=""> Common </option>
                        </select>
                    </div>
                    <button className="ui submit button field">Save</button>
                </div></div></form>      
            </div> </div>
           
            
            <div className="container">
                    <div className="row">
                    
                    <div className="col">      
                    <div style={{marginBottom:'10px'}}>
                    <h1 style={{textAlign:'center'}}>YOUR SIGHTINGS</h1>

                    </div>
                      <table class="ui fixed table">
                       <thead >
                       <tr>
                       <th onClick={() => this.handleSort('name')} style={{cursor: 'pointer'}}> Specie Name {this.renderSortIcon()} </th>
                       <th onClick={() => this.handleSort('found')} style={{cursor: 'pointer'}}> Rarity {this.renderSortIcon()}</th>
                       <th>Description</th>
                       <th onClick={() => this.handleSort('time')} style={{cursor: 'pointer'}}> Time {this.renderSortIcon()}</th>
                       <th></th>
                       <th></th>
                       
                       </tr>
                       </thead>
                       </table>
                       {speciesList}

                    <div style={{marginTop: '20px'}}>
                       <Pagination obsCount={this.state.list.length}
                                    pageSize={10}
                                    currentPage={this.state.currentPage}
                                    onPageChange={this.handlePageChange}/>
                    </div>
                    </div> 
            </div>
    </div>                  </div>
            
           

        
         );
    }}

 
export default Form;
