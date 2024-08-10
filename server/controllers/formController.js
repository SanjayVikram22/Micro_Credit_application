const Form = require('../models/Form');

exports.createForm = async (req, res) => {
  try {
    const formData = new Form(req.body.condetails);
    await formData.save();
    res.status(200).send('Form received');
    console.log(formData.id);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const data = await Form.find();
    res.status(200).json({ studentlists: data });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

exports.getDataByEmail = async (req, res) => {
  try {
    const { emailId } = req.body;
    const data = await Form.find({ email: emailId });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
