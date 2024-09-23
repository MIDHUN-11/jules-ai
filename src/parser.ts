// import {LogEntry} from './types';

// export const parseLogs=(data:string):LogEntry[]=>{
// const logLines=data.split('\n');
// const parsedLogs:LogEntry[]= logLines.map(line=>{
//     // const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})--\[(.*?)\]"(.*?)"(\d{3})(\d+)"(.*?)""(.*?)"/;
//     // const ipMatch=line.match(/(\d{1,3}\.\d{1,3}\.d{1,3}\.d{1,3})/);
//     const timestampMatch=line.match(/\[(.*?)\]/);
//     const requestMatch=line.match(/"(.*?")/g);
//     const statusCodeMatch=line.match(/(\d{3})/);
//     const reposnseSizeMatch=line.match(/(\d+)/g);
//     // const match=line.match(regex);
//     if( !timestampMatch || !requestMatch || !statusCodeMatch || !reposnseSizeMatch)
//         {
//     // console.log("not matching",line,requestMatch,timestampMatch,ipMatch,statusCodeMatch,reposnseSizeMatch);
//             return null;
//         } 
//         else{
//             console.log("atleast once",timestampMatch)
//             return{
        
//                 // ip:ipMatch[1],
//                 timestamp:new Date(timestampMatch[1]),
//                 request:requestMatch[3],
//                 statusCode:statusCodeMatch[4],
//                 // url:match[6],
//             }
//         }
    
// }).filter(Boolean) as LogEntry[];
// console.log(parsedLogs);
// return parsedLogs;
// }
// src/parse.ts
import { LogEntry } from './types';

export const parseLogs = (data: string): LogEntry[] => {
    const logLines = data.split('\n');
    
    return logLines.map(line => {
        const ipMatch = line.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
        const timestampMatch = line.match(/\[(.*?)\]/);
        const requestMatch = line.match(/"(PUT|GET|POST|DELETE|HEAD) (.*?) HTTP\/\d\.\d"/);
        const statusCodeMatch = line.match(/\s(\d{3})\s/);
        const responseSizeMatch = line.match(/\s(\d+)\s/);
        const refererMatch = line.match(/"http(.*?)"/);
        const userAgentMatch = line.match(/"(Mozilla.*?)"$/);

        if (!ipMatch || !timestampMatch || !requestMatch || !statusCodeMatch || !responseSizeMatch) {
            return null; // Return null if essential fields are missing
        }

        return {
            ip: ipMatch[1],
            timestamp: new Date(timestampMatch[1]),
            request: requestMatch[0],
            statusCode: statusCodeMatch[1],
            responseSize: parseInt(responseSizeMatch[1], 10),
            referer: refererMatch ? `http${refererMatch[1]}` : undefined,
            userAgent: userAgentMatch ? userAgentMatch[1] : undefined,
        };
    }).filter(Boolean) as LogEntry[];
};
