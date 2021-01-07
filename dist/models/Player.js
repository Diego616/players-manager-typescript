"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const PlayerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});
PlayerSchema.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.model('Player', PlayerSchema);
