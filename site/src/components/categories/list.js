import React from 'react';
import { Table } from 'react-bootstrap';

function CategoriesList({ list, setCategoryForm, setEditOverlay }) {
    return (
        <Table className="mt-4" striped bordered hover>
            <tbody>
                {list.map((category, key) => (
                    <tr
                        key={key}
                        className="tr-table"
                        onClick={() => {
                            setCategoryForm(category);
                            setEditOverlay(true);
                        }}
                    >
                        <td>
                            <span className={category.active ? 'success' : 'danger'}></span>
                            {category.name}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default CategoriesList;
