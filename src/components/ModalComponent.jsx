function ModalComponent({ children, titulo, onFechar }) {
  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          {titulo && <h2>{titulo}</h2>}
          <button className="modal-fechar" onClick={onFechar} aria-label="Fechar Modal">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default ModalComponent;
