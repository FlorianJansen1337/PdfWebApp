import React from 'react';
import './App.css';

const PdfListItem = ({ pdf, onPdfSelect }) => {

    const imageUrl = `http://localhost:8888/${pdf.jpg}`;

    return (
        <li onClick={() => onPdfSelect(pdf)} className='list-group-item'>
            <div className='pdf-list media'>
                <div className='media-left'>
                    <img className='media-object' src={imageUrl} alt="" />
                </div>
                <div className='media-body'>
                    <div className='media-heading'>{pdf.details.title}</div>
                </div>
            </div>
        </li>
    );
};

export default PdfListItem;