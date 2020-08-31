import React from 'react'
import { NavLink } from 'react-router-dom'

import Categories from '../../../containers/Categories'
import Category from '../Category/Category'
import { Box, BoxFooter, BoxHeader } from '../../Box'


const CategoryList = ({ categories, isWidget = false }) => {
    return (
        <Box className="category-list-container">
            {isWidget &&
                <BoxHeader>
                    Categories
                </BoxHeader>
            }
            <div className="category-list">
                {categories.map(category => (
                    <Category key={category._id} category={category} />
                ))}
            </div>
            {isWidget &&
                <BoxFooter>
                    <NavLink to={Categories.routeName}>See all</NavLink>
                </BoxFooter>
            }
        </Box>
    )
}

export default CategoryList