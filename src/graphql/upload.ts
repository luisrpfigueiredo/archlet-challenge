import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { scalarType } from 'nexus'

export type Upload = Promise<FileUpload>

// Must match with type
export const Upload = scalarType({
  ...GraphQLUpload,
  sourceType: 'u.Upload',
})
