import {Router, Request, Response, NextFunction} from 'express';
const Heroes = require('../../src/data');

export class HeroRouter {
  router: Router

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all Heroes.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "null");
    res.header("Access-Control-Allow-Origin", "*");
    res.send(Heroes);
  }

  public getOne(req: Request, res: Response, next: NextFunction){
    let query = parseInt(req.params.id);
    let hero = Heroes.find(hero => hero.id === query);
    res.header("Access-Control-Allow-Origin", "null");
    res.header("Access-Control-Allow-Origin", "*");
    if (hero) {
      res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          hero
        });
    }
    else {
      res.status(404)
        .send({
          message: 'No hero found with the given id.',
          status: res.status
        });
    }
  }

  public deleteOne(req: Request, res: Response, next: NextFunction)
  {
    let query = parseInt(req.params.id);
    //Heroes.delete(hero => hero.id == query);
    var fs = require('fs');
    
    var data = fs.readFileSync('/Users/chandrashekharjoshi/VS Code/Typescript/dist/data.json');
    var json = JSON.parse(data);
    //var heroes = json;
    json = json.filter((hero) => { return hero.id !== query });
    fs.writeFileSync('results.json', JSON.stringify(json, null, 2));
        //res.header("Access-Control-Allow-Origin", "null");
        //res.header("Access-Control-Allow-Origin", "*");
        res.send(json);
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.get('/delete/:id', this.deleteOne);
  }

}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;