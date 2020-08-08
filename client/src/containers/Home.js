import React from 'react'

import Layout from '../hoc/Layout/Layout'
import Title from '../components/Title/Title'


class Home extends React.Component {

    static routeName = '/'

    render() {
        return (
            <Layout>
                <Title component="h2">Home</Title>
            </Layout>
        )
    }

}

export default Home