import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search_bar';
import PdfList from './pdf_list';
import PdfDetail from './pdf_detail';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pdfs: [],
            filteredPdfs: [],
            searchTerm: "",
            selectedPdf: null,
        };
        this.pdfSearch();
    }

    pdfSearch() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "http://localhost:8080/pdfs");
        xmlhttp.send();
        xmlhttp.onload = () => {
            var pdfs = JSON.parse(xmlhttp.responseText);
            this.setState({
                pdfs: pdfs,
                filteredPdfs: pdfs,
                selectedPdf: pdfs[0]
            });
        };
    }

    updateList(searchTerm) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", `http://localhost:8080/pdfs/s?searchTerm=${searchTerm}`);
        xmlhttp.send();
        xmlhttp.onload = () => {
            if (this.state.filteredPdfs) {
                this.setState({ filteredPdfs: JSON.parse(xmlhttp.responseText) });
                if (this.state.filteredPdfs[0]) {
                    this.setState({
                        selectedPdf: this.state.filteredPdfs[0],
                        searchTerm: searchTerm
                    });
                }
                if (!this.state.filteredPdfs[0]) {
                    this.setState({ selectedPdf: null });
                }
            }
        }
    }

    render() {
        return (
            window.scroll(0, 0),
            <div>
                <SearchBar onSearchTermChange={this.updateList.bind(this)} />
                <PdfDetail
                    pdf={this.state.selectedPdf}
                    term={this.state.searchTerm} />
                <PdfList
                    onPdfSelect={selectedPdf => this.setState({ selectedPdf })}
                    pdfs={this.state.filteredPdfs} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));