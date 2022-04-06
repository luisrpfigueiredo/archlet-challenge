import { objectType } from 'nexus'

export const CustomItemProperty = objectType({
  name: 'CustomItemProperty',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('value')
  },
})
