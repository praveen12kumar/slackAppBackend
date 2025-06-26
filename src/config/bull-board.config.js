import {createBullBoard} from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import {ExpressAdapter} from '@bull-board/express';

import mailQueue from '../queues/mailQueue.js';
import testQueue from '../queues/testQueue.js';


export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
    queues: [new BullMQAdapter(mailQueue), new BullMQAdapter(testQueue)],
    serverAdapter,
  });