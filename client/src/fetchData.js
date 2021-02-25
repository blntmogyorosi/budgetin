import { fetchCategories } from './redux/actions/categoriesActions'
import { fetchUnits } from './redux/actions/unitsActions'
import { fetchProducts } from './redux/actions/productsActions'
import { fetchTransactions } from './redux/actions/transactionsActions'

import store from './redux'


export const fetchData = () => {
    return Promise
        .all(
            [
                store.dispatch(fetchCategories()),
                store.dispatch(fetchUnits()),
                store.dispatch(fetchProducts()),
                store.dispatch(fetchTransactions()),
            ]
        )
        .then(results => Promise.resolve())
}