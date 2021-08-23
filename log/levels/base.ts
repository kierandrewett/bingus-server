import { blueBright, redBright, reset, yellowBright } from "chalk"
import { getTimeDiff } from "../utils"

export const base = (level: 'log' | 'error' | 'warn', payload: any[]) => {
    const prefixColour = level == "error"
        ? redBright.bold
        : level == "warn"
            ? yellowBright.bold
            : blueBright.bold

    const parts = [
        blueBright.bold(getTimeDiff()),
        prefixColour(level.toUpperCase()),
        ...payload.map(x => reset(x))
    ]

    console.log(...parts)
}