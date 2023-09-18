import { hash, compare } from 'bcryptjs'

import { HashCompare } from '@/domain/forum/application/cryptography/hash-compare'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class BcrypterHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8

  async hash(plain: string) {
    return await hash(plain, this.HASH_SALT_LENGTH)
  }

  async compare(plain: string, hash: string) {
    return await compare(plain, hash)
  }
}
