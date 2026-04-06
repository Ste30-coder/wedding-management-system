import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates user credentials for login.
   * Checks if email exists and if the provided password matches the hashed version in DB.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    if (user && (await bcrypt.compare(pass, (user as any).password))) {
      const { password, ...result } = user as any; // Strip password before returning
      return result;
    }
    
    return null;
  }

  /**
   * Generates a signed JWT for the authenticated user.
   * Now includes the user's first associated wedding and its sides.
   */
  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      fullName: user.fullName 
    };

    // Find the first wedding this user is associated with
    const weddingUser = await this.prisma.weddingUser.findFirst({
      where: { userId: user.id },
      include: {
        wedding: {
          include: {
            sides: true
          }
        }
      }
    });

    const wedding = weddingUser?.wedding;
    const brideSide = wedding?.sides.find(s => s.name === 'bride');
    const groomSide = wedding?.sides.find(s => s.name === 'groom');

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName
      },
      wedding: wedding ? {
        id: wedding.id,
        name: `${wedding.brideName} & ${wedding.groomName}`,
        sides: {
          bride: brideSide?.id,
          groom: groomSide?.id
        }
      } : null
    };
  }
}
