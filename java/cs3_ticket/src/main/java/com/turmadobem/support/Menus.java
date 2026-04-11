package com.turmadobem.support;

public class Menus {
    public static final String MENU_PRINCIPAL = """
            \n=== MENU PRINCIPAL ===
            1 - Pessoas
            2 - Doadores
            3 - Triagens
            4 - Atendimentos
            5 - Beneficiarios
            0 - Sair
            Escolha uma opcao: """;

    public static final String MENU_PESSOA = """
            \n=== MENU PESSOA ===
            1 - Listar pessoas
            2 - Cadastrar pessoa
            3 - Buscar pessoa por ID
            4 - Atualizar pessoa
            5 - Remover pessoa
            0 - Voltar
            Escolha uma opcao: """;

    public static final String MENU_DOADOR = """
            \n=== MENU DOADOR ===
            1 - Listar doadores
            2 - Registrar nova doacao
            3 - Classificar doadores
            0 - Voltar
            Escolha uma opcao: """;

    public static final String MENU_TRIAGEM = """
            \n=== MENU TRIAGEM ===
            1 - Listar triagens
            2 - Cadastrar triagem
            3 - Remover triagem
            0 - Voltar
            Escolha uma opcao: """;

    public static final String MENU_ATENDIMENTO = """
            \n=== MENU ATENDIMENTO ===
            1 - Listar atendimentos
            2 - Cadastrar atendimento
            3 - Finalizar atendimento
            0 - Voltar
            Escolha uma opcao: """;

    public static final String MENU_BENEFICIARIO = """
            \n=== MENU BENEFICIARIO ===
            1 - Listar beneficiarios
            2 - Cadastrar beneficiario
            3 - Verificar elegibilidade
            0 - Voltar
            Escolha uma opcao: """;

    private Menus() {
    }
}
