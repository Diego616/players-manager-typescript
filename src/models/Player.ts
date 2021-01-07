import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  alias: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
})
PlayerSchema.plugin(mongoosePaginate);

export default model('Player', PlayerSchema)