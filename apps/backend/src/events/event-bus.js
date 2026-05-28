const subscribers = new Map();

const publish = async (event) => {
    const handlers = subscribers.get(event.name) || [];
    await Promise.all(handlers.map((handler) => handler(event)));
};

const subscribe = (eventName, handler) => {
    const handlers = subscribers.get(eventName) || [];
    subscribers.set(eventName, [...handlers, handler]);
};

const eventBus = {
    publish,
    subscribe,
};

module.exports = {
    publish,
    subscribe,
    eventBus,
};
