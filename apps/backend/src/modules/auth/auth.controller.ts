import { asyncHandler } from "../../utils/asyncHandler";
import { created, noContent, ok } from "../../utils/apiResponse";
import { authService } from "./auth.service";

export const authController = {
  register: asyncHandler(async (req, res) => created(res, await authService.register(req.body))),
  login: asyncHandler(async (req, res) => ok(res, await authService.login(req.body.email, req.body.password))),
  refresh: asyncHandler(async (req, res) => ok(res, await authService.refresh(req.body.refreshToken))),
  logout: asyncHandler(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    return noContent(res);
  }),
  verifyEmail: asyncHandler(async (req, res) => {
    await authService.verifyEmail(req.body.token);
    return noContent(res);
  }),
  forgotPassword: asyncHandler(async (req, res) => ok(res, await authService.forgotPassword(req.body.email))),
  resetPassword: asyncHandler(async (req, res) => {
    await authService.resetPassword(req.body.token, req.body.password);
    return noContent(res);
  }),
};
