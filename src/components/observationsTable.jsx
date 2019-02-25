import React, { Component } from 'react';

class ObservationsTable extends Component {

  

    render() {
        const { observations, handleDelete, handleSort, handleSortIcon } = this.props

        return (<table className='table'>
            <thead>
                <tr className='clickable'>
                    <th onClick={() => handleSort('name')}> Name {handleSortIcon()}</th>
                    <th> Found </th>
                    <th>Description</th>
                    <th onClick={() => handleSort('date')}>Date {handleSortIcon()}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {observations.map(observation => (<tr key={observation._id}>
                    <td>{observation.name}</td>
                    <td>{observation.category && observation.category.name}</td>
                    <td>{observation.description}</td>
                    <td>{observation.date}</td>
                    <td><button onClick={() => handleDelete(observation)} className='btn btn-danger btn-sm'>Delete</button></td>
                </tr>
                ))}

            </tbody>

        </table>);
    }
}





export default ObservationsTable;