import phrases from "phrases";
import React from "react";
import {
  Button,
  CloseButton,
  Col,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import ImageInput from "services/imageInput";

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
              <ImageInput
                value={image.src}
                label={phrases.fields.product.imageSrc}
                setForm={(name, value) => {
                  setProductForm({
                    ...data,
                    images: data.images.map((imageEdit, numberEdit) => {
                      return numberEdit === number
                        ? {
                            src: value,
                            sort: imageEdit.sort,
                          }
                        : imageEdit;
                    }),
                  });
                }}
                name="image"
              />
            </Col>
            <Col xs={1}>
              <CloseButton
                onClick={() => {
                  setProductForm({
                    ...data,
                    images: data.images.filter(
                      (_, numberRemove) => numberRemove !== number
                    ),
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
                images: [...data.images, { src: "", sort: 500 }],
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
