const router = require('express').Router();
const { keyConverter } = require('../util');
const { Todo, Activity } = require('../models');

router.get('/', async (req, res) => {
  try {
    const result = await Todo.findAll(req.query.activity_group_id ? { where: { activityGroupId: req.query.activity_group_id || '*' } } : {});
    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
});

router.get('/:todoId', async (req, res) => {
  try {
    const result = await Todo.findOne({ where: { id: req.params.todoId } });

    if (!result)
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${req.params.todoId} Not Found`,
        data: {},
      });

    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = {
      activityGroupId: req.body.activity_group_id,
      title: req.body.title,
      isActive: true,
      priority: req.body?.priority ?? 'very-high',
    };
    if (!data.activityGroupId)
      return res.status(400).json({
        status: 'Bad Request',
        message: 'activity_group_id cannot be null',
        data: {},
      });
    const activity = await Activity.findOne({ where: { id: data.activityGroupId } });
    if (!activity)
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with activity_group_id ${data.activityGroupId} Not Found`,
        data: {},
      });
    if (!data.title)
      return res.status(400).json({
        status: 'Bad Request',
        message: 'title cannot be null',
        data: {},
      });
    const result = await Todo.create(data);
    return res.status(201).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
});

router.delete('/:todoId', async (req, res) => {
  try {
    const result = await Todo.findOne({ where: { id: req.params.todoId } });
    if (!result)
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${req.params.todoId} Not Found`,
        data: {},
      });
    await result.destroy();
    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
});

router.patch('/:todoId', async (req, res) => {
  try {
    let result = await Todo.findOne({ where: { id: req.params.todoId } });
    if (!result)
      return res.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${req.params.todoId} Not Found`,
        data: {},
      });
    const data = {
      title: req.body.title,
      isActive: req.body.is_active ? '1' : '0',
      priority: req.body?.priority ?? 'very-high',
    };
    result = await result.update(data);
    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
});

module.exports = router;
