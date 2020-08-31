import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { Box, BoxHeader, BoxFooter } from '../../Box'
import Input from '../../Form/Input/Input'
import Button from '../../Form/Button/Button'
import { saveCategory } from '../../../redux/actions/categoriesActions'
import { resetErrors } from '../../../redux/actions/errorsAction'


class CategoryForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {
                type: {
                    type: 'text', // radio button
                    label: 'Type',
                    value: '',
                    onChange: this.onInputChange,
                },
                name: {
                    type: 'text',
                    label: 'Name',
                    value: '',
                    onChange: this.onInputChange,
                },
                icon: {
                    type: 'text',
                    label: 'Icon',
                    value: '',
                    onChange: this.onInputChange,
                },
                color: {
                    type: 'color',
                    label: 'Color',
                    value: '#000000',
                    onChange: this.onInputChange,
                },
            },
        }
    }

    componentWillUnmount() {
        this.props.resetErrors()
    }

    onInputChange = (e) => {
        e.preventDefault()
        const { id, value } = e.target
        const form = Object.assign(this.state.form)
        form[id].value = value
        this.setState({ form })
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        this.props.saveCategory(Object.entries(this.state.form).reduce((data, [id, input]) => { data[id] = input.value; return data; }, {}))
    }

    render() {
        const { category, errors } = this.props

        return (
            <Box className="category-form">
                <form>
                <BoxHeader>
                    {category && category._id ? 'Edit Category' : 'New Category'}
                </BoxHeader>
                    {Object.entries(this.state.form).map(([id, input]) => (
                        <Input 
                            key={id}
                            id={id}
                            {...input}
                            error={errors[id]}
                        />
                    ))}
                    <BoxFooter>

                    <Button type="submit" onClick={this.onFormSubmit}>
                        Save
                    </Button>
                    <Button type="button" skin="light" onClick={() => this.props.history.goBack()}>
                        Cancel
                    </Button>
                    </BoxFooter>
                </form>
            </Box>
        )
    }

}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { saveCategory, resetErrors })(withRouter(CategoryForm))