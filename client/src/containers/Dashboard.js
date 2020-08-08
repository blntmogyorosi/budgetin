import React from 'react'
import Layout from '../hoc/Layout/Layout'
import Title from '../components/Title/Title'


class Dashboard extends React.Component {

    static routeName = '/dashboard'

    render() {
        return (
            <Layout>
                <Title component="h2">Dashboard</Title>
            </Layout>
        )
    }

}

export default Dashboard