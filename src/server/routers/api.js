import { Router } from 'express';

var apiRouter = Router();

apiRouter.post('/posts', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})

export default apiRouter;