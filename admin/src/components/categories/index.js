import phrases from 'phrases';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import translit from 'services/translit';
import { addCategory, editCategory, fetchCategories, removeCategory } from '../../actions/categories';
import AddCategoryForm from './add';
import CategoriesList from './list';

const initCategoryForm = {
    link: '',
    name: '',
    active: true,
    image: '',
    description: '',
    parent: '0',
    sort: '500',
};

const Categories = ({ fetchCategories, addCategory, removeCategory, editCategory, loading, setLoading, list }) => {
    useEffect(() => fetchCategories(), [fetchCategories]);
    useEffect(() => setLoading(loading), [loading, setLoading]);
    const [isAddingOverlay, setAddingOverlay] = useState(false);
    const [isAEditOverlay, setEditOverlay] = useState(false);
    const [categoryForm, setCategoryForm] = useState(initCategoryForm);
    useEffect(() => {
        setCategoryForm({ ...categoryForm, link: translit(categoryForm.name) });
    }, [categoryForm.name]);
    return (
        list && (
            <>
                {/** Шапка */}
                <Row>
                    <Col md>
                        <h3>{phrases.titles.categories}</h3>
                    </Col>
                    <Col sm>
                        <Button className="float-right" variant="danger" onClick={() => setAddingOverlay(true)}>
                            {phrases.buttons.add}
                        </Button>
                    </Col>
                </Row>
                {/** Таблица категорий */}
                <CategoriesList list={list} setCategoryForm={setCategoryForm} setEditOverlay={setEditOverlay} />
                {/** Оверлей добавления */}
                <Modal
                    show={isAddingOverlay}
                    onHide={() => {
                        setAddingOverlay(false);
                        setCategoryForm(initCategoryForm);
                    }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{phrases.titles.add}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddCategoryForm data={categoryForm} setCategoryForm={setCategoryForm} list={list} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setAddingOverlay(false);
                                setCategoryForm(initCategoryForm);
                            }}
                        >
                            {phrases.buttons.cancel}
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => {
                                setAddingOverlay(false);
                                addCategory(categoryForm);
                                setCategoryForm(initCategoryForm);
                            }}
                        >
                            {phrases.buttons.add}
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/** Оверлей редактирования */}
                <Modal
                    show={isAEditOverlay}
                    onHide={() => {
                        setEditOverlay(false);
                        setCategoryForm(initCategoryForm);
                    }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{phrases.titles.edit}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddCategoryForm data={categoryForm} setCategoryForm={setCategoryForm} list={list} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={() => {
                                setEditOverlay(false);
                                removeCategory(categoryForm);
                                setCategoryForm(initCategoryForm);
                            }}
                        >
                            {phrases.buttons.remove}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setEditOverlay(false);
                                setCategoryForm(initCategoryForm);
                            }}
                        >
                            {phrases.buttons.cancel}
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => {
                                setEditOverlay(false);
                                editCategory(categoryForm);
                                setCategoryForm(initCategoryForm);
                            }}
                        >
                            {phrases.buttons.save}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    );
};

const mapStateToProps = ({ categories }) => ({
    list: categories.categories,
    loading: categories.loading,
    error: categories.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
    addCategory: (categoryForm) => dispatch(addCategory(categoryForm)),
    removeCategory: (categoryForm) => dispatch(removeCategory(categoryForm)),
    editCategory: (categoryForm) => dispatch(editCategory(categoryForm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
