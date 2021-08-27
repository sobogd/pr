import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'styles.css';
import Header from 'components/header/header';
import HomePage from 'components/home/homepage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchSlides } from 'actions/slides';
import { fetchCategories } from 'actions/categories';

function App({ slides, fetchSlides, fetchCategories }) {
    useEffect(() => fetchCategories(0), []);
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="site">
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <Switch>
                <Route exact path="/">
                    <HomePage slides={slides} fetchSlides={fetchSlides} />
                </Route>
                <Route exact path="/categories/">
                    Все категории
                </Route>
                <Route exact path="/categories/:link">
                    Страница категории
                </Route>
                <Route exact path="/products/">
                    Все товары
                </Route>
                <Route exact path="/products/:link/">
                    Страница товара
                </Route>
            </Switch>
        </div>
    );
}

const mapStateToProps = ({ slides, categories }) => ({
    slides: slides,
    categories: categories,
    loading: slides.loading && categories.loading,
});

const mapDispatchToProps = (dispatch) => ({
    fetchSlides: () => dispatch(fetchSlides()),
    fetchCategories: (parent) => dispatch(fetchCategories(parent)),
});

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
