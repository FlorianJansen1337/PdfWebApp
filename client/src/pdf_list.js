import React from 'react';
import PdfListItem from './pdf_list_item';
import './App.css';

const PdfList = (props) => {
    if (!props.pdfs) {
        return <div>Loading...</div>;
    }

    const pdfItems = props.pdfs.map((pdf) => {
        return (
            <PdfListItem
                onPdfSelect={props.onPdfSelect}
                key={pdf.name}
                pdf={pdf} />
        );
    });

    return (
        <ul className="col-md-4 list group">
            {pdfItems}
        </ul>
    );
};

export default PdfList;