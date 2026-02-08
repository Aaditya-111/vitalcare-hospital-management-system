import prisma from './prisma'

interface AuditLogParams {
  userId?: string
  action: string
  entity: string
  entityId?: string
  details?: any
  ipAddress?: string
}

/**
 * Creates an audit log entry in the database.
 */
export async function createAuditLog({ userId, action, entity, entityId, details, ipAddress }: AuditLogParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        details: details ? JSON.stringify(details) : null,
        ipAddress,
      },
    })
  } catch (error) {
    console.error('Failed to create audit log:', error)
  }
}
