import { objectType } from 'nexus'

export const CustomBidProperty = objectType({
  name: 'CustomBidProperty',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('value')
  },
})
