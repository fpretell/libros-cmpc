
import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Autenticación")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Iniciar sesión" })
  @ApiBody({
    type: LoginDto,
    examples: {
      credencialesPrueba: {
        summary: "Credenciales de prueba",
        value: {
          email: "admin@example.com",
          password: "Libros2024@",
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: "Inicio de sesión exitoso" })
  @ApiResponse({ status: 401, description: "Credenciales inválidas" })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas");
    }

    return this.authService.login(user);
  }
}
