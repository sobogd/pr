import phrases from 'phrases';
import React from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';

function LinkAli({ data, setProductForm, updateProductForm, getFromAli }) {
    return (
        <>
            <FloatingLabel className="mb-2" controlId="linkAli" label={phrases.fields.product.linkAli}>
                <Form.Control
                    name="linkAli"
                    type="text"
                    value={data.linkAli}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <Row>
                <Col xs={12}>
                    <Button
                        className="float-right mb-3"
                        variant="warning"
                        onClick={() => {
                            getFromAli(data.linkAli);
                        }}
                    >
                        {phrases.fields.product.getFromAli}
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default LinkAli;
