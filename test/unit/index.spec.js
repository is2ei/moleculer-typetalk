const TypetalkService = require("../../src"),
    nock = require("nock"),
    {ServiceBroker} = require("moleculer");

describe("Test TypetalkService", () => {
    const broker = new ServiceBroker({"logger": false}),
        service = broker.createService(TypetalkService);

    it("should should defined", () => {
        expect(service).toBeDefined();
    });

    it("should start", () => broker.start().then(() => {
        expect(true).toBe(true);
    }));

    it("should stop", () => broker.stop().then(() => expect(true).toBe(true)));

    it("should call postMessage", () => {
        const OK = 200;
        nock("https://typetalk.com")
            .post("/api/v1/topics/12345")
            .reply(OK, {});

        const TOPIC_ID = 12345;
        return service.postMessage("Hello world", "qweasdzxc", TOPIC_ID)
            .then((response) => {
                expect(response.status).toBe(OK);
            });
    });

    it("should call postMessage method", () => {
        const OK = 200;
        nock("https://typetalk.com")
            .post("/api/v1/topics/12345")
            .reply(OK, {});

        return broker.call("typetalk.post", {
            "message": "Hello world",
            "token": "qweasdzxc",
            "topicID": "12345"
        }).then((response) => {
            expect(response.status).toBe(OK);
        });
    });

});