var  express  =  require('express')
var  serveStatic  =  require('serve-static')
var  app  =  express()
var cors = require('cors');

app.use(cors());
cors(origin = 'http://localhost:3000');

app.use(serveStatic('./../files', {  'index':  ['default.html',  'default.htm'] }))

app.listen(8888, console.log('File Server listening on port 8888!'))