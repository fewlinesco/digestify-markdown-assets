#! /usr/bin/env node

const yargs = require('yargs');

yargs
  .commandDir('src/commands')
  .demandCommand(1, 'You need at least one command before moving on')
  .wrap(120).argv;
