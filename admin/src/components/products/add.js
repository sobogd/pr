import phrases from 'phrases';
import React from 'react';
import { Button, CloseButton, Col, FloatingLabel, Form, Image, Row } from 'react-bootstrap';

const updateProductForm = (form, event) => {
    const { name, value, checked } = event.target;
    return {
        ...form,
        [name]: value === 'on' ? checked : value,
    };
};

const AddProductForm = ({ data, setProductForm, categories }) => {
    return (
        <Form>
            <h4 className="mb-3">{phrases.fields.product.general}</h4>
            <FloatingLabel className="mb-3" controlId="name" label={phrases.fields.product.name}>
                <Form.Control
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="link" label={phrases.fields.product.link}>
                <Form.Control
                    name="link"
                    type="text"
                    value={data.link}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="sort" label={phrases.fields.product.sort}>
                <Form.Control
                    name="sort"
                    type="text"
                    value={data.sort}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="parent" label="Родительская категория">
                <Form.Select
                    name="parent"
                    aria-label={phrases.fields.product.parent}
                    value={data.parent}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                >
                    <option value="0">{phrases.common.parentCategory}</option>
                    {categories.length > 0 &&
                        categories.map((category, key) => (
                            <option key={key} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="description" label={phrases.fields.product.description}>
                <Form.Control
                    name="description"
                    value={data.description}
                    as="textarea"
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <h4 className="mt-4 mb-3">{phrases.fields.product.labels}</h4>
            <FloatingLabel className="mb-3" controlId="stars" label={phrases.fields.product.stars}>
                <Form.Control
                    name="stars"
                    type="text"
                    value={data.stars}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="green" label={phrases.fields.product.green}>
                <Form.Control
                    name="green"
                    type="text"
                    value={data.green}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="yellow" label={phrases.fields.product.yellow}>
                <Form.Control
                    name="yellow"
                    type="text"
                    value={data.yellow}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <h4 className="mt-4 mb-3">{phrases.fields.product.prices}</h4>
            <FloatingLabel className="mb-3" controlId="price" label={phrases.fields.product.price}>
                <Form.Control
                    name="price"
                    type="text"
                    value={data.price}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="addPercent" label={phrases.fields.product.addPercent}>
                <Form.Control
                    name="addPercent"
                    type="text"
                    value={data.addPercent}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="discount" label={phrases.fields.product.discount}>
                <Form.Control
                    name="discount"
                    type="text"
                    value={data.discount}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="available" label={phrases.fields.product.available}>
                <Form.Select
                    name="available"
                    aria-label={phrases.fields.product.available}
                    value={data.available}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                >
                    {phrases.available.length > 0 &&
                        phrases.available.map((text, number) => (
                            <option key={number} value={number}>
                                {text}
                            </option>
                        ))}
                </Form.Select>
            </FloatingLabel>
            <h4 className="mt-4 mb-3">{phrases.fields.product.props}</h4>
            {data.props.length > 0 &&
                data.props.map((prop, number) => (
                    <Row key={number}>
                        <Col xs={2}>
                            <FloatingLabel
                                className="mb-3"
                                controlId="addPercent"
                                label={phrases.fields.product.propSort}
                            >
                                <Form.Control
                                    name="addPercent"
                                    type="text"
                                    value={prop.sort}
                                    onChange={(event) => {
                                        setProductForm({
                                            ...data,
                                            props: data.props.map((editProp, numberEdit) => {
                                                return numberEdit === number
                                                    ? {
                                                          sort: event.target.value,
                                                          name: editProp.name,
                                                          value: editProp.value,
                                                      }
                                                    : editProp;
                                            }),
                                        });
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={3}>
                            <FloatingLabel
                                className="mb-3"
                                controlId="addPercent"
                                label={phrases.fields.product.propName}
                            >
                                <Form.Control
                                    name="addPercent"
                                    type="text"
                                    value={prop.name}
                                    onChange={(event) => {
                                        setProductForm({
                                            ...data,
                                            props: data.props.map((editProp, numberEdit) => {
                                                return numberEdit === number
                                                    ? {
                                                          sort: editProp.sort,
                                                          name: event.target.value,
                                                          value: editProp.value,
                                                      }
                                                    : editProp;
                                            }),
                                        });
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6}>
                            <FloatingLabel
                                className="mb-3"
                                controlId="addPercent"
                                label={phrases.fields.product.propValue}
                            >
                                <Form.Control
                                    name="addPercent"
                                    type="text"
                                    value={prop.value}
                                    onChange={(event) => {
                                        setProductForm({
                                            ...data,
                                            props: data.props.map((editProp, numberEdit) => {
                                                return numberEdit === number
                                                    ? {
                                                          sort: editProp.sort,
                                                          name: editProp.name,
                                                          value: event.target.value,
                                                      }
                                                    : editProp;
                                            }),
                                        });
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                            <CloseButton
                                onClick={() => {
                                    setProductForm({
                                        ...data,
                                        props: data.props.filter((_, numberRemove) => numberRemove !== number),
                                    });
                                }}
                                className="mt-3"
                            />
                        </Col>
                    </Row>
                ))}
            <Row>
                <Col xs={3}>
                    <Button
                        className="float-left"
                        variant="success"
                        onClick={() => {
                            setProductForm({
                                ...data,
                                props: [...data.props, { name: '', value: '', sort: 500 }],
                            });
                        }}
                    >
                        {phrases.buttons.add}
                    </Button>
                </Col>
            </Row>
            <h4 className="mt-4 mb-3">{phrases.fields.product.images}</h4>
            {data.images.length > 0 &&
                data.images.map((image, number) => (
                    <Row key={number}>
                        <Col xs={3}>
                            <FloatingLabel
                                className="mb-3"
                                controlId="addPercent"
                                label={phrases.fields.product.imageSort}
                            >
                                <Form.Control
                                    name="addPercent"
                                    type="text"
                                    value={image.sort}
                                    onChange={(event) => {
                                        setProductForm({
                                            ...data,
                                            images: data.images.map((imageEdit, numberEdit) => {
                                                return numberEdit === number
                                                    ? {
                                                          src: imageEdit.src,
                                                          sort: event.target.value,
                                                      }
                                                    : imageEdit;
                                            }),
                                        });
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={8}>
                            <FloatingLabel
                                className="mb-3 float-left"
                                controlId="addPercent"
                                label={phrases.fields.product.imageSrc}
                                style={{ width: 'calc(100% - 80px)' }}
                            >
                                <Form.Control
                                    name="addPercent"
                                    type="text"
                                    value={image.src}
                                    onChange={(event) => {
                                        setProductForm({
                                            ...data,
                                            images: data.images.map((imageEdit, numberEdit) => {
                                                return numberEdit === number
                                                    ? {
                                                          src: event.target.value,
                                                          sort: imageEdit.sort,
                                                      }
                                                    : imageEdit;
                                            }),
                                        });
                                    }}
                                />
                            </FloatingLabel>
                            <Image className="float-right" src={image.src} width="58" height="58" rounded />
                        </Col>
                        <Col xs={1}>
                            <CloseButton
                                onClick={() => {
                                    setProductForm({
                                        ...data,
                                        images: data.images.filter((_, numberRemove) => numberRemove !== number),
                                    });
                                }}
                                className="mt-3"
                            />
                        </Col>
                    </Row>
                ))}
            <Row>
                <Col xs={3}>
                    <Button
                        className="float-left"
                        variant="success"
                        onClick={() => {
                            setProductForm({
                                ...data,
                                images: [...data.images, { src: '', sort: 500 }],
                            });
                        }}
                    >
                        {phrases.buttons.add}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AddProductForm;
