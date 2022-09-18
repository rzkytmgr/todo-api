const router = require('express').Router();

router.use('/activity-groups', require('./activity.routes'));
router.use('/todo-items', require('./todo.routes'));

router.get('/', (req, res) => {
  return res.status(200).json({
    status: 'Success',
    message: 'Get the sources and the documentation here https://github.com/rzkytmgr/todo-api',
  });
});

router.all('*', (req, res) => {
  return res.status(404).json({
    status: 'Not Found',
    message: 'endpoint not found!',
  });
});

module.exports = router;
