package com.turmadobem;

import com.turmadobem.entidades.Atendimento;
import com.turmadobem.entidades.Beneficiario;
import com.turmadobem.entidades.Doador;
import com.turmadobem.entidades.Pessoa;
import com.turmadobem.entidades.Triagem;
import com.turmadobem.service.AtendimentoService;
import com.turmadobem.service.BeneficiarioService;
import com.turmadobem.service.DoadorService;
import com.turmadobem.service.PessoaService;
import com.turmadobem.service.TriagemService;
import com.turmadobem.support.ConexaoBD;
import com.turmadobem.support.Menus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;

public class MainTeste {
    private static PessoaService pessoaService;
    private static DoadorService doadorService;
    private static TriagemService triagemService;
    private static AtendimentoService atendimentoService;
    private static BeneficiarioService beneficiarioService;

    public static void main(String[] args) {
        inicializarBanco();

        pessoaService = new PessoaService();
        doadorService = new DoadorService();
        triagemService = new TriagemService();
        atendimentoService = new AtendimentoService();
        beneficiarioService = new BeneficiarioService();

        exibirMenuPrincipal(new Scanner(System.in));
    }

    private static void inicializarBanco() {
        try (Connection connection = ConexaoBD.conectar()) {
            if (!tabelaExiste(connection, "PESSOA")) {
                executar(connection, "CREATE TABLE PESSOA (" +
                        "ID_PESSOA NUMBER(10) PRIMARY KEY, " +
                        "NM_PESSOA VARCHAR2(120) NOT NULL, " +
                        "DOCU_PESSOA VARCHAR2(30) NOT NULL, " +
                        "CEP_PESSOA NUMBER(8), " +
                        "EMAIL_PESSOA VARCHAR2(120) NOT NULL)");
            }
            if (!tabelaExiste(connection, "PROGRAMA_SOCIAL")) {
                executar(connection, "CREATE TABLE PROGRAMA_SOCIAL (" +
                        "ID_PROGRAMA_SOCIAL NUMBER(10) PRIMARY KEY, " +
                        "NM_PROGRAMA_SOCIAL VARCHAR2(120) NOT NULL)");
            }
            garantirEstruturaProgramaSocial(connection);
            if (!tabelaExiste(connection, "DOADOR")) {
                executar(connection, "CREATE TABLE DOADOR (" +
                        "ID_PESSOA NUMBER(10) PRIMARY KEY, " +
                        "TOTAL_DOADO NUMBER(12,2) DEFAULT 0 NOT NULL, " +
                        "CONSTRAINT FK_DOADOR_PESSOA FOREIGN KEY (ID_PESSOA) REFERENCES PESSOA(ID_PESSOA))");
            }
            if (!tabelaExiste(connection, "DENTISTA")) {
                executar(connection, "CREATE TABLE DENTISTA (" +
                        "ID_PESSOA NUMBER(10) PRIMARY KEY, " +
                        "NR_CRO VARCHAR2(20) NOT NULL, " +
                        "ESPECIALIZACAO_DENT VARCHAR2(120), " +
                        "CONSTRAINT FK_DENTISTA_PESSOA FOREIGN KEY (ID_PESSOA) REFERENCES PESSOA(ID_PESSOA))");
            }
            if (!tabelaExiste(connection, "SOLICITANTE")) {
                executar(connection, "CREATE TABLE SOLICITANTE (" +
                        "ID_PESSOA NUMBER(10) PRIMARY KEY, " +
                        "CONSTRAINT FK_SOLICITANTE_PESSOA FOREIGN KEY (ID_PESSOA) REFERENCES PESSOA(ID_PESSOA))");
            }
            if (!tabelaExiste(connection, "BENEFICIARIO")) {
                executar(connection, "CREATE TABLE BENEFICIARIO (" +
                        "ID_PESSOA NUMBER(10) PRIMARY KEY, " +
                        "DT_NASCIMENTO DATE NOT NULL, " +
                        "ID_PROGRAMA_SOCIAL NUMBER(10) NOT NULL, " +
                        "CONSTRAINT FK_BENEFICIARIO_PESSOA FOREIGN KEY (ID_PESSOA) REFERENCES PESSOA(ID_PESSOA), " +
                        "CONSTRAINT FK_BENEFICIARIO_PROGRAMA FOREIGN KEY (ID_PROGRAMA_SOCIAL) REFERENCES PROGRAMA_SOCIAL(ID_PROGRAMA_SOCIAL))");
            }
            if (!tabelaExiste(connection, "TRIAGEM")) {
                executar(connection, "CREATE TABLE TRIAGEM (" +
                        "ID_TRIAGEM NUMBER(10) PRIMARY KEY, " +
                        "ID_PESSOA_SOLICITANTE NUMBER(10) NOT NULL, " +
                        "TP_TRIAGEM VARCHAR2(100) NOT NULL, " +
                        "DT_TRIAGEM DATE NOT NULL, " +
                        "DS_GRAVIDADE VARCHAR2(60) NOT NULL, " +
                        "CONSTRAINT FK_TRIAGEM_PESSOA FOREIGN KEY (ID_PESSOA_SOLICITANTE) REFERENCES PESSOA(ID_PESSOA))");
            }
            if (!tabelaExiste(connection, "ATENDIMENTO")) {
                executar(connection, "CREATE TABLE ATENDIMENTO (" +
                        "ID_ATENDIMENTO NUMBER(10) PRIMARY KEY, " +
                        "ID_TRIAGEM NUMBER(10) NOT NULL, " +
                        "DESC_ATENDIMENTO VARCHAR2(300) NOT NULL, " +
                        "DT_ATENDIMENTO DATE NOT NULL, " +
                        "ID_PESSOA_DENTISTA NUMBER(10) NOT NULL, " +
                        "ID_PESSOA_BENEFICIARIO NUMBER(10) NOT NULL, " +
                        "FINALIZADO NUMBER(1) DEFAULT 0 NOT NULL, " +
                        "CONSTRAINT FK_ATENDIMENTO_TRIAGEM FOREIGN KEY (ID_TRIAGEM) REFERENCES TRIAGEM(ID_TRIAGEM), " +
                        "CONSTRAINT FK_ATENDIMENTO_DENTISTA FOREIGN KEY (ID_PESSOA_DENTISTA) REFERENCES PESSOA(ID_PESSOA), " +
                        "CONSTRAINT FK_ATENDIMENTO_BENEF FOREIGN KEY (ID_PESSOA_BENEFICIARIO) REFERENCES PESSOA(ID_PESSOA))");
            }
            popularProgramasSociais(connection);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao inicializar o banco: " + e.getMessage(), e);
        }
    }

    private static boolean tabelaExiste(Connection connection, String nomeTabela) throws SQLException {
        String sql = "SELECT COUNT(*) FROM USER_TABLES WHERE TABLE_NAME = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, nomeTabela.toUpperCase());
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next() && rs.getInt(1) > 0;
            }
        }
    }

    private static boolean colunaExiste(Connection connection, String nomeTabela, String nomeColuna) throws SQLException {
        String sql = """
                SELECT COUNT(*)
                FROM USER_TAB_COLUMNS
                WHERE TABLE_NAME = ? AND COLUMN_NAME = ?
                """;
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, nomeTabela.toUpperCase());
            stmt.setString(2, nomeColuna.toUpperCase());
            try (ResultSet rs = stmt.executeQuery()) {
                return rs.next() && rs.getInt(1) > 0;
            }
        }
    }

    private static void garantirEstruturaProgramaSocial(Connection connection) throws SQLException {
        if (colunaExiste(connection, "PROGRAMA_SOCIAL", "NM_PROGRAMA_SOCIAL")) {
            return;
        }
        if (colunaExiste(connection, "PROGRAMA_SOCIAL", "NM_PROGRAMA")) {
            executar(connection, "ALTER TABLE PROGRAMA_SOCIAL RENAME COLUMN NM_PROGRAMA TO NM_PROGRAMA_SOCIAL");
            return;
        }
        if (colunaExiste(connection, "PROGRAMA_SOCIAL", "NOME_PROGRAMA_SOCIAL")) {
            executar(connection, "ALTER TABLE PROGRAMA_SOCIAL RENAME COLUMN NOME_PROGRAMA_SOCIAL TO NM_PROGRAMA_SOCIAL");
            return;
        }
        if (colunaExiste(connection, "PROGRAMA_SOCIAL", "NOME_PROGRAMA")) {
            executar(connection, "ALTER TABLE PROGRAMA_SOCIAL RENAME COLUMN NOME_PROGRAMA TO NM_PROGRAMA_SOCIAL");
            return;
        }
        executar(connection, "ALTER TABLE PROGRAMA_SOCIAL ADD NM_PROGRAMA_SOCIAL VARCHAR2(120)");
    }

    private static void popularProgramasSociais(Connection connection) throws SQLException {
        String sqlCount = "SELECT COUNT(*) FROM PROGRAMA_SOCIAL";
        try (PreparedStatement stmt = connection.prepareStatement(sqlCount);
             ResultSet rs = stmt.executeQuery()) {
            if (rs.next() && rs.getInt(1) == 0) {
                inserirProgramaSocial(connection, 1, "Sorriso para Todos");
                inserirProgramaSocial(connection, 2, "Atendimento Preventivo");
                inserirProgramaSocial(connection, 3, "Acompanhamento Social");
            }
        }
    }

    private static void inserirProgramaSocial(Connection connection, int id, String nome) throws SQLException {
        String sql = "INSERT INTO PROGRAMA_SOCIAL (ID_PROGRAMA_SOCIAL, NM_PROGRAMA_SOCIAL) VALUES (?, ?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.setString(2, nome);
            stmt.executeUpdate();
        }
    }

    private static void executar(Connection connection, String sql) throws SQLException {
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.execute();
        }
    }

    private static void exibirMenuPrincipal(Scanner scanner) {
        while (true) {
            System.out.print(Menus.MENU_PRINCIPAL);
            switch (lerOpcao(scanner)) {
                case 1 -> exibirMenuPessoas(scanner);
                case 2 -> exibirMenuDoadores(scanner);
                case 3 -> exibirMenuTriagens(scanner);
                case 4 -> exibirMenuAtendimentos(scanner);
                case 5 -> exibirMenuBeneficiarios(scanner);
                case 0 -> {
                    System.out.println("Encerrando o sistema...");
                    return;
                }
                default -> System.out.println("Opcao invalida.");
            }
        }
    }

    private static void exibirMenuPessoas(Scanner scanner) {
        while (true) {
            System.out.print(Menus.MENU_PESSOA);
            switch (lerOpcao(scanner)) {
                case 1 -> listarPessoas();
                case 2 -> cadastrarPessoa(scanner);
                case 3 -> buscarPessoa(scanner);
                case 4 -> atualizarPessoa(scanner);
                case 5 -> removerPessoa(scanner);
                case 0 -> {
                    return;
                }
                default -> System.out.println("Opcao invalida.");
            }
        }
    }

    private static void exibirMenuDoadores(Scanner scanner) {
        while (true) {
            System.out.print(Menus.MENU_DOADOR);
            switch (lerOpcao(scanner)) {
                case 1 -> listarDoadores();
                case 2 -> registrarNovaDoacao(scanner);
                case 3 -> classificarDoadores();
                case 0 -> {
                    return;
                }
                default -> System.out.println("Opcao invalida.");
            }
        }
    }

    private static void exibirMenuTriagens(Scanner scanner) {
        while (true) {
            System.out.print(Menus.MENU_TRIAGEM);
            switch (lerOpcao(scanner)) {
                case 1 -> listarTriagens();
                case 2 -> cadastrarTriagem(scanner);
                case 3 -> removerTriagem(scanner);
                case 0 -> {
                    return;
                }
                default -> System.out.println("Opcao invalida.");
            }
        }
    }

    private static void exibirMenuAtendimentos(Scanner scanner) {
        while (true) {
            System.out.print(Menus.MENU_ATENDIMENTO);
            switch (lerOpcao(scanner)) {
                case 1 -> listarAtendimentos();
                case 2 -> cadastrarAtendimento(scanner);
                case 3 -> finalizarAtendimento(scanner);
                case 0 -> {
                    return;
                }
                default -> System.out.println("Opcao invalida.");
            }
        }
    }

    private static void exibirMenuBeneficiarios(Scanner scanner) {
        while (true) {
            System.out.print(Menus.MENU_BENEFICIARIO);
            switch (lerOpcao(scanner)) {
                case 1 -> listarBeneficiarios();
                case 2 -> cadastrarBeneficiario(scanner);
                case 3 -> verificarElegibilidade(scanner);
                case 0 -> {
                    return;
                }
                default -> System.out.println("Opcao invalida.");
            }
        }
    }

    private static int lerOpcao(Scanner scanner) {
        try {
            return Integer.parseInt(scanner.nextLine());
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    private static void listarPessoas() {
        try {
            List<Pessoa> pessoas = pessoaService.listarPessoas();
            if (pessoas.isEmpty()) {
                System.out.println("Nenhuma pessoa encontrada.");
                return;
            }
            for (Pessoa pessoa : pessoas) {
                System.out.println("ID: " + pessoa.getIdPessoa() +
                        " | Nome: " + pessoa.getNmPess() +
                        " | Documento: " + pessoa.getDocuPess() +
                        " | Email: " + pessoa.getEmailPess());
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar pessoas: " + e.getMessage());
        }
    }

    private static void cadastrarPessoa(Scanner scanner) {
        try {
            pessoaService.cadastrarPessoa(lerPessoa(scanner));
            System.out.println("Pessoa cadastrada com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao cadastrar pessoa: " + e.getMessage());
        }
    }

    private static void buscarPessoa(Scanner scanner) {
        try {
            System.out.print("ID da Pessoa: ");
            Pessoa pessoa = pessoaService.buscarPessoaPorId(Integer.parseInt(scanner.nextLine()));
            System.out.println(pessoa == null ? "Pessoa nao encontrada." : pessoa);
        } catch (Exception e) {
            System.out.println("Erro ao buscar pessoa: " + e.getMessage());
        }
    }

    private static void atualizarPessoa(Scanner scanner) {
        try {
            pessoaService.atualizarPessoa(lerPessoa(scanner));
            System.out.println("Pessoa atualizada com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao atualizar pessoa: " + e.getMessage());
        }
    }

    private static void removerPessoa(Scanner scanner) {
        try {
            System.out.print("ID da Pessoa a remover: ");
            pessoaService.removerPessoa(Integer.parseInt(scanner.nextLine()));
            System.out.println("Pessoa removida com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao remover pessoa: " + e.getMessage());
        }
    }

    private static void listarDoadores() {
        try {
            List<Doador> doadores = doadorService.listarDoadores();
            if (doadores.isEmpty()) {
                System.out.println("Nenhum doador encontrado.");
                return;
            }
            for (Doador doador : doadores) {
                System.out.println("ID: " + doador.getIdPessoa() +
                        " | Nome: " + doador.getNmPess() +
                        " | Total doado: " + doador.getTotalDoado());
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar doadores: " + e.getMessage());
        }
    }

    private static void registrarNovaDoacao(Scanner scanner) {
        try {
            System.out.print("ID da Pessoa Doadora: ");
            int idPessoa = Integer.parseInt(scanner.nextLine());
            System.out.print("Valor da doacao: ");
            double valor = Double.parseDouble(scanner.nextLine());
            doadorService.registrarNovaDoacao(idPessoa, valor);
            System.out.println("Doacao registrada com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao registrar doacao: " + e.getMessage());
        }
    }

    private static void classificarDoadores() {
        try {
            List<Doador> doadores = doadorService.classificarDoadores();
            if (doadores.isEmpty()) {
                System.out.println("Nenhum doador encontrado.");
                return;
            }
            for (Doador doador : doadores) {
                System.out.println("ID: " + doador.getIdPessoa() +
                        " | Nome: " + doador.getNmPess() +
                        " | Perfil: " + doador.classificarPerfilDoador() +
                        " | Total: " + doador.getTotalDoado());
            }
        } catch (SQLException e) {
            System.out.println("Erro ao classificar doadores: " + e.getMessage());
        }
    }

    private static void listarTriagens() {
        try {
            List<Triagem> triagens = triagemService.listarTriagens();
            if (triagens.isEmpty()) {
                System.out.println("Nenhuma triagem encontrada.");
                return;
            }
            for (Triagem triagem : triagens) {
                System.out.println("ID: " + triagem.getIdTriagem() +
                        " | Pessoa solicitante: " + triagem.getIdPessoaSolicitante() +
                        " | Tipo: " + triagem.getTpTriagem() +
                        " | Gravidade: " + triagem.getDsGravidade());
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar triagens: " + e.getMessage());
        }
    }

    private static void cadastrarTriagem(Scanner scanner) {
        try {
            System.out.print("ID da Triagem: ");
            int idTriagem = Integer.parseInt(scanner.nextLine());
            System.out.print("ID da Pessoa Solicitante: ");
            int idPessoa = Integer.parseInt(scanner.nextLine());
            System.out.print("Tipo da triagem: ");
            String tipo = scanner.nextLine();
            System.out.print("Data da triagem (YYYY-MM-DD): ");
            LocalDate data = LocalDate.parse(scanner.nextLine());
            System.out.print("Descricao da gravidade: ");
            String gravidade = scanner.nextLine();

            triagemService.cadastrarTriagem(new Triagem(idTriagem, idPessoa, tipo, data, gravidade));
            System.out.println("Triagem cadastrada com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao cadastrar triagem: " + e.getMessage());
        }
    }

    private static void removerTriagem(Scanner scanner) {
        try {
            System.out.print("ID da Triagem a remover: ");
            triagemService.removerTriagem(Integer.parseInt(scanner.nextLine()));
            System.out.println("Triagem removida com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao remover triagem: " + e.getMessage());
        }
    }

    private static void listarAtendimentos() {
        try {
            List<Atendimento> atendimentos = atendimentoService.listarAtendimentos();
            if (atendimentos.isEmpty()) {
                System.out.println("Nenhum atendimento encontrado.");
                return;
            }
            for (Atendimento atendimento : atendimentos) {
                System.out.println("ID: " + atendimento.getIdAtendimento() +
                        " | Triagem: " + atendimento.getIdTriagem() +
                        " | Dentista: " + atendimento.getIdPessoaDentista() +
                        " | Beneficiario: " + atendimento.getIdPessoaBeneficiario() +
                        " | Finalizado: " + atendimento.isFinalizado());
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar atendimentos: " + e.getMessage());
        }
    }

    private static void cadastrarAtendimento(Scanner scanner) {
        try {
            System.out.print("ID do Atendimento: ");
            int idAtendimento = Integer.parseInt(scanner.nextLine());
            System.out.print("ID da Triagem: ");
            int idTriagem = Integer.parseInt(scanner.nextLine());
            System.out.print("Descricao do atendimento: ");
            String descricao = scanner.nextLine();
            System.out.print("Data do atendimento (YYYY-MM-DD): ");
            LocalDate data = LocalDate.parse(scanner.nextLine());
            System.out.print("ID da Pessoa Dentista: ");
            int idDentista = Integer.parseInt(scanner.nextLine());
            System.out.print("ID da Pessoa Beneficiaria: ");
            int idBeneficiario = Integer.parseInt(scanner.nextLine());

            atendimentoService.cadastrarAtendimento(
                    new Atendimento(idAtendimento, idTriagem, descricao, data, idDentista, idBeneficiario, false)
            );
            System.out.println("Atendimento cadastrado com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao cadastrar atendimento: " + e.getMessage());
        }
    }

    private static void finalizarAtendimento(Scanner scanner) {
        try {
            System.out.print("ID do Atendimento: ");
            atendimentoService.finalizarAtendimento(Integer.parseInt(scanner.nextLine()));
            System.out.println("Atendimento finalizado com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao finalizar atendimento: " + e.getMessage());
        }
    }

    private static void listarBeneficiarios() {
        try {
            List<Beneficiario> beneficiarios = beneficiarioService.listarBeneficiarios();
            if (beneficiarios.isEmpty()) {
                System.out.println("Nenhum beneficiario encontrado.");
                return;
            }
            for (Beneficiario beneficiario : beneficiarios) {
                String programa = beneficiario.getProgramaSocial() == null
                        ? String.valueOf(beneficiario.getIdProgramaSocial())
                        : beneficiario.getProgramaSocial().getNmProgramaSocial();
                System.out.println("ID: " + beneficiario.getIdPessoa() +
                        " | Nome: " + beneficiario.getNmPess() +
                        " | Programa: " + programa +
                        " | Elegivel: " + beneficiarioService.verificarElegibilidade(beneficiario));
            }
        } catch (SQLException e) {
            System.out.println("Erro ao listar beneficiarios: " + e.getMessage());
        }
    }

    private static void cadastrarBeneficiario(Scanner scanner) {
        try {
            mostrarProgramasSociais();
            System.out.print("ID do Beneficiario: ");
            int id = Integer.parseInt(scanner.nextLine());
            System.out.print("Nome: ");
            String nome = scanner.nextLine();
            System.out.print("Documento: ");
            String documento = scanner.nextLine();
            System.out.print("CEP: ");
            Integer cep = Integer.parseInt(scanner.nextLine());
            System.out.print("Email: ");
            String email = scanner.nextLine();
            System.out.print("Data de nascimento (YYYY-MM-DD): ");
            LocalDate nascimento = LocalDate.parse(scanner.nextLine());
            System.out.print("ID do Programa Social: ");
            int idProgramaSocial = Integer.parseInt(scanner.nextLine());

            beneficiarioService.cadastrarBeneficiario(
                    new Beneficiario(id, nome, documento, cep, email, nascimento, idProgramaSocial)
            );
            System.out.println("Beneficiario cadastrado com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao cadastrar beneficiario: " + e.getMessage());
        }
    }

    private static void verificarElegibilidade(Scanner scanner) {
        try {
            System.out.print("ID do Beneficiario: ");
            int id = Integer.parseInt(scanner.nextLine());
            Beneficiario beneficiario = encontrarBeneficiario(id);
            if (beneficiario == null) {
                System.out.println("Beneficiario nao encontrado.");
                return;
            }
            boolean elegivel = beneficiarioService.verificarElegibilidade(beneficiario);
            System.out.println(elegivel ? "Beneficiario elegivel." : "Beneficiario nao elegivel.");
        } catch (Exception e) {
            System.out.println("Erro ao verificar elegibilidade: " + e.getMessage());
        }
    }

    private static Beneficiario encontrarBeneficiario(int idPessoa) throws SQLException {
        for (Beneficiario beneficiario : beneficiarioService.listarBeneficiarios()) {
            if (beneficiario.getIdPessoa() == idPessoa) {
                return beneficiario;
            }
        }
        return null;
    }

    private static Pessoa lerPessoa(Scanner scanner) {
        System.out.print("ID da Pessoa: ");
        int id = Integer.parseInt(scanner.nextLine());
        System.out.print("Nome: ");
        String nome = scanner.nextLine();
        System.out.print("Documento: ");
        String documento = scanner.nextLine();
        System.out.print("CEP: ");
        Integer cep = Integer.parseInt(scanner.nextLine());
        System.out.print("Email: ");
        String email = scanner.nextLine();
        return new Pessoa(id, nome, documento, cep, email);
    }

    private static void mostrarProgramasSociais() {
        System.out.println("Programas sociais disponiveis:");
        System.out.println("1 - Sorriso para Todos");
        System.out.println("2 - Atendimento Preventivo");
        System.out.println("3 - Acompanhamento Social");
    }
}
