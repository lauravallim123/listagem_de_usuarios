function HeaderComponent({ busca, setBusca }) {
  return (
    <header className="header">
      <h1 className="titulo">Catálogo de Usuários</h1>
      <p className="subtitulo">Gerencie a lista de usuários da sua aplicação</p>
      <div className="busca-container">
        <input
          className="campo-busca"
          type="text"
          placeholder="Filtrar por nome, usuário ou e-mail..."
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
      </div>
    </header>
  );
}

export default HeaderComponent;
