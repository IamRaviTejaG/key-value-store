import dbConnection from '../config/database'
const itemSchema = require('../schema/itemSchema')
const ItemModel = dbConnection.model('item', itemSchema)

export default {
  /**
   * Sets value of a key, when value is a string.
   * @param  req
   * @param  res
   */
  setValueString: (req, res) => {
    ItemModel.updateOne(
      { key: req.params.key },
      { value: req.params.value },
      { upsert: true }
    ).then(result => {
      res.status(200).json({ message: 'New value set successfully!' })
    }).catch(err => {
      res.status(500).json({ error: err })
    })
  },

  /**
   * Sets value of a key, when value is a array, object, etc.
   * The HTTP "Content-type" header must be set to "application/json".
   * @param  req
   * @param  res
   */
  setValueObject: (req, res) => {
    ItemModel.updateOne(
      { key: req.body.key },
      { value: req.body.value },
      { upsert: true }
    ).then(result => {
      res.status(200).json({ message: 'New value set successfully!' })
    }).catch(err => {
      res.status(500).json({ error: err })
    })
  }
}
