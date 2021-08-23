export interface ServerOptions {
    port: number,
    host: string,
    securityFeatures: boolean | ServerSecurityFeatures
}

export interface ServerSecurityFeatures {
    disablePoweredBy?: boolean
}