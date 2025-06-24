import winston from "winston";


const allowedTransports = [];

// below transport configuration enables logging on the console

allowedTransports.push(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(
            { format: "YYYY-MM-DD HH:mm:ss" }
        ), 
        winston.format.printf((log)=> `${log.timestamp} ${log.level}: ${log.message}`),
    )
}));

allowedTransports.push(new winston.transports.File({
    filename: "app.log"
}))

const logger = winston.createLogger({
        // default format

        //combine method defines where to store logs [console, file]
        format: winston.format.combine(              
            winston.format.timestamp({ 
                format: "YYYY-MM-DD HH:mm:ss" 
            }), 
            // first argument of combine method defines how we want the timestamp to be formatted
            winston.format.printf((log)=> `${log.timestamp} ${log.level.toUpperCase()}: ${log.message}`),
            // second argument of combine method defines what is exactly going to be printed into the logs
        ), 
        
        
        defaultMeta: { service: "slackMessageApp" },
        transports: allowedTransports
    });

export default logger;