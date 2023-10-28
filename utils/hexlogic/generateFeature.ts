import { coastAdjectives, desertAdjectives, forestAdjectives, hillAdjectives, jungleAdjectives, lakeAdjectives, marshAdjectives, mountainAdjectives, oceanAdjectives, plainsAdjectives } from '@/public/featurecombos/featureadjectives'
import { coastNouns, desertNouns, forestNouns, hillNouns, jungleNouns, lakeNouns, marshNouns, mountainNouns, oceanNouns, plainsNouns } from '@/public/featurecombos/featurenouns'


export function generateFeature(terrain: Terrain): string {

    switch (terrain) {
        case 'C': {
            return `${coastAdjectives[Math.floor(Math.random() * coastAdjectives.length)]} ${coastNouns[Math.floor(Math.random() * coastNouns.length)]}`
        }
        case 'D': {
            return `${desertAdjectives[Math.floor(Math.random() * desertAdjectives.length)]} ${desertNouns[Math.floor(Math.random() * desertNouns.length)]}`
        }
        case 'F': {
            return `${forestAdjectives[Math.floor(Math.random() * forestAdjectives.length)]} ${forestNouns[Math.floor(Math.random() * forestNouns.length)]}`
        }
        case 'H': {
            return `${hillAdjectives[Math.floor(Math.random() * hillAdjectives.length)]} ${hillNouns[Math.floor(Math.random() * hillNouns.length)]}`
        }
        case 'J': {
            return `${jungleAdjectives[Math.floor(Math.random() * jungleAdjectives.length)]} ${jungleNouns[Math.floor(Math.random() * jungleNouns.length)]}`
        }
        case 'L': {
            return `${lakeAdjectives[Math.floor(Math.random() * lakeAdjectives.length)]} ${lakeNouns[Math.floor(Math.random() * lakeNouns.length)]}`
        }
        case 'Ma': {
            return `${marshAdjectives[Math.floor(Math.random() * marshAdjectives.length)]} ${marshNouns[Math.floor(Math.random() * marshNouns.length)]}`
        }
        case 'M': {
            return `${mountainAdjectives[Math.floor(Math.random() * mountainAdjectives.length)]} ${mountainNouns[Math.floor(Math.random() * mountainNouns.length)]}`
        }
        case 'O': {
            return `${oceanAdjectives[Math.floor(Math.random() * oceanAdjectives.length)]} ${oceanNouns[Math.floor(Math.random() * oceanNouns.length)]}`
        }
        case 'P': {
            return `${plainsAdjectives[Math.floor(Math.random() * plainsAdjectives.length)]} ${plainsNouns[Math.floor(Math.random() * plainsNouns.length)]}`
        }
        default: {
            return 'Error'
        }
    }


}