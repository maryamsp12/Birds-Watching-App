import React, { Component } from 'react';
import { getObservations } from './../fakeObservations/fakeObservations';
import { getCategory } from './../fakeObservations/fakeCategory';
import Pagination from './pagination';
import { paginate } from './paginate';
import ListGroup from './listGroup';
import ObservationsTable from './observationsTable';
import _ from 'lodash'



class Observations extends Component {
    state = {
        observations: [],
        category: [],
        pageSize: 4,
        currentPage: 1,
        selectedCategory: null,
        sortColumn: { path: 'date', order: 'desc' },
        sortDirection: ''
    }

    componentDidMount() {
        const category = [{ _id: '', name: 'All Observations' }, ...getCategory()]
        this.setState({ observations: getObservations(), category: category })
    }

    handleDelete = (observation) => {
        const observations = this.state.observations.filter(m => m._id !== observation._id)
        this.setState({ observations })
    }
    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    }

    handleCategorySelect = (Category) => {
        this.setState({ selectedCategory: Category, currentPage: 1 })
    }
    handleSort = path => {
        const sortColumn = { ...this.state.sortColumn }
        if (sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({ sortColumn })
    }
    
    handleSortIcon = (column) => {
        if (this.state.sortColumn.order === "asc") return <i className='fa  fa-sort-asc' />
        return <i className='fa fa-sort-desc' />
    }


    render() {
        const { length: count } = this.state.observations
        const { pageSize, currentPage, selectedCategory, sortColumn, observations: allObservations } = this.state

        if (count === 0)
            return <p>There are no observations in the local Storage. </p>

        const filtered = selectedCategory && selectedCategory._id
            ? allObservations.filter(m => m.category._id === selectedCategory._id)
            : allObservations;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const observations = paginate(sorted, currentPage, pageSize)


        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup listCategory={this.state.category}
                        selectedCategory={this.state.selectedCategory}
                        onCategorySelect={this.handleCategorySelect} />
                </div>
                <div className='col'> <p>There are {filtered.length}  Observation recorded.</p>
                    <ObservationsTable handleDelete={this.handleDelete}
                        observations={observations}
                        handleSort={this.handleSort}
                        handleSortIcon={this.handleSortIcon} />
                    <Pagination ObservationsCount={filtered.length}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage} />
                </div></div>
        );
    }
}

export default Observations;