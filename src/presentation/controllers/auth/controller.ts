import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { CustomError } from "../../../domain/errors/custom.error";
import { RegisterUserDto } from "../../../domain/dtos/auth/register-user.dto";
import { LoginUserDto } from "../../../domain/dtos/auth/login-user.dto";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server errror" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body)
    if(error) return res.status(400).json({error})

    this.authService.registerUser(registerDto!)
      .then(user => res.json(user))
      .catch(error => this.handleError(error,res))
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body)
    if(error) return res.status(400).json({error})

    this.authService.loginUser(loginDto!)
      .then(user => res.json(user))
      .catch(error => this.handleError(error,res))
  };
}
