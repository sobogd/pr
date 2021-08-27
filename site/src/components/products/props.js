import phrases from 'phrases';
import React from 'react';
import { Button, CloseButton, Col, FloatingLabel, Form, Row } from 'react-bootstrap';

function Props({ data, setProductForm }) {
    return (
        <>
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
        </>
    );
}

export default Props;
