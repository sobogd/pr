import phrases from 'phrases';
import React from 'react';
import { Col, FloatingLabel, Form, Row, Image } from 'react-bootstrap';

const updateCategoryForm = (form, event) => {
    const { name, value, checked } = event.target;
    return {
        ...form,
        [name]: value === 'on' ? checked : value,
    };
};

const AddCategoryForm = ({ data, setCategoryForm, list }) => {
    return (
        <Form>
            <FloatingLabel className="mb-3" controlId="name" label={phrases.fields.category.name}>
                <Form.Control
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={(event) => setCategoryForm(updateCategoryForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="link" label={phrases.fields.category.link}>
                <Form.Control
                    name="link"
                    type="text"
                    value={data.link}
                    onChange={(event) => setCategoryForm(updateCategoryForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="sort" label={phrases.fields.category.sort}>
                <Form.Control
                    name="sort"
                    type="text"
                    value={data.sort}
                    onChange={(event) => setCategoryForm(updateCategoryForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="parent" label="Родительская категория">
                <Form.Select
                    name="parent"
                    aria-label={phrases.fields.category.parent}
                    value={data.parent}
                    onChange={(event) => setCategoryForm(updateCategoryForm(data, event))}
                >
                    <option value="0">{phrases.common.parentCategory}</option>
                    {list.map((category, key) => (
                        <option key={key} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="description" label={phrases.fields.category.description}>
                <Form.Control
                    name="description"
                    value={data.description}
                    as="textarea"
                    onChange={(event) => setCategoryForm(updateCategoryForm(data, event))}
                />
            </FloatingLabel>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    label={phrases.fields.category.active}
                    name="active"
                    checked={data.active}
                    onChange={(event) => setCategoryForm(updateCategoryForm(data, event))}
                />
            </Form.Group>
            <Row>
                <Col xs={12}>
                    <FloatingLabel
                        className="mb-3 float-left"
                        controlId="image"
                        label={phrases.fields.category.image}
                        style={{ width: 'calc(100% - 80px)' }}
                    >
                        <Form.Control
                            name="image"
                            type="text"
                            value={data.image}
                            onChange={(event) => setCategoryForm(updateCategoryForm(data, event))}
                        />
                    </FloatingLabel>
                    <Image className="float-right" src={data.image} width="58" height="58" rounded />
                </Col>
            </Row>
        </Form>
    );
};

export default AddCategoryForm;
