# Droplr API Client for Javascript

Official Droplr API client for Javascript. It works both on frontend & backend using Axios library.

[![npm version](https://badge.fury.io/js/droplr-api.svg)](https://badge.fury.io/js/droplr-api)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Droplr/droplr-api/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/droplr-api.svg?style=flat)](https://www.npmjs.com/package/droplr-api)

## Installation

```
$ npm install --save droplr-api
```

## Testing

```
$ npm install
$ npm test
```

You can also run functional tests (invoking real API) using your Droplr credentials:

```
$ USERNAME=my@email.com PASSWORD=MyPassword npm run test:functional
```

## Usage

```javascript
const Droplr = require('droplr-api');

const client = new Droplr.Client({
  auth: new Droplr.BasicAuth('username', 'password'),
});

const drops = await client.drops.list();
const fileDrop = await client.drops.create({
  type: 'FILE',
  variant: 'image/png',
  title: 'file.png',
  content: fs.createReadStream('some/path/file.png'),
});

const linkDrop = await client.drops.create({
  type: 'LINK',
  content: 'http://some-long-url.com/',
});

const noteDrop = await client.drops.create({
  type: 'NOTE',
  variant: 'text/plain',
  content: 'My note',
});
```
Droplr Client uses [Axios](https://github.com/axios/axios "Axios homepage") for HTTP requests. You can pass [Axios options](https://github.com/axios/axios#axiosoptionsurl-config "Axios options documentation page") while initializing the client.
Example:
```javascript
const client = new Droplr.Client({
  auth: new Droplr.BasicAuth('username', 'password'),
  maxContentLength: 500 * 1024 * 1024 * 1024, // maxBodyLength limit
});
```

## Authorization Methods

When creating Droplr.Client, you can optionally specify _auth_ class:

* `new Droplr.AnonymousAuth(); (default)`
* `new Droplr.BasicAuth('username', 'password');`
* `new Droplr.JwtAuth('jwttoken');`

## Actions

* **`client.drops`**
  * `client.drops.get(id, params = {}, options = {})`
  * `client.drops.list(params = {}, options = {})`
  * `client.drops.create(data, options = {})`
  * `client.drops.update(id, data, options = {})`
  * `client.drops.delete(id, options = {})`
  * `client.drops.getStats(id, options = {})`
  * `client.drops.getReferrers(id, options = {})`
  * `client.drops.view(id, options = {})`
  * `client.drops.listHits(id, params = {}, options = {})`


* **`client.users`**
  * `client.users.current(params = {}, options = {})`
  * `client.users.get(id, options = {})`
  * `client.users.list(params = {}, options = {})`
  * `client.users.create(data, options = {})`
  * `client.users.update(id, data, options = {})`
  * `client.users.delete(id, options = {})`
  * `client.users.getTags(id, options = {})`


* **`client.boards`**
  * `client.boards.get(id, options = {})`
  * `client.boards.list(params = {}, options = {})`
  * `client.boards.create(data, options = {})`
  * `client.boards.update(id, data, options = {})`
  * `client.boards.delete(id, options = {})`
  * `client.boards.watch(id, options = {})`


* **`client.teams`**
  * `client.teams.get(id, options = {})`
  * `client.teams.list(params = {}, options = {})`
  * `client.teams.create(data, options = {})`
  * `client.teams.update(id, data, options = {})`
  * `client.teams.delete(id, options = {})`

* **`client.rootRedirect`**
  * `client.rootRedirect.get(params, options = {})`
