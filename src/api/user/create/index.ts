import { Class, User } from "../../../Schemas";

import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

interface RequiredSyntax {
  age: string;
  username: string;
  password: string;
  currency: string;
}

function hasSyntax(obj: any): obj is RequiredSyntax {
  return (
    ("age" in obj && "username" in obj && "password" in obj) ||
    ("classID" in obj && "className" in obj)
  );
}

router.put("/", async (req, res) => {
  //@ts-ignore
  if (req.user?.admin !== true) {
    //@ts-ignore
    res.sendStatus(403);
    res.end();
    return;
  }
  //@ts-ignore
  if (!hasSyntax(req.body)) {
    res.sendStatus(400);
    return;
  }
  const { age, username, password }: RequiredSyntax = req.body;

  const NewUser: any = {
    age,
    username,
    password,
  };

  if ("classID" in req.body) {
    try {
      //@ts-ignore
      if (!(await Class.exists({ id: req.body.classID }))) {
        res.status(404);
        res.send({ message: "Class not found" });
        return;
      }
      //@ts-ignore
      const UsersClass = await Class.findOne({ id: req.body.classID });
      //@ts-ignore
      NewUser.classID = UsersClass.id;
      //NewUser.class = { id: UsersClass.id, name: UsersClass.name };
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  } else if ("className" in req.body) {
    try {
      //@ts-ignore
      if (!(await Class.exists({ name: req.body.className }))) {
        res.status(404);
        res.send({ message: "Class not found" });
        return;
      }
      //@ts-ignore
      console.log(req.body.className);
      //@ts-ignore
      const UsersClass = await Class.find({ name: req.body.className });
      //@ts-ignore
      NewUser.classID = UsersClass[0].id;
      if (UsersClass.length > 1) {
        res.status(406);
        res.send({ message: "Too many classes with same name" });
        return;
      }
      //NewUser.class = { id: UsersClass[0].id, name: UsersClass[0].name };
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
  }
  NewUser.id = uuidv4();
  try {
    const { _id, admin, __v, ...response } = (await new User(NewUser).save())
      ._doc;
    res.status(201);
    res.send(response);
  } catch (err) {
    res.status(500);
  }

  res.end();
});

export default router;
