package com.turmadobem.dao;

import com.turmadobem.entidades.Pessoa;
import com.turmadobem.support.ConexaoBD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PessoaDAO {
    public void create(Pessoa pessoa) throws SQLException {
        String sql = "INSERT INTO PESSOA (ID_PESSOA, NM_PESSOA, DOCU_PESSOA, CEP_PESSOA, EMAIL_PESSOA) VALUES (?, ?, ?, ?, ?)";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, pessoa.getIdPessoa());
            stmt.setString(2, pessoa.getNmPess());
            stmt.setString(3, pessoa.getDocuPess());
            if (pessoa.getCepPess() != null) {
                stmt.setInt(4, pessoa.getCepPess());
            } else {
                stmt.setNull(4, java.sql.Types.INTEGER);
            }
            stmt.setString(5, pessoa.getEmailPess());
            stmt.executeUpdate();
        }
    }

    public Pessoa readById(int id) throws SQLException {
        String sql = "SELECT ID_PESSOA, NM_PESSOA, DOCU_PESSOA, CEP_PESSOA, EMAIL_PESSOA FROM PESSOA WHERE ID_PESSOA = ?";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Number cep = (Number) rs.getObject("CEP_PESSOA");
                    return new Pessoa(
                            rs.getInt("ID_PESSOA"),
                            rs.getString("NM_PESSOA"),
                            rs.getString("DOCU_PESSOA"),
                            cep == null ? null : cep.intValue(),
                            rs.getString("EMAIL_PESSOA")
                    );
                }
            }
        }
        return null;
    }

    public List<Pessoa> readAll() throws SQLException {
        String sql = "SELECT ID_PESSOA, NM_PESSOA, DOCU_PESSOA, CEP_PESSOA, EMAIL_PESSOA FROM PESSOA ORDER BY ID_PESSOA";
        List<Pessoa> pessoas = new ArrayList<>();
        try (Connection connection = ConexaoBD.conectar();
             PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Number cep = (Number) rs.getObject("CEP_PESSOA");
                pessoas.add(new Pessoa(
                        rs.getInt("ID_PESSOA"),
                        rs.getString("NM_PESSOA"),
                        rs.getString("DOCU_PESSOA"),
                        cep == null ? null : cep.intValue(),
                        rs.getString("EMAIL_PESSOA")
                ));
            }
        }
        return pessoas;
    }

    public void update(Pessoa pessoa) throws SQLException {
        String sql = "UPDATE PESSOA SET NM_PESSOA = ?, DOCU_PESSOA = ?, CEP_PESSOA = ?, EMAIL_PESSOA = ? WHERE ID_PESSOA = ?";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, pessoa.getNmPess());
            stmt.setString(2, pessoa.getDocuPess());
            if (pessoa.getCepPess() != null) {
                stmt.setInt(3, pessoa.getCepPess());
            } else {
                stmt.setNull(3, java.sql.Types.INTEGER);
            }
            stmt.setString(4, pessoa.getEmailPess());
            stmt.setInt(5, pessoa.getIdPessoa());
            if (stmt.executeUpdate() == 0) {
                throw new SQLException("Pessoa nao encontrada para atualizacao.");
            }
        }
    }

    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM PESSOA WHERE ID_PESSOA = ?";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            if (stmt.executeUpdate() == 0) {
                throw new SQLException("Pessoa nao encontrada para remocao.");
            }
        }
    }
}
