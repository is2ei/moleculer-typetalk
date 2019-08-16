![Moleculer logo](http://moleculer.services/images/banner.png)

moleculer-typetalk
===

[![Build Status](https://img.shields.io/travis/com/is2ei/moleculer-typetalk/master.svg?style=flat-square)][travis]
[![Coverage Status](https://coveralls.io/repos/github/is2ei/moleculer-typetalk/badge.svg?branch=master)][coveralls]
[![npm version](https://img.shields.io/npm/v/moleculer-typetalk.svg?style=flat-square)][npm]

[travis]: https://travis-ci.com/is2ei/moleculer-typetalk
[coveralls]: https://coveralls.io/github/is2ei/moleculer-typetalk?branch=master
[npm]: https://badge.fury.io/js/moleculer-typetalk

## Install

```
$ npm i --save moleculer-typetalk
```

## Usage

```javascript
const {ServiceBroker} = require("moleculer"),
    TypetalkService = require("moleculer-typetalk"),
    config = require("./config");

// Create broker
const broker = new ServiceBroker({logger: console});

// Load my service
broker.createService({
    mixins: [TypetalkService],
    name: "typetalk",
    settings: {
        token: config.token,
        topicID: config.topicID
    }
});

// Start server
broker.start().then(() => {
    broker
        .call("typetalk.post", {
            message: "Hello, Typetalk!"
        })
        .then(() => {
            // Do something...
        })
        .catch(() => {
            // Do something...
        });
});
```

For working example, see [this repository](https://github.com/is2ei/moleculer-typetalk-example).


## Settings

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| token | String | required | Typetalk token. |
| topicID | String | required | Topic ID to post to. |
