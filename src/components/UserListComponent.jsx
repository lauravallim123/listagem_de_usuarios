import UserCardComponent from "./UserCardComponent";

function UserListComponent({ usuarios, onSelecionarUsuario, onRemoverUsuario }) {
  return (
    <ul className="user-grid">
      {usuarios.map((usuario) => (
        <UserCardComponent
          key={usuario.id}
          usuario={usuario}
          onSelecionarUsuario={onSelecionarUsuario}
          onRemoverUsuario={onRemoverUsuario}
        />
      ))}
    </ul>
  );
}

export default UserListComponent;
