import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';

function TabelaAgendamentos({ agendamentos, onAlterar, onExcluir }) {
  TabelaAgendamentos.propTypes = {
    agendamentos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
        laboratorio: PropTypes.string.isRequired,
      })
    ).isRequired,
    onAlterar: PropTypes.func.isRequired,
    onExcluir: PropTypes.func.isRequired,
  };

  const [showModal, setShowModal] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [formValues, setFormValues] = useState({
    email: '',
    data: '',
    laboratorio: '',
  });

  const agendamentoSelecionadoRef = useRef(null);

  const handleAlterar = (agendamento) => {
    agendamentoSelecionadoRef.current = agendamento;
    setFormValues({
      email: agendamento.email,
      data: agendamento.data,
      laboratorio: agendamento.laboratorio,
    });
    setShowModal(true);
    console.log('Abrir modal para alterar agendamento:', agendamento);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAgendamentoSelecionado(null);
    setFormValues({
      email: '',
      data: '',
      laboratorio: '',
    });
  };

  const handleExcluir = (agendamentoId) => {
    console.log('Excluir agendamento com ID:', agendamentoId);

    // Chamar a função onExcluir para excluir o agendamento
    onExcluir(agendamentoId);

    // Fecha o modal após excluir o agendamento
    handleCloseModal();
  };

  const handleSalvarAlteracoes = async () => {
    try {
      const url = `https://656a8127dac3630cf7271b7f.mockapi.io/api/v1/Agendamento/${agendamentoSelecionadoRef.current.id}`;

      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formValues.email,
          data: formValues.data,
          laboratorio: formValues.laboratorio,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar as alterações');
      }

      const agendamentoAtualizado = await response.json();
      onAlterar(agendamentoAtualizado);
      handleCloseModal();
      // Precisei colocar o window location para dar reload pois não aparecia de imediato
      window.location.reload();

    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
      handleCloseModal();
      window.location.reload();
    }
  };
  
  return (
    <div className="agendamentos">
      <h1 className="mb-4">Tabela de Agendamentos</h1>
      <table className="table table-striped table-bordered custom-table mx-auto">
        <thead className="table-dark">
          <tr>
            <th>
              <i className="bi bi-person-fill me-2"></i>
              ID
            </th>
            <th>
              <i className="bi bi-envelope-fill me-2"></i>
              E-mail
            </th>
            <th>
              <i className="bi bi-calendar3-fill me-2"></i>
              Data
            </th>
            <th>
              <i className="bi bi-building-fill me-2"></i>
              Laboratório
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map((agendamento) => (
            <tr key={agendamento.id}>
              <td>{agendamento.id}</td>
              <td>{agendamento.email}</td>
              <td>{agendamento.data}</td>
              <td>{agendamento.laboratorio}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={() => handleAlterar(agendamento)}
                >
                  Alterar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleExcluir(agendamento.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

{showModal && (
  <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Alterar Agendamento</h5>
          <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-control"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Data:</label>
            <input
              type="date"
              className="form-control"
              value={formValues.data}
              onChange={(e) => setFormValues({ ...formValues, data: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Laboratório:</label>
            <input
              type="text"
              className="form-control"
              value={formValues.laboratorio}
              onChange={(e) => setFormValues({ ...formValues, laboratorio: e.target.value })}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Fechar</button>
          <button type="button" className="btn btn-primary" onClick={handleSalvarAlteracoes}>Salvar Alterações</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default TabelaAgendamentos;
