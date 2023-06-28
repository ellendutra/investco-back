import usuarios from "../models/Usuario.js";

class UsuarioController {
  static listarUsuarios = async (req, res) => {
    try {
      const resultados = await usuarios.find({})
      return res.status(200).json(resultados);
    } catch(err){
      res.status(500).send({message: `${err.message} - Erro ao listar os usuários`})
    }
  }

  static listarUsuarioPorId = async (req, res) => {
    const id = req.params.id; 
    try {
      res.status(200).send(await usuarios.findById(id))
    } catch(err){
      res.status(400).send({message: `${err.message} - id do usuário não localizado`})
    }
  }

  static cadastrarUsuario = async (req, res) => {
    try {
      const { nome, email, senha, role, ...outrosCampos } = req.body;
      const usuarioExiste = await usuarios.findOne({ email });

      if(usuarioExiste){
        return res.status(409).send({ message: "O email já está cadastrado" });
      }

      if(role === "administrador"){
        const { nivelAcesso, codigoAcesso } = outrosCampos;
        if(!nivelAcesso || !codigoAcesso){
          return res.status(400).send({ message: "Preencha todos os campos obrigatórios" });
        }

        const novoUsuario = new usuarios({
          nome,
          email,
          senha,
          role,
          nivelAcesso,
          codigoAcesso
        });

        const usuarioSalvo = await novoUsuario.save();
        return res.status(201).json({ message: "Usuário cadastrado com sucesso", usuario: usuarioSalvo });
      } else {
        const { idade, tolerancia, renda, prazo, perfil } = outrosCampos;

        if(!idade || !tolerancia || !renda || !prazo || !perfil){
          return res.status(400).send({ message: "Preencha todos os campos obrigatórios" });
        }

        const novoUsuario = new usuarios({
          nome,
          email,
          senha,
          role,
          idade,
          tolerancia,
          renda,
          prazo,
          perfil
        });

        const usuarioSalvo = await novoUsuario.save();
        return res.status(201).json({ message: "Usuário cadastrado com sucesso", usuario: usuarioSalvo });
      } 
    } catch(err){
      return res.status(500).send({ message: err.message });
    }
  };

  static cadastroSimultaneo = async(req, res) => {
    const promessas = []; 
    for(const body of req.body){
      const usuario = new usuarios(body); 
      promessas.push(usuario.save()); 
    }
    const resultado = await Promise.all(promessas)
    res.status(200).send(resultado)
  }

  static atualizarUsuario = async (req, res) => {
    const id = req.params.id; 
    try {
      await usuarios.findByIdAndUpdate(id, {$set: req.body})
      res.status(200).send({message: "Usuário atualizado com sucesso."})
    } catch(err){
      res.status(500).send({message: err.message})
    }
  }

  static excluirUsuario = async (req, res) => {
    const id = req.params.id; 
    try {
      await usuarios.findByIdAndDelete(id)
      res.status(200).send({message: `Usuario excluído com sucesso`})
    } catch(err){
      res.status(500).send({message: err.message})
    }
  }
}

export default UsuarioController;
