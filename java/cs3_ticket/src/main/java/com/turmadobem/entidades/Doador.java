package com.turmadobem.entidades;

public class Doador extends Pessoa {
    private double totalDoado;

    public Doador() {
    }

    public Doador(Integer idPessoa, String nmPess, String docuPess, Integer cepPess, String emailPess, double totalDoado) {
        super(idPessoa, nmPess, docuPess, cepPess, emailPess);
        this.totalDoado = totalDoado;
    }

    public double getTotalDoado() {
        return totalDoado;
    }

    public void setTotalDoado(double totalDoado) {
        this.totalDoado = totalDoado;
    }

    public boolean registrarDoacao(double valor) {
        if (valor <= 0) {
            return false;
        }
        totalDoado += valor;
        return true;
    }

    public String classificarPerfilDoador() {
        if (totalDoado >= 10000.0) {
            return "Diamante";
        }
        if (totalDoado >= 5000.0) {
            return "Ouro";
        }
        if (totalDoado >= 1000.0) {
            return "Prata";
        }
        return "Bronze";
    }

    @Override
    public String toString() {
        return "Doador{idPessoa=" + getIdPessoa() +
                ", nome='" + getNmPess() + '\'' +
                ", totalDoado=" + totalDoado + '}';
    }
}
