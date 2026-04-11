package com.turmadobem.dao;

import com.turmadobem.entidades.Atendimento;
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

public class AtendimentoDAO {
    public void create(Atendimento atendimento) throws SQLException {
        String sql = "INSERT INTO ATENDIMENTO (ID_ATENDIMENTO, ID_TRIAGEM, DESC_ATENDIMENTO, DT_ATENDIMENTO, ID_PESSOA_DENTISTA, ID_PESSOA_BENEFICIARIO, FINALIZADO) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, atendimento.getIdAtendimento());
            stmt.setInt(2, atendimento.getIdTriagem());
            stmt.setString(3, atendimento.getDescAtendimento());
            stmt.setDate(4, Date.valueOf(atendimento.getDtAtendimento()));
            stmt.setInt(5, atendimento.getIdPessoaDentista());
            stmt.setInt(6, atendimento.getIdPessoaBeneficiario());
            stmt.setInt(7, atendimento.isFinalizado() ? 1 : 0);
            stmt.executeUpdate();
        }
    }

    public Atendimento readById(int id) throws SQLException {
        String sql = """
                SELECT A.ID_ATENDIMENTO, A.ID_TRIAGEM, A.DESC_ATENDIMENTO, A.DT_ATENDIMENTO,
                       A.ID_PESSOA_DENTISTA, A.ID_PESSOA_BENEFICIARIO, A.FINALIZADO,
                       T.ID_PESSOA_SOLICITANTE, T.TP_TRIAGEM, T.DT_TRIAGEM, T.DS_GRAVIDADE,
                       PD.ID_PESSOA AS ID_DENTISTA, PD.NM_PESSOA AS NOME_DENTISTA, PD.DOCU_PESSOA AS DOC_DENTISTA,
                       PD.CEP_PESSOA AS CEP_DENTISTA, PD.EMAIL_PESSOA AS EMAIL_DENTISTA,
                       PB.ID_PESSOA AS ID_BENEFICIARIO, PB.NM_PESSOA AS NOME_BENEFICIARIO, PB.DOCU_PESSOA AS DOC_BENEFICIARIO,
                       PB.CEP_PESSOA AS CEP_BENEFICIARIO, PB.EMAIL_PESSOA AS EMAIL_BENEFICIARIO
                FROM ATENDIMENTO A
                JOIN TRIAGEM T ON T.ID_TRIAGEM = A.ID_TRIAGEM
                LEFT JOIN PESSOA PD ON PD.ID_PESSOA = A.ID_PESSOA_DENTISTA
                LEFT JOIN PESSOA PB ON PB.ID_PESSOA = A.ID_PESSOA_BENEFICIARIO
                WHERE A.ID_ATENDIMENTO = ?
                """;
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Atendimento atendimento = new Atendimento(
                            rs.getInt("ID_ATENDIMENTO"),
                            rs.getInt("ID_TRIAGEM"),
                            rs.getString("DESC_ATENDIMENTO"),
                            rs.getDate("DT_ATENDIMENTO").toLocalDate(),
                            rs.getInt("ID_PESSOA_DENTISTA"),
                            rs.getInt("ID_PESSOA_BENEFICIARIO"),
                            rs.getInt("FINALIZADO") == 1
                    );

                    Triagem triagem = new Triagem(
                            rs.getInt("ID_TRIAGEM"),
                            rs.getInt("ID_PESSOA_SOLICITANTE"),
                            rs.getString("TP_TRIAGEM"),
                            rs.getDate("DT_TRIAGEM").toLocalDate(),
                            rs.getString("DS_GRAVIDADE")
                    );
                    atendimento.setTriagem(triagem);

                    int idDentista = rs.getInt("ID_DENTISTA");
                    if (!rs.wasNull()) {
                        Number cepDentista = (Number) rs.getObject("CEP_DENTISTA");
                        atendimento.setPessoaDentista(new Pessoa(
                                idDentista,
                                rs.getString("NOME_DENTISTA"),
                                rs.getString("DOC_DENTISTA"),
                                cepDentista == null ? null : cepDentista.intValue(),
                                rs.getString("EMAIL_DENTISTA")
                        ));
                    }

                    int idBeneficiario = rs.getInt("ID_BENEFICIARIO");
                    if (!rs.wasNull()) {
                        Number cepBeneficiario = (Number) rs.getObject("CEP_BENEFICIARIO");
                        atendimento.setPessoaBeneficiario(new Pessoa(
                                idBeneficiario,
                                rs.getString("NOME_BENEFICIARIO"),
                                rs.getString("DOC_BENEFICIARIO"),
                                cepBeneficiario == null ? null : cepBeneficiario.intValue(),
                                rs.getString("EMAIL_BENEFICIARIO")
                        ));
                    }
                    return atendimento;
                }
            }
        }
        return null;
    }

    public List<Atendimento> readAll() throws SQLException {
        String sql = """
                SELECT A.ID_ATENDIMENTO, A.ID_TRIAGEM, A.DESC_ATENDIMENTO, A.DT_ATENDIMENTO,
                       A.ID_PESSOA_DENTISTA, A.ID_PESSOA_BENEFICIARIO, A.FINALIZADO,
                       T.ID_PESSOA_SOLICITANTE, T.TP_TRIAGEM, T.DT_TRIAGEM, T.DS_GRAVIDADE,
                       PD.ID_PESSOA AS ID_DENTISTA, PD.NM_PESSOA AS NOME_DENTISTA, PD.DOCU_PESSOA AS DOC_DENTISTA,
                       PD.CEP_PESSOA AS CEP_DENTISTA, PD.EMAIL_PESSOA AS EMAIL_DENTISTA,
                       PB.ID_PESSOA AS ID_BENEFICIARIO, PB.NM_PESSOA AS NOME_BENEFICIARIO, PB.DOCU_PESSOA AS DOC_BENEFICIARIO,
                       PB.CEP_PESSOA AS CEP_BENEFICIARIO, PB.EMAIL_PESSOA AS EMAIL_BENEFICIARIO
                FROM ATENDIMENTO A
                JOIN TRIAGEM T ON T.ID_TRIAGEM = A.ID_TRIAGEM
                LEFT JOIN PESSOA PD ON PD.ID_PESSOA = A.ID_PESSOA_DENTISTA
                LEFT JOIN PESSOA PB ON PB.ID_PESSOA = A.ID_PESSOA_BENEFICIARIO
                ORDER BY A.ID_ATENDIMENTO
                """;
        List<Atendimento> atendimentos = new ArrayList<>();
        try (Connection connection = ConexaoBD.conectar();
             PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Atendimento atendimento = new Atendimento(
                        rs.getInt("ID_ATENDIMENTO"),
                        rs.getInt("ID_TRIAGEM"),
                        rs.getString("DESC_ATENDIMENTO"),
                        rs.getDate("DT_ATENDIMENTO").toLocalDate(),
                        rs.getInt("ID_PESSOA_DENTISTA"),
                        rs.getInt("ID_PESSOA_BENEFICIARIO"),
                        rs.getInt("FINALIZADO") == 1
                );

                Triagem triagem = new Triagem(
                        rs.getInt("ID_TRIAGEM"),
                        rs.getInt("ID_PESSOA_SOLICITANTE"),
                        rs.getString("TP_TRIAGEM"),
                        rs.getDate("DT_TRIAGEM").toLocalDate(),
                        rs.getString("DS_GRAVIDADE")
                );
                atendimento.setTriagem(triagem);

                int idDentista = rs.getInt("ID_DENTISTA");
                if (!rs.wasNull()) {
                    Number cepDentista = (Number) rs.getObject("CEP_DENTISTA");
                    atendimento.setPessoaDentista(new Pessoa(
                            idDentista,
                            rs.getString("NOME_DENTISTA"),
                            rs.getString("DOC_DENTISTA"),
                            cepDentista == null ? null : cepDentista.intValue(),
                            rs.getString("EMAIL_DENTISTA")
                    ));
                }

                int idBeneficiario = rs.getInt("ID_BENEFICIARIO");
                if (!rs.wasNull()) {
                    Number cepBeneficiario = (Number) rs.getObject("CEP_BENEFICIARIO");
                    atendimento.setPessoaBeneficiario(new Pessoa(
                            idBeneficiario,
                            rs.getString("NOME_BENEFICIARIO"),
                            rs.getString("DOC_BENEFICIARIO"),
                            cepBeneficiario == null ? null : cepBeneficiario.intValue(),
                            rs.getString("EMAIL_BENEFICIARIO")
                    ));
                }
                atendimentos.add(atendimento);
            }
        }
        return atendimentos;
    }

    public void update(Atendimento atendimento) throws SQLException {
        String sql = "UPDATE ATENDIMENTO SET ID_TRIAGEM = ?, DESC_ATENDIMENTO = ?, DT_ATENDIMENTO = ?, ID_PESSOA_DENTISTA = ?, ID_PESSOA_BENEFICIARIO = ?, FINALIZADO = ? WHERE ID_ATENDIMENTO = ?";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, atendimento.getIdTriagem());
            stmt.setString(2, atendimento.getDescAtendimento());
            stmt.setDate(3, Date.valueOf(atendimento.getDtAtendimento()));
            stmt.setInt(4, atendimento.getIdPessoaDentista());
            stmt.setInt(5, atendimento.getIdPessoaBeneficiario());
            stmt.setInt(6, atendimento.isFinalizado() ? 1 : 0);
            stmt.setInt(7, atendimento.getIdAtendimento());
            if (stmt.executeUpdate() == 0) {
                throw new SQLException("Atendimento nao encontrado para atualizacao.");
            }
        }
    }

    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM ATENDIMENTO WHERE ID_ATENDIMENTO = ?";
        try (Connection connection = ConexaoBD.conectar(); PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            if (stmt.executeUpdate() == 0) {
                throw new SQLException("Atendimento nao encontrado para remocao.");
            }
        }
    }
}
