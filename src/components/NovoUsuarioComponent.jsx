function NovoUsuarioComponent({ novoUsuario }) {
  if (!novoUsuario) return null;

  return (
    <div className="novo-usuario-destaque">
      <h3>🎉 Novo usuário cadastrado recentemente!</h3>
      <div className="info-novo-usuario">
        <p><strong>Nome:</strong> {novoUsuario.name}</p>
        <p><strong>Usuário:</strong> @{novoUsuario.username}</p>
        <p><strong>E-mail:</strong> {novoUsuario.email}</p>
      </div>
    </div>
  );
}

export default NovoUsuarioComponent;
