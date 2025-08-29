const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/api/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'resume.json'));
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));