import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { HashCompare } from '@/domain/forum/application/cryptography/hash-compare'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

import { JwtEncrypter } from './jwt-encrypter'
import { BcrypterHasher } from './bcrypter-hasher'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashCompare, useClass: BcrypterHasher },
    { provide: HashGenerator, useClass: BcrypterHasher },
  ],

  exports: [Encrypter, HashCompare, HashGenerator],
})
export class CryptographyModule {}
