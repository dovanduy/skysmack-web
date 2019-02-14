export class Logger {
    private static count = 1;
    private static onlyThis = false;

    public static log(logMessage: string, logValue: any = '', toJson: boolean = false, clear: boolean = false) {
        if (!Logger.onlyThis) {
            if (clear) {
                console.clear();
                Logger.count = 1;
            }

            console.log(`(${Logger.count}) ${logMessage}: `, toJson ? JSON.stringify(logValue, undefined, 2) : logValue, '\n');
            Logger.count++;
        }
        return this;
    }

    public static only(logMessage: string, logValue: any, toJson: boolean, clear: boolean) {
        if (clear) {
            console.clear();
            Logger.count = 1;
        }

        console.log(`(${Logger.count}) ${logMessage}: `, toJson ? JSON.stringify(logValue, undefined, 2) : logValue, '\n');
        Logger.count++;
        Logger.onlyThis = true;
        return this;
    }
}
