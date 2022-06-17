import redis from 'redis'

const onRedisError = (err) => { console.error(err) };
const onRedisConnect = () => { console.log('Redis connected') };
const onRedisReconnecting = () => { console.log('Redis reconnecting') };
const onRedisReady = () => { console.log('Redis ready!') };

export const getClient = async () => {
    const client = process.env.REDIS_URL ? redis.createClient({ url: process.env.REDIS_URL }) : redis.createClient();

    client.on('error', onRedisError);
    client.on('connect', onRedisConnect);
    client.on('reconnecting', onRedisReconnecting);
    client.on('ready', onRedisReady);

    await client.connect();
    return client;
};
