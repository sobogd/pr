import React from 'react';
import { Table } from 'react-bootstrap';

function SlidesList({ list, setSlideForm, setEditOverlay }) {
    return (
        <Table className="mt-4" striped bordered hover>
            <tbody>
                {list.map((slide, key) => (
                    <tr
                        key={key}
                        className="tr-table"
                        onClick={() => {
                            setSlideForm(slide);
                            setEditOverlay(true);
                        }}
                    >
                        <td>
                            <span className={slide.active ? 'success' : 'danger'}></span>
                            {slide.name}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default SlidesList;
