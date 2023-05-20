import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import prisma from '../lib/prisma'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        coverUrl: true,
        content: true,
        id: true,
      },
    })
    return memories.map(({ id, content, coverUrl }) => {
      return {
        id,
        coverUrl,
        excerpt: content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return memory
  })
  app.post('/memories', async (req) => {
    const bodySchema = z.object({
      coverUrl: z.string(),
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { coverUrl, content, isPublic } = bodySchema.parse(req.body)
    const memory = await prisma.memory.create({
      data: {
        userId: '0fc9675c-218d-41bc-8fc2-321f8ca9178a',
        coverUrl,
        content,
        isPublic,
      },
    })
    return memory
  })

  app.put('/memories/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      coverUrl: z.string(),
      content: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { coverUrl, content, isPublic } = bodySchema.parse(req.body)

    const memory = await prisma.memory.update({
      data: {
        coverUrl,
        content,
        isPublic,
      },
      where: {
        id,
      },
    })
    return memory
  })

  app.delete('/memories/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
