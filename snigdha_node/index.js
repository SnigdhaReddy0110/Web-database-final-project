const http = require('http');
const fs = require('fs/promises');
const { MongoClient } = require('mongodb');

const mongodbUrl =  'mongodb+srv://snigdha:snigdha@students.ltjb0aq.mongodb.net/test';
const mongoDbName =  'students';
const mongoDbCollectionName =  'student_details';

const client = new MongoClient(mongodbUrl);

const contentType = {
  '.jpg': 'image/jpg',
  '.css': 'text/css',
  '.js': 'text/js',
  '.html': 'text/html',
  '.json': 'application/json',
};

const handleStaticFiles = async (req, res) => {
  try {
    const filePath = `./public${req.url}`;
    const ext = filePath.substr(filePath.lastIndexOf('.'));
    console.log(filePath)
    const data = await fs.readFile(filePath)
    res.writeHead(200, { 'Content-Type': contentType[ext] });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

const handleApi = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(mongoDbName);
    const collection = db.collection(mongoDbCollectionName);

    if (req.method === 'GET') {
      const data = await collection.find({}).toArray();
      const jsonData = JSON.stringify(data, null, 2);
      await fs.writeFile('./public/db.json', jsonData, 'utf8');
      res.writeHead(200, {
        'Content-Type': contentType['.json'],
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      });
      res.end(jsonData);
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  } finally {
    await client.close();
  }
};

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    (async (req, res) => {
        try {
          const filePath = './public/index.html';
          const data = await fs.readFile(filePath, 'utf8');
          res.writeHead(200, { 'Content-Type': contentType['.html'] });
          res.end(data);
        } catch (err) {
          console.error(err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      }
    ) (req, res) ;
  } else if (req.url === '/api') {
    await handleApi(req, res);
  } else if (Object.keys(contentType).includes(req.url.substr(req.url.lastIndexOf('.')))) {
    await handleStaticFiles(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Node.js Server started on port ${PORT}`);
});
