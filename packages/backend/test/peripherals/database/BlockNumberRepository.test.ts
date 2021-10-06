import { expect } from 'chai'

import { UnixTime } from '../../../src/model/UnixTime'
import { BlockNumberRepository } from '../../../src/peripherals/database/BlockNumberRepository'
import { setupDatabaseTestSuite } from './setup'

describe('BlockNumberRepository', () => {
  const { knex } = setupDatabaseTestSuite()

  it('can delete all records', async () => {
    const repository = new BlockNumberRepository(knex)
    await repository.deleteAll()
    const results = await repository.getAll()
    expect(results).to.deep.equal([])
  })

  it('can add new records', async () => {
    const repository = new BlockNumberRepository(knex)

    const itemA = { blockNumber: 1234n, timestamp: new UnixTime(5678) }
    const itemB = { blockNumber: 7777n, timestamp: new UnixTime(222222) }

    await repository.add(itemA)
    await repository.add(itemB)

    const results = await repository.getAll()

    expect(results).to.deep.equal([itemA, itemB])
  })
})