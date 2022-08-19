import argon from 'argon2'
import config from 'config'

class ArgonHash {
    static async Hash(encryptString: string) {
        return argon.hash(encryptString, {
            salt: Buffer.from(config.get('Argon.argonKey')),
            memoryCost: 1024,
            timeCost: 2,
            hashLength: 32,
        })
    }

    static async Decrypt(encryptedString: string, plainString: string) {
        return argon.verify(encryptedString, plainString, {
            salt: Buffer.from(config.get('Argon.argonKey')),
            memoryCost: 1024,
            timeCost: 2,
            hashLength: 32,
        })
    }
}

export default ArgonHash
