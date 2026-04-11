package com.turmadobem.service;

import com.turmadobem.dao.PessoaDAO;
import com.turmadobem.entidades.Beneficiario;
import com.turmadobem.entidades.Pessoa;
import com.turmadobem.entidades.ProgramaSocial;
import com.turmadobem.support.ConexaoBD;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BeneficiarioService {
    private final PessoaDAO pessoaDAO = new PessoaDAO();

    public void cadastrarBeneficiario(Beneficiario beneficiario) throws SQLException {
        if (beneficiario == null || beneficiario.getIdPessoa() == null) {
            throw new IllegalArgumentException("Beneficiario invalido.");
        }
        if (beneficiario.getNmPess() == null || beneficiario.getNmPess().isBlank()) {
            throw new IllegalArgumentException("O nome do beneficiario e obrigatorio.");
        }
        if (!verificarElegibilidade(beneficiario)) {
            throw new IllegalArgumentException("Beneficiario fora dos criterios de elegibilidade.");
        }

        Pessoa pessoa = new Pessoa(
                beneficiario.getIdPessoa(),
                beneficiario.getNmPess(),
                beneficiario.getDocuPess(),
                beneficiario.getCepPess(),
                beneficiario.getEmailPess()
        );

        if (pessoaDAO.readById(beneficiario.getIdPessoa()) == null) {
            pessoaDAO.create(pessoa);
        } else {
            pessoaDAO.update(pessoa);
        }

        String sql = "INSERT INTO BENEFICIARIO (ID_PESSOA, DT_NASCIMENTO, ID_PROGRAMA_SOCIAL) VALUES (?, ?, ?)";
        try (Connection connection = ConexaoBD.conectar();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, beneficiario.getIdPessoa());
            stmt.setDate(2, Date.valueOf(beneficiario.getDtNascimento()));
            stmt.setInt(3, beneficiario.getIdProgramaSocial());
            stmt.executeUpdate();
        }
    }

    public List<Beneficiario> listarBeneficiarios() throws SQLException {
        String sql = """
                SELECT P.ID_PESSOA, P.NM_PESSOA, P.DOCU_PESSOA, P.CEP_PESSOA, P.EMAIL_PESSOA,
                       B.DT_NASCIMENTO, B.ID_PROGRAMA_SOCIAL, PS.NM_PROGRAMA_SOCIAL
                FROM BENEFICIARIO B
                JOIN PESSOA P ON P.ID_PESSOA = B.ID_PESSOA
                LEFT JOIN PROGRAMA_SOCIAL PS ON PS.ID_PROGRAMA_SOCIAL = B.ID_PROGRAMA_SOCIAL
                ORDER BY B.ID_PESSOA
                """;
        List<Beneficiario> beneficiarios = new ArrayList<>();
        try (Connection connection = ConexaoBD.conectar();
             PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Number cep = (Number) rs.getObject("CEP_PESSOA");
                Beneficiario beneficiario = new Beneficiario(
                        rs.getInt("ID_PESSOA"),
                        rs.getString("NM_PESSOA"),
                        rs.getString("DOCU_PESSOA"),
                        cep == null ? null : cep.intValue(),
                        rs.getString("EMAIL_PESSOA"),
                        rs.getDate("DT_NASCIMENTO").toLocalDate(),
                        rs.getInt("ID_PROGRAMA_SOCIAL")
                );
                beneficiario.setProgramaSocial(new ProgramaSocial(
                        rs.getInt("ID_PROGRAMA_SOCIAL"),
                        rs.getString("NM_PROGRAMA_SOCIAL")
                ));
                beneficiarios.add(beneficiario);
            }
        }
        return beneficiarios;
    }

    public boolean verificarElegibilidade(Beneficiario beneficiario) throws SQLException {
        if (beneficiario == null || beneficiario.getDtNascimento() == null || beneficiario.getIdProgramaSocial() == null) {
            return false;
        }
        int idade = beneficiario.getIdade();
        String sql = "SELECT COUNT(1) FROM PROGRAMA_SOCIAL WHERE ID_PROGRAMA_SOCIAL = ?";
        try (Connection connection = ConexaoBD.conectar();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, beneficiario.getIdProgramaSocial());
            try (ResultSet rs = stmt.executeQuery()) {
                return idade >= 6 && idade <= 18 && rs.next() && rs.getInt(1) > 0;
            }
        }
    }
}
