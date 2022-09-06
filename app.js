// @ts-check

const express = require('express');

const postRouter = require('./routes/posts');

const app = express();
const PORT = 4000;

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/posts', postRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.end(err.message);
});

app.listen(PORT, () => {
  console.log(`The express server is running at ${PORT}`);
});
