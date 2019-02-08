import React, { Component } from 'react';


    class Form extends Component {
        state = { 
            list : [],
            specie: { specieName : '', addNotes : '', found : '', key : '' }
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
specie: {specieName: ' ', addNotes:' ', found:' ', key: timeStamp }}) } 
console.log(this.state.list)
}

handleChange = (e) => {
const specie = {...this.state.specie}
specie[e.currentTarget.name] = e.currentTarget.value 
this.setState({ specie : specie })}

createEntry = obs => {
return ( <table className="ui fixed table">
<tbody>
<tr key={obs.key}>
<td>{obs.specieName}</td>
<td>{obs.addNotes}</td>
<td>{obs.found}</td>
<td><button onClick={()=>this.handleDelete(obs.key)}>Delete</button></td>
</tr></tbody>
</table>)}

handleDelete = key => {
const list = [...this.state.list]
const filteredList = list.filter( obs => {   return obs.key !== key     })
this.setState({list: filteredList})  } 



render() { 
    const species = this.state.list
    const speciesList = species.map(this.createEntry)

return ( 

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
            </div>
           
            
            <div>
                    
                    <h1 style={{textAlign:'center'}}>YOUR SIGHTINGS</h1>
       
                       <div>
                       <table class="ui fixed table">
                       <thead >
                       <tr><th>Name</th>
                       <th>Found</th>
                       <th>Description</th>
                       <th></th>
                       </tr>
                       </thead>
                       </table>
                       {speciesList}</div>
                       
                    </div>
           

        </div>
         );
    }}

 
export default Form;
