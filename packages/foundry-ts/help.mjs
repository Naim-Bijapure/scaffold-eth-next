#!/usr/bin/env zx

console.log(chalk.bgCyan(chalk.black(`-----------COMMANDS --------------- \n`)));

console.log(chalk.bgMagenta(chalk.black(chalk.white(`yarn setup`), ` => first time setup command it will install foundry \n`)));
console.log(chalk.bgMagenta(chalk.black(chalk.white(`yarn install`), ` => to install dependencies \n`)));
console.log(chalk.bgMagenta(chalk.black(chalk.white(`yarn chain`), ` => start local eth node \n`)));
console.log(chalk.bgMagenta(chalk.black(chalk.white(`yarn generate`), ` => to generate new account  \n`)));
console.log(chalk.bgMagenta(chalk.black(chalk.white(`yarn dev`), `=>  start nextjs fronend on localhost:3000 \n`)));

console.log(
  chalk.bgMagenta(
    chalk.black(
      chalk.white(`yarn deploy --network xx (default is localhost)`),
      ` => to deploy contract on front end run \n`
    )
  )
);
console.log(chalk.bgMagenta(chalk.black(chalk.white(`yarn contracts:build`), ` =>  to update contract build on frontend  \n`)));
console.log(
  chalk.bgMagenta(chalk.black(chalk.white(`yarn contracts:rebuild`), `=>  to rebuild contract build on frontend  \n`))
);

console.log(chalk.bgMagenta(chalk.black(chalk.white(`yarn vercel:deploy`), `=>  to deploy project on vercel \n`)));
