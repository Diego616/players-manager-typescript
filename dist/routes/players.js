"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const Player_1 = __importDefault(require("../models/Player"));
router.route('/create')
    .get((req, res) => {
    res.render('players/create');
})
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, alias, email } = req.body;
    const newPlayer = new Player_1.default({ name, alias, email });
    yield newPlayer.save();
    res.redirect('/players/list');
}));
router.route('/list')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const next = 2;
    const previous = '';
    const players = yield Player_1.default.find().limit(10);
    res.render('players/list', { players, next, previous });
}));
router.route('/list/:page')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.params;
    let pagenumber = +page;
    const next = pagenumber + 1;
    const previous = pagenumber - 1;
    const players = yield Player_1.default.find().limit(10).skip((pagenumber - 1) * 10);
    res.render('players/list', { players, next, previous });
}));
router.route('/search')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    console.log(name);
    const player = yield Player_1.default.findOne({ name });
    console.log(player);
    res.render('players/search', { player });
}));
router.route('/delete/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Player_1.default.findByIdAndDelete(id);
    res.redirect('/players/list');
}));
router.route('/edit/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const player = yield Player_1.default.findById(id);
    console.log(player);
    res.render('players/edit', { player });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, alias, email } = req.body;
    yield Player_1.default.findByIdAndUpdate(id, { name, alias, email });
    res.redirect('/players/list');
}));
exports.default = router;
