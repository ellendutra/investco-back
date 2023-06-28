import express from "express";
import usuariosRouter from "./usuariosRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Usuários" });
  });

  app.use(express.json());
  app.use(usuariosRouter);
};

export default routes;
