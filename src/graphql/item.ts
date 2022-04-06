import { objectType } from 'nexus'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.list.field('bids', {
      type: 'Bid',
      resolve: (parent, _args, context) => {
        return context.prisma.bid.findMany({
          where: { itemId: parent.id },
        })
      },
    })
    t.nonNull.list.nonNull.field('customProperties', {
      type: 'CustomItemProperty',
      resolve: (parent, _args, context) => {
        return context.prisma.customItemProperty.findMany({
          where: { itemId: parent.id },
        })
      },
    })
  },
})
