import { fetchCategories } from 'actions/categories';
import phrases from 'phrases';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addProduct, editProduct, fetchProducts, getFromAli, removeProduct } from 'actions/products';
import AddProductForm from './add';
import ProductsList from './list';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import translit from '../../services/translit';

const initProductForm = {
    name: '',
    link: '',
    sort: 500,
    category: '',
    description: '',
    green: '',
    yellow: '',
    linkAli: '',
    images: [],
    props: [],
    stars: 5,
    price: 0,
    discount: 0,
    available: 2,
    addPercent: 100,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
};

const Products = ({
    fetchProducts,
    fetchCategories,
    addProduct,
    removeProduct,
    editProduct,
    loading,
    setLoading,
    products,
    categories,
    getFromAli,
    dataFromAli,
}) => {
    // стейты
    const [isAddingOverlay, setAddingOverlay] = useState(false);
    const [isAEditOverlay, setEditOverlay] = useState(false);
    const [productForm, setProductForm] = useState(initProductForm);
    const [editor, setEditor] = useState(EditorState.createEmpty());
    // при загрузке продукта
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);
    // при обновлении
    useEffect(() => setLoading(loading), [loading]);
    // при загрузке чего либо с алика
    useEffect(() => {
        setProductForm({ ...productForm, ...dataFromAli });
        if (dataFromAli && dataFromAli.description) {
            const descFromAli = htmlToDraft(dataFromAli.description);
            if (descFromAli) {
                const contentState = ContentState.createFromBlockArray(descFromAli.contentBlocks);
                setEditor(EditorState.createWithContent(contentState));
            }
        }
    }, [dataFromAli]);
    // при изменении в контент редакторе
    useEffect(() => {
        setProductForm({ ...productForm, description: draftToHtml(convertToRaw(editor.getCurrentContent())) });
    }, [editor]);
    useEffect(() => {
        setProductForm({ ...productForm, link: translit(productForm.name) });
    }, [productForm.name]);

    return (
        products && (
            <>
                {/** Шапка */}
                <Row>
                    <Col md>
                        <h3>{phrases.titles.products}</h3>
                    </Col>
                    <Col sm>
                        <Button className="float-right" variant="danger" onClick={() => setAddingOverlay(true)}>
                            {phrases.buttons.add}
                        </Button>
                    </Col>
                </Row>
                {/** Таблица категорий */}
                <ProductsList products={products} setProductForm={setProductForm} setEditOverlay={setEditOverlay} />
                {/** Оверлей добавления */}
                <Modal
                    size="lg"
                    show={isAddingOverlay && !loading}
                    onHide={() => {
                        setAddingOverlay(false);
                        setProductForm(initProductForm);
                    }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3 className="mb-0">{phrases.titles.productAdd}</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddProductForm
                            data={productForm}
                            setProductForm={setProductForm}
                            categories={categories}
                            getFromAli={getFromAli}
                            editorState={editor}
                            onEditorStateChange={setEditor}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setAddingOverlay(false);
                                setProductForm(initProductForm);
                            }}
                        >
                            {phrases.buttons.cancel}
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => {
                                setAddingOverlay(false);
                                addProduct(productForm);
                                setProductForm(initProductForm);
                            }}
                        >
                            {phrases.buttons.add}
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/** Оверлей редактирования */}
                <Modal
                    size="lg"
                    show={isAEditOverlay && !loading}
                    onHide={() => {
                        setEditOverlay(false);
                        setProductForm(initProductForm);
                    }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h3 className="mb-0">{phrases.titles.productEdit}</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddProductForm
                            data={productForm}
                            setProductForm={setProductForm}
                            categories={categories}
                            getFromAli={getFromAli}
                            editorState={editor}
                            onEditorStateChange={setEditor}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={() => {
                                setEditOverlay(false);
                                removeProduct(productForm);
                                setProductForm(initProductForm);
                            }}
                        >
                            {phrases.buttons.remove}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setEditOverlay(false);
                                setProductForm(initProductForm);
                            }}
                        >
                            {phrases.buttons.cancel}
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => {
                                setEditOverlay(false);
                                editProduct(productForm);
                                setProductForm(initProductForm);
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

const mapStateToProps = ({ products, categories }) => ({
    categories: categories.categories,
    products: products.products,
    loading: products.loading,
    error: products.error,
    dataFromAli: products.dataFromAli,
});

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    addProduct: (categoryForm) => dispatch(addProduct(categoryForm)),
    removeProduct: (categoryForm) => dispatch(removeProduct(categoryForm)),
    editProduct: (categoryForm) => dispatch(editProduct(categoryForm)),
    getFromAli: (linkAli) => dispatch(getFromAli(linkAli)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
