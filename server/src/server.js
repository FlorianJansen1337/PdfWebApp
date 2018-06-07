const express = require('express');
const app = express();
var fs = require('fs');
var cors = require('cors');
var pdfparse = require('pdf-parse');
var fileName = './../pdf.json';
var filteredFileName = './../filteredPdfs.json';

var pdfsFile = fs.readFileSync('./../files/pdf.json');

var pdfs = JSON.parse(pdfsFile);
var counter = 0;
var filteredPdfs = pdfs;

let dataBuffer = fs.readFileSync('./../files/Infoblatt-DSGVO-RC3-Preview-(non-print).pdf');

pdfparse(dataBuffer).then(function (data) {

    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text);

});

function filter(searchTerm) {
    filteredPdfs = pdfs;
    if (searchTerm.length > 0) {
        filteredPdfs = pdfs.filter((item) => searchTermExists(item, searchTerm.toLowerCase().split(" "), 0));
    }
    return filteredPdfs
}

function searchTermExists(item, searchTerm, position) {
    if (item.details.title.toLowerCase().indexOf(searchTerm[position]) !== -1) {
        if (searchTerm.length >= position + 2) {
            return searchTermExists(item, searchTerm, position + 1);
        }
        return true;
    }
    return false;

    if (item.details.title.toLowerCase().indexOf(searchTerm[counter]) !== -1) {
        if (counter > 0) {
            for (counter; counter < searchTerm.length - 1; counter++) {
                searchTermExists(item, searchTerm[counter + 1]);
            }
            return true;
        } else {
            for (counter; counter < searchTerm.length - 1; counter++) {
                searchTermExists(item, searchTerm[counter + 1]);
            }
            return true;
        }
    }
    return false;
}
app.use(cors());
cors(origin = 'http://localhost:3000');

app.get('/pdfs/s', (req, res) => {
    console.log(req.query.searchTerm);
    res.send(filter(req.query.searchTerm));
});
app.get('/pdfs', (req, res) => res.send(pdfsFile));
app.listen(8080, () => console.log('Server listening on port 8080!'));