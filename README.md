# Enfinity
Official Support/Management/Moderation bot for Infinity Bot List

---

## Contributions
Contributing to Enfinity Bot should be as easy as 1, 2, 3.

### Getting started
The first and most important thing is setting the env variables:

- Rename `.env.template` to `.env`
- Open the new `.env` file and fill in the needed variables

**If you are a member of the Infinity Development team you can reach out to toxic for some of the need values**

### Installing Dependencies
```shell
$ yarn install
```

You can use npm here to however it is recommended to use yarn.

### Database Setup
If you have set the needed MySQL url in the `.env` file you should now be able to execute our
database commands/scripts. The needed scripts will be listed below and should be ran in order:

- `yarn db:create` - Create a new prisma client (this is needed and should be ran immediately)
- `yarn db:format` - Format the prisma schema to check for errors or instabilities.
- `yarn db:update` - Deploy/Sync the prisma schema with your MySQL Instance.


### Starting the Bot
Starting the bot is extremely simple (if you have finished all the steps above):

- `yarn bot:build` - This command is optional in a development environment however you should test build frequently to ensure the builds wont fail in prod.
- `yarn bot:dev` - Runs the bot in a development environment using `nodemon` which will automatically restart the bot when changes are saved.

---