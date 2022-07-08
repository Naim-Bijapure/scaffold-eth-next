#!/usr/bin/env zx

import "zx/globals";
import { spinner } from "zx/experimental";

let platform = os.platform();
let isFoundryExist = fs.existsSync("/root/.foundry/bin/foundryup");

// for linux and macos installation
if (["linux", "darwin"].includes(platform)) {
  if (isFoundryExist === false) {
    // for macos install libusb package
    if (platform === "darwin") {
      console.log(chalk.blue("you are on mac installing libusb package"));
      await $`brew install libusb`;
    }

    await spinner("wait downloading foundry", () => $`curl -L https://foundry.paradigm.xyz | bash`);
    console.log(chalk.blue("installing foundry"));

    // await $`/root/.foundry/bin/foundryup`;
    await $`~/.foundry/bin/foundryup`;

    console.log(chalk.green("foundry installed successfully"));

    // alert source or  reload terminal for bash or other shells
    console.log(
      chalk.bgRedBright(chalk.white("if you are on bash shell  run >  source ~/.bashrc or open a new terminal"))
    );
    console.log("");

    console.log(
      chalk.bgYellowBright(
        chalk.black(
          `if you are not on bash shell add  this path line => {export PATH="$PATH:/user_path/.foundry/bin"} and source it \n`
        )
      )
    );

    console.log(chalk.bgYellowBright(chalk.black(`for zsh eg: source ~/.zshrc \n`)));

    console.log(chalk.bgGreen(chalk.white(`run => yarn scafold:help to get basic commands \n`)));
  }

  if (isFoundryExist === true) {
    console.log(chalk.green("foundry already installed updating"));
    await $`~/.foundry/bin/foundryup`;
    console.log(chalk.green("foundry updated successfully"));

    await $`zx  help.mjs`;

    console.log(chalk.bgGreen(chalk.white(`run => yarn scafold:help to get basic commands \n`)));
  }
} else {
  console.log(
    chalk.red(
      "look like you are on windows  follow this link for foundry installation => https://book.getfoundry.sh/getting-started/installation.html"
    )
  );
}
