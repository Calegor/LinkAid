package com.turmadobem.service;

import com.turmadobem.dao.AtendimentoDAO;
import com.turmadobem.dao.PessoaDAO;
import com.turmadobem.dao.TriagemDAO;
import com.turmadobem.entidades.Atendimento;
import com.turmadobem.entidades.Triagem;

import java.sql.SQLException;
import java.util.List;

public class AtendimentoService {
    private final AtendimentoDAO atendimentoDAO = new AtendimentoDAO();
    private final TriagemDAO triagemDAO = new TriagemDAO();
    private final PessoaDAO pessoaDAO = new PessoaDAO();

    public void cadastrarAtendimento(Atendimento atendimento) throws SQLException {
        if (atendimento == null || atendimento.getIdAtendimento() == null) {
            throw new IllegalArgumentException("Atendimento invalido.");
        }
        if (!atendimento.atendimentoValido()) {
            throw new IllegalArgumentException("Os dados obrigatorios do atendimento nao foram preenchidos.");
        }
        Triagem triagem = triagemDAO.readById(atendimento.getIdTriagem());
        if (triagem == null) {
            throw new IllegalArgumentException("Triagem nao encontrada.");
        }
        if (!triagem.podeGerarAtendimento()) {
            throw new IllegalArgumentException("A triagem informada nao pode gerar atendimento.");
        }
        if (pessoaDAO.readById(atendimento.getIdPessoaDentista()) == null) {
            throw new IllegalArgumentException("Pessoa dentista nao encontrada.");
        }
        if (pessoaDAO.readById(atendimento.getIdPessoaBeneficiario()) == null) {
            throw new IllegalArgumentException("Pessoa beneficiaria nao encontrada.");
        }
        atendimentoDAO.create(atendimento);
    }

    public void finalizarAtendimento(int idAtendimento) throws SQLException {
        Atendimento atendimento = atendimentoDAO.readById(idAtendimento);
        if (atendimento == null) {
            throw new IllegalArgumentException("Atendimento nao encontrado.");
        }
        if (!atendimento.finalizarAtendimento()) {
            throw new IllegalStateException("Nao foi possivel finalizar o atendimento.");
        }
        atendimentoDAO.update(atendimento);
    }

    public List<Atendimento> listarAtendimentos() throws SQLException {
        return atendimentoDAO.readAll();
    }
}
