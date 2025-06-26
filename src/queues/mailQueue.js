import {Queue} from 'bullmq';

import redisConfig from '../config/redisConfig.js';

export default new Queue('mail', {
    redis: redisConfig
});