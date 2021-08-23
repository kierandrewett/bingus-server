import { defaultSecurityOptions } from "../config/security";
import { log } from "../log";
import { Server } from "../server";
import { ServerSecurityFeatures } from "../types/server";

export const setupSecurityFeatures = (application: Server, options: boolean | ServerSecurityFeatures | undefined) => {
    if(typeof(options) == "undefined") return;
    
    let features: Partial<ServerSecurityFeatures> = {};

    if(typeof(options) == "boolean") {
        // All are disabled
        if(options == false) return;

        // All are enabled
        for(const key of Object.keys(defaultSecurityOptions)) {
            (features as any)[key] = true;
        }
    }

    for(const [key, value] of Object.entries(features)) {
        if(value) log(`Security: feature "${key}" is enabled`);
    }

    application.use((req, res) => {
        if(features.disablePoweredBy) res.removeHeader("X-Powered-By");
    })
}