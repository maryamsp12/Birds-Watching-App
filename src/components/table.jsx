import React, { Component } from 'react';
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({columns, sortColumn, handleSort, data}) => {
 
return (
    <table className="table">
           
            <TableHeader 
            columns={columns} 
            sortColumn={sortColumn} 
            handleSort={handleSort}/>

            <TableBody columns={columns} 
                       data={data}/>
    
    </table>
)
}

export default Table