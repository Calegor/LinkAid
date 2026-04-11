package com.turmadobem.dao;

import com.turmadobem.entidades.Pessoa;
import com.turmadobem.entidades.Triagem;
import com.turmadobem.support.ConexaoBD;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TriagemDAO {
    public void create(Triagem triagem) throws SQLException {
        String sql = "INSERT INTO TRIAGEM (ID_TRIAGEM, ID_PESSOA_SOLICITANTE, TP_TRIAGEM, DT_TRIAGEM, DS_GRAVIDADE) VALUES (?, ?, ?, ?, ?)";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, triagem.getIdTriagem());
            stmt.setInt(2, triagem.getIdPessoaSolicitante());
            stmt.setString(3, triagem.getTpTriagem());
            stmt.setDate(4, Date.valueOf(triagem.getDtTriagem()));
            stmt.setString(5, triagem.getDsGravidade());
            stmt.executeUpdate();
        }
    }

    public Triagem readById(int id) throws SQLException {
        String sql = """
                SELECT T.ID_TRIAGEM, T.ID_PESSOA_SOLICITANTE, T.TP_TRIAGEM, T.DT_TRIAGEM, T.DS_GRAVIDADE,
                       P.ID_PESSOA, P.NM_PESSOA, P.DOCU_PESSOA, P.CEP_PESSOA, P.EMAIL_PESSOA
                FROM TRIAGEM T
                LEFT JOIN PESSOA P ON P.ID_PESSOA = T.ID_PESSOA_SOLICITANTE
                WHERE T.ID_TRIAGEM = ?
                """;
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Triagem triagem = new Triagem(
                            rs.getInt("ID_TRIAGEM"),
                            rs.getInt("ID_PESSOA_SOLICITANTE"),
                            rs.getString("TP_TRIAGEM"),
                            rs.getDate("DT_TRIAGEM").toLocalDate(),
                            rs.getString("DS_GRAVIDADE")
                    );

                    int idPessoa = rs.getInt("ID_PESSOA");
                    if (!rs.wasNull()) {
                        Number cep = (Number) rs.getObject("CEP_PESSOA");
                        triagem.setPessoaSolicitante(new Pessoa(
                                idPessoa,
                                rs.getString("NM_PESSOA"),
                                rs.getString("DOCU_PESSOA"),
                                cep == null ? null : cep.intValue(),
                                rs.getString("EMAIL_PESSOA")
                        ));
                    }
                    return triagem;
                }
            }
        }
        return null;
    }

    public List<Triagem> readAll() throws SQLException {
        String sql = """
                SELECT T.ID_TRIAGEM, T.ID_PESSOA_SOLICITANTE, T.TP_TRIAGEM, T.DT_TRIAGEM, T.DS_GRAVIDADE,
                       P.ID_PESSOA, P.NM_PESSOA, P.DOCU_PESSOA, P.CEP_PESSOA, P.EMAIL_PESSOA
                FROM TRIAGEM T
                LEFT JOIN PESSOA P ON P.ID_PESSOA = T.ID_PESSOA_SOLICITANTE
                ORDER BY T.ID_TRIAGEM
                """;
        List<Triagem> triagens = new ArrayList<>();
        try (Connection connection = ConexaoBD.conectar();
             PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Triagem triagem = new Triagem(
                        rs.getInt("ID_TRIAGEM"),
                        rs.getInt("ID_PESSOA_SOLICITANTE"),
                        rs.getString("TP_TRIAGEM"),
                        rs.getDate("DT_TRIAGEM").toLocalDate(),
                        rs.getString("DS_GRAVIDADE")
                );

                int idPessoa = rs.getInt("ID_PESSOA");
                if (!rs.wasNull()) {
                    Number cep = (Number) rs.getObject("CEP_PESSOA");
                    triagem.setPessoaSolicitante(new Pessoa(
                            idPessoa,
                            rs.getString("NM_PESSOA"),
                            rs.getString("DOCU_PESSOA"),
                            cep == null ? null : cep.intValue(),
                            rs.getString("EMAIL_PESSOA")
                    ));
                }
                triagens.add(triagem);
            }
        }
        return triagens;
    }

    public void update(Triagem triagem) throws SQLException {
        String sql = "UPDATE TRIAGEM SET ID_PESSOA_SOLICITANTE = ?, TP_TRIAGEM = ?, DT_TRIAGEM = ?, DS_GRAVIDADE = ? WHERE ID_TRIAGEM = ?";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, triagem.getIdPessoaSolicitante());
            stmt.setString(2, triagem.getTpTriagem());
            stmt.setDate(3, Date.valueOf(triagem.getDtTriagem()));
            stmt.setString(4, triagem.getDsGravidade());
            stmt.setInt(5, triagem.getIdTriagem());
            if (stmt.executeUpdate() == 0) {
                throw new SQLException("Triagem nao encontrada para atualizacao.");
            }
        }
    }

    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM TRIAGEM WHERE ID_TRIAGEM = ?";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            if (stmt.executeUpdate() == 0) {
                throw new SQLException("Triagem nao encontrada para remocao.");
            }
        }
    }
}
