import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

export const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.json(cachedResponse);
  } else {
    res.originalJson = res.json;
    res.json = (data) => {
      cache.set(key, data);
      res.originalJson(data);
    };
    next();
  }
};
