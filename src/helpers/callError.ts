import { HttpException, HttpStatus } from "@nestjs/common";
import { ERROR_MESSAGE } from "src/const";

export function callError(status: HttpStatus, message: ERROR_MESSAGE) {
  throw new HttpException({
    status: status,
    error: message
  }, status, { cause: message })
}
