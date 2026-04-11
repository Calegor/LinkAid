package com.turmadobem.service;

import com.turmadobem.dao.PessoaDAO;
import com.turmadobem.entidades.Pessoa;

import java.sql.SQLException;
import java.util.List;

public class PessoaService {
    private final PessoaDAO pessoaDAO = new PessoaDAO();

    public void cadastrarPessoa(Pessoa pessoa) throws SQLException {
        if (pessoa == null || pessoa.getIdPessoa() == null) {
            throw new IllegalArgumentException("Pessoa invalida.");
        }
        if (pessoa.getNmPess() == null || pessoa.getNmPess().isBlank()) {
            throw new IllegalArgumentException("O nome da pessoa e obrigatorio.");
        }
        if (pessoa.getDocuPess() == null || pessoa.getDocuPess().isBlank()) {
            throw new IllegalArgumentException("O documento da pessoa e obrigatorio.");
        }
        if (pessoa.getEmailPess() == null || !pessoa.getEmailPess().contains("@")) {
            throw new IllegalArgumentException("O email da pessoa deve ser valido.");
        }
        pessoaDAO.create(pessoa);
    }

    public List<Pessoa> listarPessoas() throws SQLException {
        return pessoaDAO.readAll();
    }

    public Pessoa buscarPessoaPorId(int id) throws SQLException {
        return pessoaDAO.readById(id);
    }

    public void atualizarPessoa(Pessoa pessoa) throws SQLException {
        if (pessoa == null || pessoa.getIdPessoa() == null) {
            throw new IllegalArgumentException("Pessoa invalida.");
        }
        if (pessoa.getNmPess() == null || pessoa.getNmPess().isBlank()) {
            throw new IllegalArgumentException("O nome da pessoa e obrigatorio.");
        }
        if (pessoa.getDocuPess() == null || pessoa.getDocuPess().isBlank()) {
            throw new IllegalArgumentException("O documento da pessoa e obrigatorio.");
        }
        if (pessoa.getEmailPess() == null || !pessoa.getEmailPess().contains("@")) {
            throw new IllegalArgumentException("O email da pessoa deve ser valido.");
        }
        pessoaDAO.update(pessoa);
    }

    public void removerPessoa(int id) throws SQLException {
        pessoaDAO.delete(id);
    }
}
