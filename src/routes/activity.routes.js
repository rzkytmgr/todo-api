const router = require('express').Router();
const { Activity } = require('../models');

router.get('/', async (req, res) => {
  try {
    const result = await Activity.findAll();
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

router.get('/:activityId', async (req, res) => {
  try {
    const result = await Activity.findOne({ where: { id: req.params.activityId } });

    if (!result)
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${req.params.activityId} Not Found`,
        data: {},
      });

    return res.status(200).json({
      status: 'Success',
      message: 'Succes',
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
    const { title, email } = req.body;
    console.log(req.body);
    if (!title)
      return res.status(400).json({
        status: 'Bad Request',
        message: 'title cannot be null',
        data: {},
      });

    const result = await Activity.create({ email: email ?? '', title });

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

router.delete('/:activityId', async (req, res) => {
  try {
    const result = await Activity.findOne({ where: { id: req.params.activityId } });

    if (!result)
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${req.params.activityId} Not Found`,
        data: {},
      });

    await result.destroy();
    return res.status(200).json({
      status: 'Success',
      message: 'Succes',
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: error.message,
    });
  }
});

router.patch('/:activityId', async (req, res) => {
  try {
    if (!req.body.title)
      return res.status(400).json({
        status: 'Bad Request',
        message: 'title cannot be null',
        data: {},
      });

    let result = await Activity.findOne({ where: { id: req.params.activityId } });

    if (!result)
      return res.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${req.params.activityId} Not Found`,
        data: {},
      });

    result = await result.update({ title: req.body.title });

    return res.status(200).json({
      status: 'Success',
      message: 'Succes',
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
