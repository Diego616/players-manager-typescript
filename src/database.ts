import mongoose from 'mongoose'

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://diegohenrique:nwmg8ut1@cluster0.ohu3p.gcp.mongodb.net/playersCrud?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database connect')
  } catch (error) {
    console.log('ERROR:', error)
  }
}

export default connect