const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizz');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res) =>{
  res.send("server is running.")
})

mongoose.connect('mongodb+srv://davidthomas93452:mohsinhyder@cluster0.be5l5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
