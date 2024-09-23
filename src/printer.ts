// src/printer.ts
import { LogEntry } from './types';

// Overall analyzed requests
export const printOverallAnalyzedRequests = (logs: LogEntry[]) => {
    console.log(`Overall Analyzed Requests: ${logs.length}`);
};

// Unique visitors per day (based on IP)
export const printUniqueVisitorsPerDay = (logs: LogEntry[]) => {
    const visitorsPerDay = logs.reduce((acc, log) => {
        const day = log.timestamp?.toDateString();
        if (day) {
            acc[day] = acc[day] || new Set();
            acc[day].add(log.ip);
        }
        return acc;
    }, {} as { [key: string]: Set<string> });

    Object.keys(visitorsPerDay).forEach(day => {
        console.log(`${day}: ${visitorsPerDay[day].size} unique visitors`);
    });
};

// Requested files
export const printRequestedFiles = (logs: LogEntry[]) => {
    const fileRequests = logs.reduce((acc, log) => {
        const file = log.request?.split(' ')[1]; // Extracting file from request
        if (file) {
            acc[file] = (acc[file] || 0) + 1;
        }
        return acc;
    }, {} as { [file: string]: number });

    console.log('Requested Files:');
    Object.keys(fileRequests).forEach(file => {
        console.log(`${file}: ${fileRequests[file]} times`);
    });
};

// 404 requested files
export const print404RequestedFiles = (logs: LogEntry[]) => {
    const file404Requests = logs.filter(log => log.statusCode === '404')
                                .reduce((acc, log) => {
                                    const file = log.request?.split(' ')[1];
                                    if (file) {
                                        acc[file] = (acc[file] || 0) + 1;
                                    }
                                    return acc;
                                }, {} as { [file: string]: number });

    console.log('404 Requested Files:');
    Object.keys(file404Requests).forEach(file => {
        console.log(`${file}: ${file404Requests[file]} times`);
    });
};
