#!/usr/bin/env node
const inquirer = require('inquirer');
const version = require('./package.json').version;

async function main() {
  const { name: givenName } = await inquirer.prompt([
    {
      type: 'input',
      message: "What's your name?",
      name: 'name',
      validate: (name) => {
        return name.length < 2
          ? "You'll need to give me more than that!"
          : true;
      },
    },
    {
      type: 'checkbox',
      message: "Don't you think you should capitalise your name?",
      name: 'passive_aggressive',
      choices: ['Yes', 'No'],
      // validate: (input) => {
      //   console.log('input', input);
      //   // return input[0] !== input[0].toUpperCase()
      //   //   ? "I think I'm correct don't you?!"
      //   //   : true;
      // },
      when: ({ name }) => {
        return name[0] !== name[0].toUpperCase();
      },
    },
  ]);
  const capitalisedName = givenName[0].toUpperCase() + givenName.slice(1);
  const { js_runtime } = await inquirer.prompt({
    message: `Sooooo ${capitalisedName}, tell me... What's you're favourite JS runtime?`,
    name: 'js_runtime',
    type: 'list',
    choices: ['Node', 'Node.JS', 'Node.js', 'JS!!!', 'JaVaScRipT Obvs!'],
  });
  await inquirer.prompt({
    type: 'input',
    message: `Nice work picking ${js_runtime}! Tough choice!`,
    name: 'the_end',
  });
}

for (let i = 0; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg === '-v' || arg === '--version') {
    console.log(version);
    process.exit();
  }
}

main();
