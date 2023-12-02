import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';



import AgendamentoTable from './components/agendamentoTabela';
import Menu from './components/menu';
import NotFound from './components/notFound';
import AgendamentoCreate from './components/agendamentoCreate';

const apiUrl = 'https://656a8127dac3630cf7271b7f.mockapi.io/api/v1/Agendamento';

function App() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [agendamentoParaAlterar, setAgendamentoParaAlterar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getAgendamentos() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }

    getAgendamentos();
  }, []);

  const handleAlterar = (agendamento) => {
    setAgendamentoSelecionado(agendamento);
    setShowModal(true);
    console.log('Abrir modal para alterar agendamento:', agendamento);
  };
  
  const handleCloseModal = () => {
    setAgendamentoSelecionado(null);
    setShowModal(false);
  };
  

  const handleExcluir = async (agendamentoId) => {
    try {
      // Realiza a chamada para excluir o agendamento no MockAPI
      await fetch(`${apiUrl}/${agendamentoId}`, { method: 'DELETE' });

      // Atualiza o estado local removendo o agendamento excluído
      const updatedAgendamentos = agendamentos.filter((agendamento) => agendamento.id !== agendamentoId);
      setAgendamentos(updatedAgendamentos);

      console.log('Excluir agendamento com ID:', agendamentoId);
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Menu />}
        >
          <Route
            index
            element={<AgendamentoTable agendamentos={agendamentos} onAlterar={handleAlterar} onExcluir={handleExcluir} />}
          />
          <Route
            path="/Cadastrar"
            element={<AgendamentoCreate url={apiUrl} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* Modal para alterar */}
      {showModal && (
        <AgendamentoCreate
          url={apiUrl}
          agendamentoParaAlterar={agendamentoParaAlterar}
          onCloseModal={handleCloseModal}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
