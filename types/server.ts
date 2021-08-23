export interface ServerOptions {
    port: number,
    host: string,
    requestLogger: boolean,
    securityFeatures: boolean | ServerSecurityFeatures
}

export interface ServerSecurityFeatures {
    disablePoweredBy?: boolean
}