import React, { useState } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles.css';
import Categories from 'components/categories';
import Products from 'components/products';
import Slides from 'components/slides';

function App() {
    const [loading, setLoading] = useState(false);
    return (
        <>
            {/* <Router history={history}> */}
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>Bo-shalya corporation</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/categories" className="nav-link">
                                Категории
                            </Link>
                            <Link to="/products" className="nav-link">
                                Товары
                            </Link>
                            <Link to="/slides" className="nav-link">
                                Слайды
                            </Link>
                            <Link to="/setting" className="nav-link">
                                Настройки
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="container">
                <Switch>
                    <Route path="/categories">
                        <Categories setLoading={setLoading} />
                    </Route>
                    <Route path="/products">
                        <Products setLoading={setLoading} />
                    </Route>
                    <Route path="/slides">
                        <Slides setLoading={setLoading} />
                    </Route>
                </Switch>
            </Container>
            {loading && (
                <div className="spinner">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            )}
        </>
    );
}

export default withRouter(App);
