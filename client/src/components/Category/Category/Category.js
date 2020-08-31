import React from 'react'

import './Category.scss'


const Category = ({ category }) => {
    return (
        <div className="category" style={{ color: category.color }}>
            <span className="category-icon">
                <i className={category.icon}></i>
            </span>
            <div className="category-name">
                {category.name}
                (
                <span className="category-count">{category.transactionsCount}</span>
                :
                <span className="category-sum">{category.transactionsSum}</span>
                )
            </div>
            <span className="category-type">
                {category.type === 'INCOME' ?
                    <i className="fas fa-sign-in-alt"></i> :
                    <i className="fas fa-sign-out-alt"></i>
                }
            </span>
        </div>
    )
}

export default Category