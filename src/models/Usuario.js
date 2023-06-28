import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    role: { type: String, required: true },
    idade: { type: Number },
    tolerancia: { type: String },
    renda: { type: String },
    prazo: { type: String },
    perfil: { type: String },
    nivelAcesso: { type: String },
    codigoAcesso: { type: String },
  },
  { timestamps: true }
);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios; 
