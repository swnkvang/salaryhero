import events from "events";
import { setup } from "./server.js";


events.defaultMaxListeners = 0;

setup();
