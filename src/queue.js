import 'dotenv/config';
import Queue from './lib/Queue';

// Starting the queue(used to send emails)
Queue.processQueue();
