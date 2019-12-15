import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * Item Schema
 * @constant {Schema}
 */
const itemSchema = {
  key: {
    type: String,
    unique: true,
    select: true,
    trim: true
  },
  value: {
    type: Schema.Types.Mixed,
    unique: false,
    select: true,
    trim: true
  },
  __v: {
    type: Number,
    select: false
  }
}

module.exports = new Schema(itemSchema)
