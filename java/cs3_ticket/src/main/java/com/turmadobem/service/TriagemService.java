package com.turmadobem.service;

import com.turmadobem.dao.PessoaDAO;
import com.turmadobem.dao.TriagemDAO;
import com.turmadobem.entidades.Triagem;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

public class TriagemService {
    private final TriagemDAO triagemDAO = new TriagemDAO();
    private final PessoaDAO pessoaDAO = new PessoaDAO();

    public void cadastrarTriagem(Triagem triagem) throws SQLException {
        if (triagem == null || triagem.getIdTriagem() == null) {
            throw new IllegalArgumentException("Triagem invalida.");
        }
        if (triagem.getDtTriagem() == null || triagem.getDtTriagem().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("A data da triagem nao pode estar no futuro.");
        }
        if (triagem.getIdPessoaSolicitante() == null || pessoaDAO.readById(triagem.getIdPessoaSolicitante()) == null) {
            throw new IllegalArgumentException("Pessoa solicitante nao encontrada.");
        }
        if (triagem.getTpTriagem() == null || triagem.getTpTriagem().isBlank()) {
            throw new IllegalArgumentException("O tipo da triagem e obrigatorio.");
        }
        if (triagem.getDsGravidade() == null || triagem.getDsGravidade().isBlank()) {
            throw new IllegalArgumentException("A gravidade da triagem e obrigatoria.");
        }
        triagemDAO.create(triagem);
    }

    public List<Triagem> listarTriagens() throws SQLException {
        return triagemDAO.readAll();
    }

    public void removerTriagem(int id) throws SQLException {
        triagemDAO.delete(id);
    }
}
