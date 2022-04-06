import { objectType } from 'nexus'

export const Organization = objectType({
  name: 'Organization',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('projects', {
      type: 'Project',
      resolve: (parent, _args, context) => {
        return context.prisma.project.findMany({
          where: { organizationId: parent.id },
        })
      },
    })
  },
})
