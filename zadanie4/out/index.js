"use strict";
//BEFORE YOU START DON'T FORGET COMAND CD ZADANIE4
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports express package
const express_1 = __importDefault(require("express"));
// imports cors package
const cors_1 = __importDefault(require("cors"));
// imports json and urlencoded
const body_parser_1 = require("body-parser");
// imports http
const http_1 = __importDefault(require("http"));
// imports maps (map, map2) and fuctions (wholeInfo, someInfo, )
const Map_1 = require("./extra/Map");
// creates variable app
let app;
/**
* starts functions
*/
(0, Map_1.wholeInfo)();
(0, Map_1.someInfo)();
/**
 * @http.createServer creates http server
 * @app.get shows shows exact information on defined url
 *  it takes param id from url and changes it's type to number
 *  then it searches for that id in ids of books and then it returns id, name, author and genre of book or message. Both are in json format
 * @app.post return quiet data based on id in defined url
 *  it takes param id from url and changes it's type to number
 *  then it searches for that id in ids of books and then it returns every information about book which it has or message. Both are in json format
 * @app.put controls if there is book with id taken from url
 *  if yes- returns message
 *  if not- takes data from body, creates new book and saves it to library (Books.json)
 * @app.delete deletes book from library (Books.json) with id which is in url
 *  if there is no book with id in url- returns message
 */
function createServer() {
    app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)());
    app.use((0, body_parser_1.urlencoded)({ extended: false }));
    http_1.default.createServer(app).listen(1234, () => {
        console.log("Running server on port 1234");
        // http://localhost:1234
    });
    app.get("/api/library/book/:id/info", (req, res) => {
        // http://localhost:1234/api/library/book/:id/info
        const inputid = parseInt(req.params["id"]);
        if (Map_1.map2.has(inputid)) {
            res.json(Map_1.map2.get(inputid));
        }
        else {
            res.json("Kniha s daným ID neexistuje.");
        }
    });
    app.post("/api/library/book/:id/info", (req, res) => {
        // http://localhost:1234/api/library/book/:id/info
        const inputid2 = parseInt(req.params["id"]);
        if (Map_1.map.has(inputid2)) {
            res.json(Map_1.map.get(inputid2));
        }
        else {
            res.json("Kniha s daným ID neexistuje.");
        }
    });
    app.put("/api/library/book/:id/add", (req, res) => {
        // http://localhost:1234/api/library/book/:id/add
        const inputid3 = parseInt(req.params["id"]);
        if (Map_1.map.has(inputid3)) {
            res.json("Kniha s daným ID už existuje.");
        }
        else {
            const _name = req.body["name"];
            const _author = req.body["author"];
            const _genre = req.body["genre"];
            const _year = req.body["year"];
            const _publishers = req.body["publishers"];
            const _country = req.body["country"];
            const _pages = req.body["pages"];
            const data = [{
                    id: inputid3,
                    name: _name,
                    author: _author,
                    genre: _genre,
                    year: _year,
                    publishers: _publishers,
                    country: _country,
                    pages: _pages
                }];
            Map_1.map.set(inputid3, data);
            const fs = require('fs');
            fs.writeFileSync('Books.json', JSON.stringify(Array.from(Map_1.map.values()), null, 2));
            res.json("Kniha s danými údajmi sa úspešne pridala do knižnice.");
        }
    });
    app.delete("/api/library/book/:id/delete", (req, res) => {
        // http://localhost:1234/api/library/book/:id/delete
        const inputid4 = parseInt(req.params["id"]);
        if (Map_1.map.has(inputid4)) {
            Map_1.map.delete(inputid4);
            const fs = require('fs');
            fs.writeFileSync('Books.json', JSON.stringify(Array.from(Map_1.map.values()), null, 2));
            res.json("Kniha s daným ID sa úspešne odstránila zo zoznamu.");
        }
        else {
            res.json("Kniha s daným ID neexistuje.");
        }
    });
}
//starts function
createServer();
