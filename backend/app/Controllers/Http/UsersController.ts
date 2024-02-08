import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "../../Models/User";

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, size = 10, ...qs } = request.qs();
    const users = await User.query().paginate(page, size);

    users.baseUrl(request.url()).queryString(qs);

    return users;
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id);
    if (user) {
      return user;
    }

    return response.status(404).json({ message: "User doesn't exist" });
  }

  public async update({ request, response, params }: HttpContextContract) {
    const user = await User.find(params.id);
    if (user) {
      user.firstName = request.input("first_name");
      user.lastName = request.input("last_name");
      user.gender = request.input("gender");
      user.email = request.input("email");
      user.password = request.input("password");

      if (await user.save()) {
        return response.json({ affectedRows: 1 });
      }
      return response.status(422).json({ message: "Error updating" });
    }
    return response.status(404).json({ message: "User doesn't exist" });
  }

  public async store({ request, response }: HttpContextContract) {
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

    return response.status(201).json({ id: user.id });
  }

  public async destroy({ response, params }: HttpContextContract) {
    const user = await User.find(params.id);
    if (!user) {
      return response.status(404).json({ message: "User doesn't exist" });
    }

    const [affectedRows] = await User.query().where("id", params.id).del();
    return response.json({ affectedRows: affectedRows });
  }

  public async initialize({ response }: HttpContextContract) {
    const users = await User.query().limit(1);
    if (users.length >= 1) {
      return response.status(422).json({ message: "The app has initialized" });
    }

    const user = new User();
    user.firstName = "Administrator";
    user.lastName = "Super";
    user.email = "admin@simpleapp.com";
    user.password = "123456789";
    user.gender = "MALE";

    user.save();

    return response.status(201).json({ email: user.email });
  }
}
