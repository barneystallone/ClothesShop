require('dotenv').config();
const os = require('os');
process.env.UV_THREAD_POOL = os.cpus().length;

<<<<<<< HEAD
=======
require('./api/databases/connect.mysql').testConnection();

>>>>>>> c18c934 ([BE] Api get category)
const app = require('./app');

const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
    console.log(`Server start on:  http://localhost:${PORT}`)
})