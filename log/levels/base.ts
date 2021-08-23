import { blueBright, redBright, reset, yellowBright, magentaBright } from "chalk"
import { getTimeDiff } from "../utils"

export const base = (level: 'log' | 'error' | 'warn' | 'security', payload: any[]) => {
    const prefixColour = level == "error"
        ? redBright.bold
        : level == "warn"
            ? yellowBright.bold
            : level == "security"
                ? magentaBright.bold
                : blueBright.bold

    const parts = [
        prefixColour(getTimeDiff()),
        prefixColour(level.toUpperCase()),
        ...payload.map(x => reset(x))
    ]

    console.log(...parts)
}