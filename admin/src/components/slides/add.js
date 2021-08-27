import phrases from "phrases";
import React from "react";
import { Col, FloatingLabel, Form, Row, Image } from "react-bootstrap";
import ImageInput from "services/imageInput";

const updateSlideForm = (form, event) => {
  const { name, value, checked } = event.target;
  return {
    ...form,
    [name]: value === "on" ? checked : value,
  };
};

const AddSlideForm = ({ data, setSlideForm, list }) => {
  console.log(data);
  return (
    <Form>
      <FloatingLabel
        className="mb-3"
        controlId="name"
        label={phrases.fields.slide.name}
      >
        <Form.Control
          name="name"
          type="text"
          value={data.name}
          onChange={(event) => setSlideForm(updateSlideForm(data, event))}
        />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="description"
        label={phrases.fields.slide.description}
      >
        <Form.Control
          name="description"
          value={data.description}
          as="textarea"
          onChange={(event) => setSlideForm(updateSlideForm(data, event))}
        />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="link"
        label={phrases.fields.slide.link}
      >
        <Form.Control
          name="link"
          type="text"
          value={data.link}
          onChange={(event) => setSlideForm(updateSlideForm(data, event))}
        />
      </FloatingLabel>
      <FloatingLabel
        className="mb-3"
        controlId="sort"
        label={phrases.fields.slide.sort}
      >
        <Form.Control
          name="sort"
          type="text"
          value={data.sort}
          onChange={(event) => setSlideForm(updateSlideForm(data, event))}
        />
      </FloatingLabel>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label={phrases.fields.slide.active}
          name="active"
          checked={data.active}
          onChange={(event) => setSlideForm(updateSlideForm(data, event))}
        />
      </Form.Group>
      <Row>
        <Col xs={12}>
          <ImageInput
            value={data.image1}
            label={phrases.fields.slide.image1}
            setForm={(name, value) =>
              setSlideForm({
                ...data,
                [name]: value,
              })
            }
            name="image1"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ImageInput
            value={data.image2}
            label={phrases.fields.slide.image2}
            setForm={(name, value) =>
              setSlideForm({
                ...data,
                [name]: value,
              })
            }
            name="image2"
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AddSlideForm;
