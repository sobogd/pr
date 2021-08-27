import phrases from 'phrases';
import React from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import General from './general';
import Images from './images';
import Labels from './labels';
import LinkAli from './linkAli';
import Prices from './prices';
import Props from './props';
import Seo from './seo';

const updateProductForm = (form, event) => {
    const { name, value, checked } = event.target;
    return {
        ...form,
        [name]: value === 'on' ? checked : value,
    };
};

const AddProductForm = ({ data, setProductForm, categories, getFromAli, editorState, onEditorStateChange }) => {
    return (
        <Form>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{phrases.fields.product.linkAli}</Accordion.Header>
                    <Accordion.Body>
                        <LinkAli
                            data={data}
                            setProductForm={setProductForm}
                            updateProductForm={updateProductForm}
                            getFromAli={getFromAli}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>{phrases.fields.product.general}</Accordion.Header>
                    <Accordion.Body>
                        <General
                            data={data}
                            setProductForm={setProductForm}
                            updateProductForm={updateProductForm}
                            categories={categories}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>{phrases.fields.product.description}</Accordion.Header>
                    <Accordion.Body>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={(editor) => onEditorStateChange(editor)}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>{phrases.fields.product.labels}</Accordion.Header>
                    <Accordion.Body>
                        <Labels data={data} setProductForm={setProductForm} updateProductForm={updateProductForm} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>{phrases.fields.product.prices}</Accordion.Header>
                    <Accordion.Body>
                        <Prices data={data} setProductForm={setProductForm} updateProductForm={updateProductForm} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                    <Accordion.Header>{phrases.fields.product.props}</Accordion.Header>
                    <Accordion.Body>
                        <Props data={data} setProductForm={setProductForm} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="7">
                    <Accordion.Header>{phrases.fields.product.images}</Accordion.Header>
                    <Accordion.Body>
                        <Images data={data} setProductForm={setProductForm} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="8">
                    <Accordion.Header>{phrases.fields.product.seo}</Accordion.Header>
                    <Accordion.Body>
                        <Seo data={data} setProductForm={setProductForm} updateProductForm={updateProductForm} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form>
    );
};

export default AddProductForm;
