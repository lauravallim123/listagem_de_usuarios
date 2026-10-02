function UserCardComponent({ usuario, onSelecionarUsuario, onRemoverUsuario }) {
  return (
    <li className="user-card">
      <div className="user-avatar">
        {usuario.name ? usuario.name.charAt(0).toUpperCase() : "U"}
      </div>

      <h2 className="nome-usuario">{usuario.name}</h2>
      <p className="username">@{usuario.username}</p>
      
      <div className="user-details-summary">
        <p className="email">📧 {usuario.email}</p>
        {usuario.phone && <p className="phone">📞 {usuario.phone}</p>}
      </div>

      <div className="card-acoes">
        <button
          className="btn-detalhes"
          onClick={() => onSelecionarUsuario(usuario.id)}
        >
          Ver Detalhes
        </button>

        <button
          className="btn-remover"
          onClick={(e) => {
            e.stopPropagation();
            onRemoverUsuario(usuario.id, usuario.name);
          }}
          title="Remover usuário"
        >
          🗑️ Remover
        </button>
      </div>
    </li>
  );
}

export default UserCardComponent;
