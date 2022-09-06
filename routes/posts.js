// @ts-check

const express = require('express');

const router = express.Router();

const POST = [
  {
    title: 'muyaho',
    content: '무야호~',
  },
  {
    title: 'whyworld',
    content: '테츠형 세상이 왜 이래~',
  },
];

const postLen = POST.length;

router.get('/', (req, res) => {
  if (POST) {
    res.render('index', { POST, postCounts: postLen });
  } else {
    const err = new Error('조회할 포스트가 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/:title', (req, res) => {
  const postData = POST.find((post) => post.title === req.params.title);

  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('해당 제목을 가진 포스트가 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (req.query.title && req.query.content) {
    const newPost = {
      title: req.query.title,
      content: req.query.content,
    };
    POST.push(newPost);
    res.send('포스트 등록 완료!');
  } else {
    const err = new Error('모든 입력 값을 입력해주세요.');
    err.statusCode = 400;
    throw err;
  }
});

router.put('/:title', (req, res) => {
  if (req.params.title && req.query.title && req.query.content) {
    const postData = POST.find((post) => post.title === req.params.title);
    if (postData) {
      const postIdx = POST.findIndex((post) => post.title === req.params.title);
      const modifyPost = {
        title: req.query.title,
        content: req.query.content,
      };
      POST[postIdx] = modifyPost;
      res.send('포스트 수정 완료');
    } else {
      const err = new Error('해당 포스트를 찾을 수 없습니다.');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('모든 입력 값을 입력해주세요.');
    err.statusCode = 400;
    throw err;
  }
});

router.delete('/:title', (req, res) => {
  const postIdx = POST.findIndex((post) => post.title === req.params.title);
  if (postIdx !== -1) {
    POST.splice(postIdx, 1);
    res.send('포스트 삭제 완료');
  } else {
    const err = new Error('해당 포스트를 찾을 수 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
