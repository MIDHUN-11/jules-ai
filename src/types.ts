
export type LogEntry = {
    ip: string;
    timestamp: Date | null;
    request: string | undefined;
    statusCode: string | undefined;
    responseSize: number | undefined;
    referer: string | undefined;
    userAgent: string | undefined;
};
