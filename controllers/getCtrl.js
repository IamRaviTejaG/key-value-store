import dbConnection from '../config/database'
const itemSchema = require('../schema/itemSchema')
const ItemModel = dbConnection.model('item', itemSchema)

export default {
  /**
   * Gets the corresponding value of a key.
   * @param  req
   * @param  res
   */
  getValue: (req, res) => {
    ItemModel.find({ key: req.params.key }).then(result => {
      if (!result.length) {
        res.status(200).json({ message: 'No result found!' })
      } else {
        res.status(200).json({ value: result[0].value })
      }
    }).catch(err => {
      res.status(500).json({ error: err })
    })
  }
}
