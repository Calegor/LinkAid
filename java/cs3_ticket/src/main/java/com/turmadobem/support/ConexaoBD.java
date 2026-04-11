package com.turmadobem.support;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexaoBD {
    private static final String URL = "jdbc:oracle:thin:@oracle.fiap.com.br:1521/orcl";
    private static final String USUARIO = "RM567630";
    private static final String SENHA = "150101";

    private ConexaoBD() {
    }

    public static Connection conectar() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, SENHA);
    }
}
