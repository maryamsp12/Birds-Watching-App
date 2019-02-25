import React from 'react';
import FormInputs from './formInputs'
import { saveObservation } from './../fakeObservations/fakeObservations';
import { getCategory } from './../fakeObservations/fakeCategory';


class Form extends FormInputs {
    state = {
        data: { name: '', category: '', description: '', date: '' },
        category: []
    }

    componentDidMount() {
        const category = getCategory()
        this.setState({ category })

        const observationId = this.props.match.params.id; //
        if (observationId === 'new') return; //
    }
    
    doSubmit = () => {
        if (this.state.data.name !== '' && this.state.data.category !== '' && this.state.data.description !== ''){
        saveObservation(this.state.data)
        console.log(this.state.data)
        this.props.history.push('/observations')}
    }

    render() {
        return (
            <div>
                <h1>Observation Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('name', 'Name*')}
                    {this.renderSelect('category', 'Category*', this.state.category)}
                    {this.renderInput('description', 'Description*')}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default Form;
