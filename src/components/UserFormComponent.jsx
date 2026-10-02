import { useState } from "react";

function UserFormComponent({ onCadastrar }) {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  function handleSubmit(evento) {
    evento.preventDefault();
    if (!nome.trim() || !username.trim() || !email.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const novoUsuario = {
      name: nome,
      username: username,
      email: email,
      phone: telefone
    };

    onCadastrar(novoUsuario);
    limparFormulario();
  }

  function limparFormulario() {
    setNome("");
    setUsername("");
    setEmail("");
    setTelefone("");
  }

  return (
    <form className="formulario-usuario" onSubmit={handleSubmit}>
      <header className="formulario-usuario__cabecalho">
        <p className="tag-cadastro">Cadastro</p>
        <h2>Novo Usuário</h2>
      </header>

      <div className="campo-formulario">
        <label htmlFor="novo-usuario-nome">Nome Completo *</label>
        <input
          type="text"
          id="novo-usuario-nome"
          required
          autoComplete="name"
          placeholder="Ex: Ana Silva"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="novo-usuario-username">Nome de Usuário (Username) *</label>
        <input
          type="text"
          id="novo-usuario-username"
          required
          placeholder="Ex: anasilva"
          value={username}
          onChange={(evento) => setUsername(evento.target.value)}
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="novo-usuario-email">E-mail *</label>
        <input
          type="email"
          id="novo-usuario-email"
          required
          autoComplete="email"
          placeholder="Ex: ana@exemplo.com"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="novo-usuario-telefone">Telefone</label>
        <input
          type="text"
          id="novo-usuario-telefone"
          autoComplete="tel"
          placeholder="Ex: (11) 98765-4321"
          value={telefone}
          onChange={(evento) => setTelefone(evento.target.value)}
        />
      </div>

      <div className="acoes-formulario">
        <button className="botao-cadastrar" type="submit">
          Cadastrar Usuário
        </button>
      </div>
    </form>
  );
}

export default UserFormComponent;
