import {MyPromise} from "./MyPromise";
import {Logger} from "./Logger";

addEventListener('DOMContentLoaded', () => {
    const logger = new Logger('.output-wrapper');

    logger.print("START");

    new MyPromise<string, string>((resolve, reject) => {
        logger.print("PROMISE BODY");
        reject('3');
    })
        .then((result) => {
            logger.print("THEN1: " + result);
        })
        .finally((value) => {
            logger.print("FINALLY: " + value);
            return new MyPromise((resolve, reject) => {
                reject(120);
            })
        })
        .then((result) => {
            logger.print("THEN2: " + result);
            return 30;
        })
        .catch((reason) => {
            logger.print("CATCH1: " + reason);
            return 15;
        })
        .then((result) => {
            logger.print("THEN3: " + result);
            return new MyPromise<string>((resolve) => {
                setTimeout(() => resolve('100'), 1000);
            });
        })
        .then((result) => logger.print("THEN TIMER: " + result));

    logger.print("END");
});
