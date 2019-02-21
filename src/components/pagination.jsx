import React, { Component } from 'react';
import _ from 'lodash'

const Pagination = (props) => {
    const pagesCount = Math.ceil(props.obsCount / 6)
    // in case of only 1 page, we don't want to show 1
    if (pagesCount === 1) return null
    const pages = _.range(1, pagesCount + 1)




    return (
        <nav>
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={page === props.currentPage ? 'page-item active' : 'page-item'}>
                        <a class="page-link" onClick={() => { props.onPageChange(page) }}>{page}</a></li>
                ))}
            </ul>
        </nav>
    )


}

export default Pagination;