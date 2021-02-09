import React, { Component } from 'react'


class CategoryDetailPage extends Component {

    static routeName = '/:category'

    constructor(props) {
        super(props)
        this.state = {
            category: {},
        }
    }

    static getDerivedStateFromProps(props, state) {
        const _id = props.match.params.category
        console.log(_id)
    }

    render() {
        return (
            <React.Fragment>
                Category Detail Page
            </React.Fragment>
        )
    }
}

export default CategoryDetailPage