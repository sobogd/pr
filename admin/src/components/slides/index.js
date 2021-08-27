import phrases from 'phrases';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addSlide, editSlide, fetchSlides, removeSlide } from '../../actions/slides';
import AddSlideForm from './add';
import SlidesList from './list';

const initSlideForm = {
    link: '',
    name: '',
    active: true,
    image1: '',
    image2: '',
    description: '',
    sort: '100',
};

const Slides = ({ fetchSlides, addSlide, removeSlide, editSlide, loading, setLoading, list }) => {
    useEffect(() => fetchSlides(), [fetchSlides]);
    useEffect(() => setLoading(loading), [loading, setLoading]);
    const [isAddingOverlay, setAddingOverlay] = useState(false);
    const [isAEditOverlay, setEditOverlay] = useState(false);
    const [slideForm, setSlideForm] = useState(initSlideForm);
    return (
        list && (
            <>
                {/** Шапка */}
                <Row>
                    <Col md>
                        <h3>{phrases.titles.slides}</h3>
                    </Col>
                    <Col sm>
                        <Button className="float-right" variant="danger" onClick={() => setAddingOverlay(true)}>
                            {phrases.buttons.add}
                        </Button>
                    </Col>
                </Row>
                {/** Таблица категорий */}
                <SlidesList list={list} setSlideForm={setSlideForm} setEditOverlay={setEditOverlay} />
                {/** Оверлей добавления */}
                <Modal
                    show={isAddingOverlay}
                    onHide={() => {
                        setAddingOverlay(false);
                        setSlideForm(initSlideForm);
                    }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{phrases.titles.slideAdd}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddSlideForm data={slideForm} setSlideForm={setSlideForm} list={list} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setAddingOverlay(false);
                                setSlideForm(initSlideForm);
                            }}
                        >
                            {phrases.buttons.cancel}
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => {
                                setAddingOverlay(false);
                                addSlide(slideForm);
                                setSlideForm(initSlideForm);
                            }}
                        >
                            {phrases.buttons.add}
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/** Оверлей редактирования */}
                <Modal
                    show={isAEditOverlay}
                    onHide={() => {
                        setEditOverlay(false);
                        setSlideForm(initSlideForm);
                    }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{phrases.titles.slideEdit}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddSlideForm data={slideForm} setSlideForm={setSlideForm} list={list} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="danger"
                            onClick={() => {
                                setEditOverlay(false);
                                removeSlide(slideForm);
                                setSlideForm(initSlideForm);
                            }}
                        >
                            {phrases.buttons.remove}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setEditOverlay(false);
                                setSlideForm(initSlideForm);
                            }}
                        >
                            {phrases.buttons.cancel}
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => {
                                setEditOverlay(false);
                                editSlide(slideForm);
                                setSlideForm(initSlideForm);
                            }}
                        >
                            {phrases.buttons.save}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    );
};

const mapStateToProps = ({ slides }) => ({
    list: slides.slides,
    loading: slides.loading,
    error: slides.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchSlides: () => dispatch(fetchSlides()),
    addSlide: (slideForm) => dispatch(addSlide(slideForm)),
    removeSlide: (slideForm) => dispatch(removeSlide(slideForm)),
    editSlide: (slideForm) => dispatch(editSlide(slideForm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Slides);
