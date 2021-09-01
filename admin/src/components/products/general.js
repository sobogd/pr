import phrases from "phrases";
import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

function General({ data, setProductForm, updateProductForm, categories }) {
  return (
    <>
      <FloatingLabel
        className="mb-3"
        controlId="name"
        label={phrases.fields.product.name}
      >
        <Form.Control
          name="name"
          type="text"
          value={data.name}
          onChange={(event) => setProductForm(updateProductForm(data, event))}
        />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="link"
        label={phrases.fields.product.link}
      >
        <Form.Control
          name="link"
          type="text"
          value={data.link}
          onChange={(event) => setProductForm(updateProductForm(data, event))}
        />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="sort"
        label={phrases.fields.product.sort}
      >
        <Form.Control
          name="sort"
          type="text"
          value={data.sort}
          onChange={(event) => setProductForm(updateProductForm(data, event))}
        />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="parent"
        label="Родительская категория"
      >
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
      <Form.Check
        type="checkbox"
        label={phrases.fields.product.top}
        name="top"
        checked={data.top}
        onChange={(event) => setProductForm(updateProductForm(data, event))}
      />
    </>
  );
}

export default General;
