function UserDetailsComponent({ usuario, onFecharDetalhes, onRemoverUsuario }) {
  return (
    <div className="detalhes-usuario-container">
      <div className="detalhes-header">
        <div className="user-avatar-lg">
          {usuario.name ? usuario.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <h2>{usuario.name}</h2>
          <p className="username-badge">@{usuario.username}</p>
        </div>
      </div>

      <div className="detalhes-corpo">
        <div className="item-detalhe">
          <strong>E-mail:</strong>
          <span>{usuario.email}</span>
        </div>

        <div className="item-detalhe">
          <strong>Telefone:</strong>
          <span>{usuario.phone || usuario.telefone || "Não informado"}</span>
        </div>

        {usuario.website && (
          <div className="item-detalhe">
            <strong>Website:</strong>
            <span>{usuario.website}</span>
          </div>
        )}

        {usuario.company && (
          <div className="item-detalhe">
            <strong>Empresa:</strong>
            <span>{usuario.company.name || usuario.company}</span>
          </div>
        )}

        {usuario.address && (
          <div className="item-detalhe">
            <strong>Endereço:</strong>
            <span>
              {typeof usuario.address === "string"
                ? usuario.address
                : `${usuario.address.street || ""}, ${usuario.address.suite || ""} - ${usuario.address.city || ""}`}
            </span>
          </div>
        )}
      </div>

      <div className="detalhes-acoes">
        <button className="btn-secundario" onClick={onFecharDetalhes}>
          Fechar
        </button>
        {onRemoverUsuario && (
          <button
            className="btn-remover-modal"
            onClick={() => {
              onRemoverUsuario(usuario.id, usuario.name);
              onFecharDetalhes();
            }}
          >
            🗑️ Remover Usuário
          </button>
        )}
      </div>
    </div>
  );
}

export default UserDetailsComponent;
