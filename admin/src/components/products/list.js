import React from 'react';
import { Table } from 'react-bootstrap';

function ProductsList({ products, setProductForm, setEditOverlay }) {
    return (
        <Table className="mt-4" striped bordered hover>
            <tbody>
                {products.length > 0 &&
                    products.map((product, key) => (
                        <tr
                            key={key}
                            className="tr-table"
                            onClick={() => {
                                setProductForm(product);
                                setEditOverlay(true);
                            }}
                        >
                            <td>
                                <span className={product.active ? 'success' : 'danger'}></span>
                                {product.name}
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}

export default ProductsList;
