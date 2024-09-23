import _ from 'lodash';
import { setTimeout } from 'node:timers/promises';
import fs from 'node:fs/promises';
import { LogEntry } from './types';
import { parseLogs } from './parser';
import { printOverallAnalyzedRequests, printUniqueVisitorsPerDay, printRequestedFiles, print404RequestedFiles } from './printer';

const main = async () => {
  while (true) {
    console.clear();
    try {
      const data = await fs.readFile('log-generator/access.log', { encoding: 'utf8' });
//       const data = `
// 193.139.245.205 - - [02/Oct/2024:13:13:48 +0000] "PUT /search/tag/list HTTP/1.0" 200 5035 "http://www.charles-rodriguez.com/main/tags/homepage.htm" "Mozilla/5.0 (Android 4.1.1; Mobile; rv:32.0) Gecko/32.0 Firefox/32.0"
// `;
      const parsedLogs: LogEntry[] = parseLogs(data);
      
     
      if (parsedLogs.length > 0) {
        printOverallAnalyzedRequests(parsedLogs);     // Print the total number of requests
        printUniqueVisitorsPerDay(parsedLogs);        // Print the unique visitors per day
        printRequestedFiles(parsedLogs);              // Print the requested files and their count
        print404RequestedFiles(parsedLogs);           // Print the files that returned 404 status
      } else {
        console.log("No logs found or unable to parse the logs.");
      }
    } catch (err) {
      console.log(err);
    }
    await setTimeout(500);
  }
};

main();