import { useEffect, useState } from "react";
import axios from "axios";

import HeaderComponent from "./components/HeaderComponent";
import LoadingComponent from "./components/LoadingComponent";
import UserListComponent from "./components/UserListComponent";
import UserDetailsComponent from "./components/UserDetailsComponent";
import UserFormComponent from "./components/UserFormComponent";
import NovoUsuarioComponent from "./components/NovoUsuarioComponent";
import ModalComponent from "./components/ModalComponent";
import SuccessMessage from "./components/SuccessMessage";

import "./App.css";

const filtrarUsuarioPorTermo = (termo) => (usuario) => {
  if (!termo) return true;
  const termoLower = termo.toLowerCase();

  const nome = usuario.name ? usuario.name.toLowerCase() : "";
  const username = usuario.username ? usuario.username.toLowerCase() : "";
  const email = usuario.email ? usuario.email.toLowerCase() : "";

  return (
    nome.includes(termoLower) ||
    username.includes(termoLower) ||
    email.includes(termoLower)
  );
};

function App() {
  const url = "https://jsonplaceholder.typicode.com";

  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [novoUsuario, setNovoUsuario] = useState(null);
  const [modalNovoUsuarioAberto, setModalNovoUsuarioAberto] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTermo(busca));

  async function buscarUsuarios() {
    try {
      setCarregando(true);
      setErro(null);

      const response = await axios.get(`${url}/users`);
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários: ", error);
      setErro(`Não foi possível carregar os usuários. Motivo: ${error.message}`);
      setUsuarios([]);
    } finally {
      setCarregando(false);
    }
  }

  async function buscarUsuario(id) {
    try {
      // Se for um usuário local recém criado com ID alto
      const usuarioLocal = usuarios.find((u) => u.id === id);
      if (usuarioLocal && id > 10) {
        setUsuarioSelecionado(usuarioLocal);
        return;
      }

      const response = await axios.get(`${url}/users/${id}`);
      setUsuarioSelecionado(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do usuário: ", error);
      const usuarioLocal = usuarios.find((u) => u.id === id);
      if (usuarioLocal) {
        setUsuarioSelecionado(usuarioLocal);
      }
    }
  }

  function limparDetalhesUsuario() {
    setUsuarioSelecionado(null);
  }

  async function cadastrarUsuario(usuario) {
    try {
      const response = await axios.post(`${url}/users`, usuario);
      
      const data = {
        ...response.data,
        id: response.data.id || Date.now(),
        name: usuario.name,
        username: usuario.username,
        email: usuario.email,
        phone: usuario.phone
      };

      setNovoUsuario(data);
      setUsuarios((prev) => [data, ...prev]);
      setMensagem(`Usuário "${data.name}" cadastrado com sucesso!`);
      setModalNovoUsuarioAberto(false);
    } catch (error) {
      console.error("Erro ao cadastrar usuário: ", error);
      // Fallback local
      const dataLocal = {
        ...usuario,
        id: Date.now()
      };
      setNovoUsuario(dataLocal);
      setUsuarios((prev) => [dataLocal, ...prev]);
      setMensagem(`Usuário "${usuario.name}" cadastrado com sucesso!`);
      setModalNovoUsuarioAberto(false);
    }
  }

  async function removerUsuario(id, nome) {
    const nomeUsuario = nome || "este usuário";
    if (!window.confirm(`Tem certeza que deseja remover o usuário "${nomeUsuario}"?`)) {
      return;
    }

    try {
      await axios.delete(`${url}/users/${id}`);
    } catch (error) {
      console.warn("Erro na requisição DELETE da API (simulando remoção local):", error);
    }

    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    if (usuarioSelecionado?.id === id) {
      setUsuarioSelecionado(null);
    }
    setMensagem(`Usuário "${nomeUsuario}" removido com sucesso!`);
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div className="app container">
      <HeaderComponent busca={busca} setBusca={setBusca} />

      <div className="barra-acoes">
        <button
          className="botao-novo-usuario"
          type="button"
          onClick={() => setModalNovoUsuarioAberto(true)}
        >
          + Novo Usuário
        </button>

        {!carregando && !erro && (
          <span className="contador-badge">
            Exibindo <strong>{usuariosFiltrados.length}</strong> de <strong>{usuarios.length}</strong> usuário(s)
          </span>
        )}
      </div>

      {mensagem && (
        <SuccessMessage mensagem={mensagem} setMensagem={setMensagem} />
      )}

      {carregando && <LoadingComponent />}

      {erro && (
        <div className="erro-container">
          <p className="erro">{erro}</p>
          <button className="btn-recarregar" onClick={buscarUsuarios}>
            Tentar Novamente
          </button>
        </div>
      )}

      {!carregando && !erro && (
        <main>
          {novoUsuario && <NovoUsuarioComponent novoUsuario={novoUsuario} />}

          {usuariosFiltrados.length > 0 ? (
            <UserListComponent
              usuarios={usuariosFiltrados}
              onSelecionarUsuario={buscarUsuario}
              onRemoverUsuario={removerUsuario}
            />
          ) : (
            <div className="sem-resultados">
              <p>🔍 Nenhum usuário encontrado para "{busca}".</p>
            </div>
          )}
        </main>
      )}

      {usuarioSelecionado && (
        <ModalComponent onFechar={limparDetalhesUsuario}>
          <UserDetailsComponent
            usuario={usuarioSelecionado}
            onFecharDetalhes={limparDetalhesUsuario}
            onRemoverUsuario={removerUsuario}
          />
        </ModalComponent>
      )}

      {modalNovoUsuarioAberto && (
        <ModalComponent
          titulo="Cadastrar Novo Usuário"
          onFechar={() => setModalNovoUsuarioAberto(false)}
        >
          <UserFormComponent onCadastrar={cadastrarUsuario} />
        </ModalComponent>
      )}
    </div>
  );
}

export default App;
