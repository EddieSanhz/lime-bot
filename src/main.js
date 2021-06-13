'use strict';

const Lime = require('./lime');
const limeConfig = require('./config.json');

const lime = new Lime(limeConfig);

lime.start();
