import { forests, hills, mountains, oceans, plains, clouds, coasts, deserts, jungles, lakes, marshes } from '@/public/imageLib'

export function getImage(hex: Hex) {
    const char = hex.terrainType
    switch (char) {
        case "F": {
            return forests[Math.floor(Math.random() * forests.length)]
        }
        case "H": {
            return hills[Math.floor(Math.random() * hills.length)]
        }
        case "M": {
            return mountains[Math.floor(Math.random() * mountains.length)]
        }
        case "O": {
            return oceans[Math.floor(Math.random() * oceans.length)]
        }
        case "P": {
            return plains[Math.floor(Math.random() * plains.length)]
        }
        case "C": {
            return coasts[Math.floor(Math.random() * coasts.length)]
        }
        case "D": {
            return deserts[Math.floor(Math.random() * deserts.length)]
        }
        case "J": {
            return jungles[Math.floor(Math.random() * jungles.length)]
        }
        case "L": {
            return lakes[Math.floor(Math.random() * lakes.length)]
        }
        case "Ma": {
            return marshes[Math.floor(Math.random() * marshes.length)]
        }
        default: {
            return clouds[Math.floor(Math.random() * clouds.length)]
        }
    }
}