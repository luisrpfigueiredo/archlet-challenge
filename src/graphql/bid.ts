import { objectType } from 'nexus'

export const Bid = objectType({
  name: 'Bid',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('supplierName')
    t.nonNull.list.nonNull.field('customBidProperties', {
      type: 'CustomBidProperty',
      resolve: (parent, _args, context) => {
        return context.prisma.customBidProperty.findMany({
          where: { bidId: parent.id },
        })
      },
    })
  },
})
