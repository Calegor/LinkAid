package com.turmadobem.entidades;

public class Solicitante extends Pessoa {
    public Solicitante() {
    }

    public Solicitante(Integer idPessoa, String nmPess, String docuPess, Integer cepPess, String emailPess) {
        super(idPessoa, nmPess, docuPess, cepPess, emailPess);
    }

    @Override
    public String toString() {
        return "Solicitante{idPessoa=" + getIdPessoa() + ", nome='" + getNmPess() + "'}";
    }
}
