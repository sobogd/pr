import phrases from 'phrases';
import React from 'react';
import { FloatingLabel, Form, Row } from 'react-bootstrap';

const getPriceOnSite = (optPrice, addPercent, discount) => {
    const roznPrice = Number(optPrice) + (Number(optPrice) * Number(addPercent)) / 100;
    const priceWithDiscount = roznPrice - roznPrice * (Number(discount) / 100);
    return Number(discount) !== 0 ? priceWithDiscount : roznPrice;
};

function Prices({ data, setProductForm, updateProductForm }) {
    return (
        <>
            <FloatingLabel className="mb-2" controlId="price" label={phrases.fields.product.price}>
                <Form.Control
                    name="price"
                    type="text"
                    value={data.price}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
            <Row>
                <Form.Text className="text-muted mb-3">
                    {phrases.fields.product.priceOnSite}
                    {getPriceOnSite(data.price, data.addPercent, data.discount)} $
                </Form.Text>
            </Row>

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
                <Form.Control
                    name="available"
                    type="text"
                    value={data.available}
                    onChange={(event) => setProductForm(updateProductForm(data, event))}
                />
            </FloatingLabel>
        </>
    );
}

export default Prices;
