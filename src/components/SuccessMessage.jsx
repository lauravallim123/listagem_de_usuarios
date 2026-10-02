import { useEffect } from "react";

function SuccessMessage({ mensagem, setMensagem }) {
  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        if (setMensagem) setMensagem(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [mensagem, setMensagem]);

  if (!mensagem) return null;

  return (
    <div className="success-snackbar" role="status" aria-live="polite">
      <span>✓ {mensagem}</span>
      {setMensagem && (
        <button className="btn-fechar-toast" onClick={() => setMensagem(null)}>
          ×
        </button>
      )}
    </div>
  );
}

export default SuccessMessage;
