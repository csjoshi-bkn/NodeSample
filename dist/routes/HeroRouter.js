"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Heroes = require('../../src/data');
class HeroRouter {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Heroes.
     */
    getAll(req, res, next) {
        res.header("Access-Control-Allow-Origin", "null");
        res.header("Access-Control-Allow-Origin", "*");
        res.send(Heroes);
    }
    getOne(req, res, next) {
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
    deleteOne(req, res, next) {
        let query = parseInt(req.params.id);
        //Heroes.delete(hero => hero.id == query);
        var fs = require('fs');
        var data = fs.readFileSync('./src/data.json');
        var json = JSON.parse(data);
        //var heroes = json;
        json = json.filter((hero) => { return hero.id !== query; });
        fs.writeFileSync('./src/results.json', JSON.stringify(json, null, 2));
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
exports.HeroRouter = HeroRouter;
// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();
exports.default = heroRoutes.router;
