package com.turmadobem.service;

import com.turmadobem.dao.PessoaDAO;
import com.turmadobem.entidades.Doador;
import com.turmadobem.entidades.Pessoa;
import com.turmadobem.support.ConexaoBD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class DoadorService {
    private final PessoaDAO pessoaDAO = new PessoaDAO();

    public void registrarNovaDoacao(int idPessoa, double valor) throws SQLException {
        Pessoa pessoa = pessoaDAO.readById(idPessoa);
        if (pessoa == null) {
            throw new IllegalArgumentException("Doador nao encontrado.");
        }
        if (valor <= 0) {
            throw new IllegalArgumentException("Valor de doacao invalido.");
        }

        double totalDoado = 0.0;
        String sqlBusca = """
                SELECT TOTAL_DOADO
                FROM DOADOR
                WHERE ID_PESSOA = ?
                """;
        try (Connection connection = ConexaoBD.conectar();
             PreparedStatement stmt = connection.prepareStatement(sqlBusca)) {
            stmt.setInt(1, idPessoa);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    totalDoado = rs.getDouble("TOTAL_DOADO");
                } else {
                    try (PreparedStatement insertStmt = connection.prepareStatement(
                            "INSERT INTO DOADOR (ID_PESSOA, TOTAL_DOADO) VALUES (?, 0)")) {
                        insertStmt.setInt(1, idPessoa);
                        insertStmt.executeUpdate();
                    }
                }
            }
        }

        Doador doador = new Doador(
                pessoa.getIdPessoa(),
                pessoa.getNmPess(),
                pessoa.getDocuPess(),
                pessoa.getCepPess(),
                pessoa.getEmailPess(),
                totalDoado
        );
        doador.registrarDoacao(valor);

        try (Connection connection = ConexaoBD.conectar();
             PreparedStatement stmt = connection.prepareStatement(
                     "UPDATE DOADOR SET TOTAL_DOADO = ? WHERE ID_PESSOA = ?")) {
            stmt.setDouble(1, doador.getTotalDoado());
            stmt.setInt(2, idPessoa);
            stmt.executeUpdate();
        }
    }

    public List<Doador> listarDoadores() throws SQLException {
        String sql = """
                SELECT P.ID_PESSOA, P.NM_PESSOA, P.DOCU_PESSOA, P.CEP_PESSOA, P.EMAIL_PESSOA, D.TOTAL_DOADO
                FROM DOADOR D
                JOIN PESSOA P ON P.ID_PESSOA = D.ID_PESSOA
                ORDER BY P.ID_PESSOA
                """;
        List<Doador> doadores = new ArrayList<>();
        try (Connection connection = ConexaoBD.conectar();
             PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Number cep = (Number) rs.getObject("CEP_PESSOA");
                doadores.add(new Doador(
                        rs.getInt("ID_PESSOA"),
                        rs.getString("NM_PESSOA"),
                        rs.getString("DOCU_PESSOA"),
                        cep == null ? null : cep.intValue(),
                        rs.getString("EMAIL_PESSOA"),
                        rs.getDouble("TOTAL_DOADO")
                ));
            }
        }
        return doadores;
    }

    public List<Doador> classificarDoadores() throws SQLException {
        List<Doador> doadores = new ArrayList<>(listarDoadores());
        doadores.sort(Comparator.comparingDouble(Doador::getTotalDoado).reversed());
        return doadores;
    }
}
