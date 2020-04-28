# Prerequisites

- We're going to assume you know the basics of Express
- You'll need node v12.16.2 or later
- You'll need to have yarn installed

- /lib - When you start running builds, babel will transpile the code from our src to lib directory. This is not part of the repo.
- /data - Because we're using a very lightweight database, data will actually be a text file with our data in it.
- /src - This is where the source code lives
- /src/server - This is where the magic happens, and where we'll be doing most of our building of middleware
- /src/db - This is where we're going to write software that connects to the database
- /src/externalApi - This is where we're going to write software that connects to an external API.
- /src/repos - This is where we'll write software in the repository pattern; this is sort of a "service of services"

So, let's get started.

First, fork & clone this repo:

https://github.com/brianboyko/httprequests-patterns

Then run

```bash
$ git checkout master
$ git checkout -b develop
$ yarn
$ yarn setupenv
```
