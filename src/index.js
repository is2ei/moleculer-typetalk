const fetch = require("node-fetch"),
    {MoleculerError} = require("moleculer").Errors;

/**
 * Post a message using the Typetalk API.
 *
 * https://www.typetalk.com
 *
 * @module Service
 */
module.exports = {

    /**
     * Actions
     */
    actions: {

        /**
         * Post message to Typetalk
         */
        post: {
            handler (ctx) {
                const message = ctx.params.message,
                    token = ctx.params.token || this.settings.token,
                    topicID = ctx.params.topicID || this.settings.topicID;
                return this.postMessage(message, token, topicID);
            },
            params: {
                message: {type: "string"},
                token: {type: "string", optional: true},
                topicID: {type: "string", optional: true}
            }
        }
    },

    /**
     * Service created lifecycle event handler
     */
    created () {
        if (!this.settings.token) {
            const WARN_MSG = "`moleculer-typetalk` requires typetalk token!";
            this.logger.warn(WARN_MSG);
        }
        if (!this.settings.topicID) {
            const WARN_MSG = "`moleculer-typetalk` requires typetalk topic id!";
            this.logger.warn(WARN_MSG);
        }
        return this.Promise.resolve();
    },

    /**
     * Methods
     */
    methods: {

        /**
         * Post message to Typetalk
         *
         * @param {String} message
         * @param {String} token
         * @param {Number} topicID
         */
        postMessage (message, token, topicID) {

            const ERR_MSG = "`typetalk-addon` POSTMESSAGE_ERROR",
                body = JSON.stringify({message});

            return fetch(`https://typetalk.com/api/v1/topics/${topicID}`, {
                body,
                "headers": {
                    "Content-Length": body.length,
                    "Content-Type": "application/json",
                    "X-Typetalk-Token": token
                },
                "method": "post"
            })
                .then((response) => response)
                .catch(() => this.Promise.reject(new MoleculerError(ERR_MSG)));
        }
    },

    name: "typetalk",

    /**
     * Settings
     */
    settings: {

        /** @type {String} */
        token: "",

        /** @type {String} */
        topicID: ""
    },

    /**
     * Service started lifecycle event handler
     */
    started () {
        return this.Promise.resolve();
    },

    /**
     * Service stopped lifecycle event handler
     */
    stopped () {
        return this.Promise.resolve();
    }
};
