import React from "react";
import { Table, Image } from "react-bootstrap";

function ProductsList({ products, setProductForm, setEditOverlay }) {
  return (
    <Table className="mt-4" striped bordered hover>
      <thead>
        <th></th>
        <th>Название</th>
        <th>Цена</th>
        <th>Остаток</th>
      </thead>
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
                {product.images && product.images[0] && (
                  <Image
                    src={product.images[0].src}
                    width="50"
                    height="50"
                    rounded
                  />
                )}
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.available}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default ProductsList;
