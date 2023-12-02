import { useState } from "react";
import propTypes from "prop-types";

function CadastrarAgendamentos({ url }) {
  CadastrarAgendamentos.propTypes = {
    url: propTypes.any,
  };

  const [agendamento, setAgendamento] = useState({
    id: 1,
    email: "",
    data: "",
    laboratorio: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza a requisição POST para a API do MockAPI
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agendamento),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar agendamento");
      }

      // Se a requisição for bem-sucedida, atualiza o estado local
      const newAgendamento = await response.json();

      setAgendamento({
        id: newAgendamento.id + 1, // Atualiza o ID automaticamente
        email: "",
        data: "",
        laboratorio: "",
      });

      console.log("Agendamento cadastrado com sucesso:", newAgendamento);
    } catch (error) {
      console.error("Erro ao cadastrar agendamento:", error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-4">Cadastrar Agendamento</h1>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            ID:
          </label>
          <input
            type="text"
            className="form-control"
            autoFocus
            disabled
            placeholder="Este campo é preenchido automaticamente"
            id="id"
            required
            value={agendamento.id}
            onChange={(e) => setAgendamento({ ...agendamento, id: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="E-mail do usuário"
            id="email"
            required
            value={agendamento.email}
            onChange={(e) => setAgendamento({ ...agendamento, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="data" className="form-label">
            Data:
          </label>
          <input
            type="date"
            className="form-control"
            placeholder="Data da reserva"
            id="data"
            required
            value={agendamento.data}
            onChange={(e) => setAgendamento({ ...agendamento, data: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="laboratorio" className="form-label">
            Laboratório:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nome do laboratório"
            id="laboratorio"
            required
            value={agendamento.laboratorio}
            onChange={(e) =>
              setAgendamento({ ...agendamento, laboratorio: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastrarAgendamentos;
