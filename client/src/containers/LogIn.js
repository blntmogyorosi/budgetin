import React from 'react'
import { connect } from 'react-redux'

import Layout from '../hoc/Layout/Layout'
import Title from '../components/Title/Title'
import Input from '../components/Form/Input/Input'
import Button from '../components/Form/Button/Button'
import { loginUser } from '../redux/actions/authActions'
import { resetErrors } from '../redux/actions/errorsAction'
import { resetMessages } from '../redux/actions/messagesActions'


class LogIn extends React.Component {

    static routeName = '/login'

    constructor(props) {
        super(props)
        this.state = {
            form: {
                email: {
                    type: 'text',
                    label: 'Email',
                    value: '',
                    onChange: this.onInputChange,
                    autoComplete: 'email'
                },
                password: {
                    type: 'password',
                    label: 'Password',
                    value: '',
                    onChange: this.onInputChange,
                    autoComplete: 'password'
                },
            }
        }
    }

    componentWillUnmount() {
        this.props.resetErrors()
        this.props.resetMessages()
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
        const data = {}
        Object.entries(this.state.form).forEach(([id, input]) => data[id] = input.value)
        this.props.loginUser(data)
    }

    render() {
        const { errors } = this.props

        return (
            <Layout>
                <Title component="h2">Log In</Title>
                <form>
                    {Object.entries(this.state.form).map(([id, input]) => (
                        <Input
                            key={id}
                            id={id}
                            {...input}
                            error={errors[id]}
                        />
                    ))}
                    <Button type="submit" onClick={this.onFormSubmit}>
                        Log In
                    </Button>
                </form>
            </Layout>
        )
    }

}

const mapStateToProps = state => ({
    errors: state.errors,
})

export default connect(mapStateToProps, { loginUser, resetErrors, resetMessages })(LogIn)