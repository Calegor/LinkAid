package com.turmadobem.entidades;

public class Pessoa {
    private Integer idPessoa;
    private String nmPess;
    private String docuPess;
    private Integer cepPess;
    private String emailPess;

    public Pessoa() {
    }

    public Pessoa(Integer idPessoa, String nmPess, String docuPess, Integer cepPess, String emailPess) {
        this.idPessoa = idPessoa;
        this.nmPess = nmPess;
        this.docuPess = docuPess;
        this.cepPess = cepPess;
        this.emailPess = emailPess;
    }

    public Integer getIdPessoa() {
        return idPessoa;
    }

    public void setIdPessoa(Integer idPessoa) {
        this.idPessoa = idPessoa;
    }

    public String getNmPess() {
        return nmPess;
    }

    public void setNmPess(String nmPess) {
        this.nmPess = nmPess;
    }

    public String getDocuPess() {
        return docuPess;
    }

    public void setDocuPess(String docuPess) {
        this.docuPess = docuPess;
    }

    public Integer getCepPess() {
        return cepPess;
    }

    public void setCepPess(Integer cepPess) {
        this.cepPess = cepPess;
    }

    public String getEmailPess() {
        return emailPess;
    }

    public void setEmailPess(String emailPess) {
        this.emailPess = emailPess;
    }

    @Override
    public String toString() {
        return "Pessoa{idPessoa=" + idPessoa +
                ", nmPess='" + nmPess + '\'' +
                ", docuPess='" + docuPess + '\'' +
                ", cepPess=" + cepPess +
                ", emailPess='" + emailPess + '\'' + '}';
    }
}
