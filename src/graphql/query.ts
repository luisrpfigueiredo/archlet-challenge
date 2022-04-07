import { idArg, nonNull, objectType, stringArg } from 'nexus'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('organizations', {
      type: 'Organization',
      resolve: async (_parent, _args, context) => {
        return context.prisma.organization.findMany()
      },
    })
    t.field('organization', {
      type: 'Organization',
      args: { id: nonNull(idArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.organization.findUnique({
          where: { id: args.id },
        })
      },
    })
    t.nonNull.list.nonNull.field('projects', {
      type: 'Project',
      resolve: (_parent, _args, context) => {
        return context.prisma.project.findMany()
      },
    })
    t.nonNull.list.nonNull.field('organizationProjects', {
      type: 'Project',
      args: { organizationId: nonNull(stringArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.project.findMany({
          where: { organizationId: args.organizationId },
        })
      },
    })
    t.field('project', {
      type: 'Project',
      args: { id: nonNull(idArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.project.findUnique({
          where: { id: args.id },
        })
      },
    })
    t.field('items', {
      type: 'Item',
      resolve: (_parent, _args, context) => {
        return context.prisma.item.findMany()
      },
    })
    t.field('projectItems', {
      type: 'Item',
      args: { projectId: nonNull(stringArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.item.findMany({
          where: { projectId: args.projectId },
        })
      },
    })
    t.field('item', {
      type: 'Item',
      args: { id: nonNull(idArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.item.findUnique({
          where: { id: args.id },
        })
      },
    })
    t.field('customItemProperties', {
      type: 'CustomItemProperty',
      resolve: (_parent, _args, context) => {
        return context.prisma.customItemProperty.findMany()
      },
    })
    t.field('itemCustomItemProperties', {
      type: 'Item',
      args: { itemId: nonNull(stringArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.customItemProperty.findMany({
          where: { itemId: args.itemId },
        })
      },
    })
    t.field('customItemProperty', {
      type: 'Item',
      args: { id: nonNull(idArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.customItemProperty.findUnique({
          where: { id: args.id },
        })
      },
    })
    t.field('bids', {
      type: 'Bid',
      resolve: (_parent, _args, context) => {
        return context.prisma.bid.findMany()
      },
    })
    t.field('itemBids', {
      type: 'Bid',
      args: { itemId: nonNull(stringArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.bid.findMany({
          where: { itemId: args.itemId },
        })
      },
    })
    t.field('bid', {
      type: 'Bid',
      args: { id: nonNull(idArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.bid.findUnique({
          where: { id: args.id },
        })
      },
    })
    t.field('customBidProperties', {
      type: 'Bid',
      resolve: (_parent, _args, context) => {
        return context.prisma.customBidProperty.findMany()
      },
    })
    t.field('bidCustomBidProperties', {
      type: 'Bid',
      args: { bidId: nonNull(stringArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.customBidProperty.findMany({
          where: { bidId: args.bidId },
        })
      },
    })
    t.field('customItemProperty', {
      type: 'CustomBidProperty',
      args: { id: nonNull(idArg()) },
      resolve: (_parent, args, context) => {
        return context.prisma.customBidProperty.findUnique({
          where: { id: args.id },
        })
      },
    })
  },
})
