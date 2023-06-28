import express from "express"; 
import UsuarioController from "../controllers/usuariosController.js";

const usuariosRouter = express.Router(); 

usuariosRouter
  .get("/usuarios", UsuarioController.listarUsuarios)
  .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
  .post("/usuarios", UsuarioController.cadastrarUsuario)
  .post("/usuarios/cadastro-simultaneo", UsuarioController.cadastroSimultaneo)
  .put("/usuarios/:id", UsuarioController.atualizarUsuario)
  .delete("/usuarios/:id", UsuarioController.excluirUsuario)

export default usuariosRouter; 