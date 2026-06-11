import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  
  @Get('status')
  @HttpCode(HttpStatus.OK)
  getAuthStatus() {
    return {
      status: 'active',
      methods: ['google', 'magic-link'],
      message: 'Authentication is handled primarily by NextAuth on the frontend.',
    };
  }

  // Placeholder if backend needs to trigger a magic link manually
  @Post('send-magic-link')
  @HttpCode(HttpStatus.OK)
  async sendMagicLink(@Body() body: { email: string }) {
    if (!body.email || !body.email.includes('@')) {
      return { success: false, message: 'Invalid email format' };
    }
    
    // In a real scenario, integrate with Resend API here
    return {
      success: true,
      message: 'Magic link simulation successful (managed by frontend)',
      email: body.email.toLowerCase()
    };
  }
}
