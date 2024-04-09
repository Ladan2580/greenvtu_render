const myModel = require('../models/sms_setting_model')
class sms_setting_controller {
  async getSetting(req, res) {
    try {
      const result = await myModel.find({}, { _id: 0, __v: 0 })
      res.json(result)

    } catch (err) {
      console.log(err)
    }
  }
  async storeRecord(req, res) {
    try {
      const result = await myModel.deleteMany({});
      if (result) {
        const response = await myModel.insertMany(req.body);
        console.log(response)
      }
    } catch (err) {
      console.log(err)
    }

  }
}
module.exports = sms_setting_controller;

