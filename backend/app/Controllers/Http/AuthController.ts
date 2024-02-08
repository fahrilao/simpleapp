import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "../../Models/User";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "1 days",
    });
    return token.toJSON();
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const isExist = await User.query()
      .where("email", request.input("email"))
      .limit(1);

    if (isExist.length >= 1) {
      return response.status(422).json({ message: "Email already used" });
    }

    const user = new User();
    user.firstName = request.input("first_name");
    user.lastName = request.input("last_name");
    user.gender = request.input("gender");
    user.password = request.input("password");
    user.email = request.input("email");
    await user.save();

    const token = await auth
      .use("api")
      .attempt(user.email, request.input("password"), {
        expiresIn: "1 days",
      });
    return token.toJSON();
  }

  public async me({ auth }: HttpContextContract) {
    const user = await auth.authenticate();

    return user;
  }
}
