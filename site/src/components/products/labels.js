import phrases from 'phrases';
import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

function Labels({ data, setProductForm, updateProductForm }) {
    return (
        <>
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
        </>
    );
}

export default Labels;
