import React from 'react'
import { connect } from 'react-redux'

import LogIn from './LogIn'
import Layout from '../hoc/Layout/Layout'
import { SmallContainer } from '../hoc/Container'
import { Box, BoxHeader, BoxFooter } from '../components/Box'
import Input from '../components/Form/Input/Input'
import Button from '../components/Form/Button/Button'
import { registerUser } from '../redux/actions/authActions'
import { resetErrors } from '../redux/actions/errorsAction'
import { resetMessages } from '../redux/actions/messagesActions'


class Register extends React.Component {

    static routeName = '/register'

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
                password2: {
                    type: 'password',
                    label: 'Password Again',
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
        this.props.registerUser(data, () => this.props.history.push(LogIn.routeName))
    }

    render() {
        const { errors } = this.props

        return (
            <Layout>
                <SmallContainer>
                    <Box>
                        <form>
                            <BoxHeader>
                                Register
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
                                    Register
                            </Button>
                            </BoxFooter>
                        </form>
                    </Box>
                </SmallContainer>
            </Layout>
        )
    }

}

const mapStateToProps = state => ({
    errors: state.errors,
})

export default connect(mapStateToProps, { registerUser, resetErrors, resetMessages })(Register)