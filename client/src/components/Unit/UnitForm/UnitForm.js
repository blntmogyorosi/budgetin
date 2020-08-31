import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Input from '../../Form/Input/Input'
import Button from '../../Form/Button/Button'
import { saveUnit } from '../../../redux/actions/unitsActions'
import { resetErrors } from '../../../redux/actions/errorsAction'
import { Box, BoxHeader, BoxFooter } from '../../Box'


class UnitForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            form: {
                name: {
                    type: 'text',
                    label: 'Name',
                    value: '',
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
        this.props.saveUnit(Object.entries(this.state.form).reduce((data, [id, input]) => { data[id] = input.value; return data; }, {}))
    }

    render() {
        const { unit, errors } = this.props

        return (
            <Box className="category-form">
                <form>
                    <BoxHeader>
                        {unit && unit._id ? 'Edit Unit' : 'New Unit'}
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
    errors: state.errors,
})

export default connect(mapStateToProps, { saveUnit, resetErrors })(withRouter(UnitForm))