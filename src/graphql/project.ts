import { objectType } from 'nexus'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('items', {
      type: 'Item',
      resolve: (parent, _args, context) => {
        return context.prisma.item.findMany({
          where: { projectId: parent.id },
        })
      },
    })
  },
})
