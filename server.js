const express = require('express');
const cors = require('cors');

class Server{
    constructor() {
        this.app = express();

        this.path = {
            task: '/task',
            user: '/user'
        }

        this.middlewares();

        this.routes();

    }
    
    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.path.user, require('./routes/user') );
        this.app.use( this.path.task, require('./routes/task') );
    }

    listen(){
        this.app.listen(8080, 'localhost', () => {
            console.log('Server running on the port 8080')
        })
    }

}

module.exports = Server;



