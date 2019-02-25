import React, { Component } from 'react';

const ListGroup = (props) => {
    const { listCategory, onCategorySelect, selectedCategory } = props

    return (
        <div>
            <ul className="list=group">
            {listCategory.map(item => (
                <li onClick={()=>onCategorySelect(item)} 
                    key={item._id} 
                    className={item === selectedCategory ? 'list-group-item clickable active' : 'list-group-item clickable'}                    
                    >
                    {item.name}
                </li>
            ))}
            </ul>
        </div>);
}

export default ListGroup;