import React from 'react';
import './App.css';

const PdfDetail = ({ pdf, term }) => {
    if (term) {
        if (!pdf) {
            return <div>No files found. ¯\_(ツ)_/¯</div>
        }
    } else if (!pdf) {
        return <div>Loading...</div>
    }

    const url = `http://localhost:8888/${pdf.name}`;

    return (
        <div className='pdf-detail col-md-8'>
            <div className='embed-resposive'>
                <div className='container'>
                    <iframe className='pdf' src={url} title="title"></iframe>
                </div>
            </div>
            <div className='details'>
                <div>{pdf.details.title}</div>
                <div>{pdf.details.description}</div>
            </div>
        </div>
    );
};

export default PdfDetail;