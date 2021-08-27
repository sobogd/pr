import phrases from 'phrases';
import React from 'react';
import { Button, CloseButton, Col, FloatingLabel, Form, Row, Image } from 'react-bootstrap';

function Images({ data, setProductForm }) {
    return (
        <>
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
        </>
    );
}

export default Images;
