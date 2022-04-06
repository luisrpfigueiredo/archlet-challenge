import { objectType } from 'nexus'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
  },
})
