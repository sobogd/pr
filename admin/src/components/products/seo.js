import phrases from 'phrases';
import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

function Seo({ data, setProductForm, updateProductForm }) {
    return (
        <>
            <FloatingLabel className="mb-3" controlId="seoTitle" label={phrases.fields.product.seoTitle}>
                <Form.Control
                    name="seoTitle"
                    type="text"
                    value={data.seoTitle}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="seoDescription" label={phrases.fields.product.seoDescription}>
                <Form.Control
                    name="seoDescription"
                    type="text"
                    value={data.seoDescription}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="seoKeywords" label={phrases.fields.product.seoKeywords}>
                <Form.Control
                    name="seoKeywords"
                    type="text"
                    value={data.seoKeywords}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
        </>
    );
}

export default Seo;
