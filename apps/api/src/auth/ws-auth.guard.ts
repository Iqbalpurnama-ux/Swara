import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly logger = new Logger(WsAuthGuard.name);

  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const cookieHeader = client.handshake.headers.cookie;

    if (!cookieHeader) {
      this.logger.error('No cookies found in websocket handshake');
      throw new WsException('Unauthorized');
    }

    const match = cookieHeader.match(/(?:^|;\s*)(?:__Secure-)?next-auth\.session-token=([^;]+)/);
    const sessionToken = match ? match[1] : null;

    if (!sessionToken) {
      this.logger.error('No session token found in cookies');
      throw new WsException('Unauthorized');
    }

    const session = await this.prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session || session.expires < new Date()) {
      this.logger.error('Invalid or expired session');
      throw new WsException('Unauthorized');
    }

    // Attach user to socket client for later use
    (client as any).user = session.user;
    return true;
  }
}
