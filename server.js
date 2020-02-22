const {
    express,
    helmet,
    projectsRouter,
    actionsRouter,
    logger,
    cors
} = require('./middleware/imports')

const server = express();

server.use(logger())
server.use(cors())
server.use(helmet());
server.use(express.json());
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => { res.send(`<h2>Server is connected</h2>`) })
module.exports = server;