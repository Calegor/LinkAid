package com.turmadobem.entidades;

public class Dentista extends Pessoa {
    private String nrCro;
    private String especializacaoDent;

    public Dentista() {
    }

    public Dentista(Integer idPessoa, String nmPess, String docuPess, Integer cepPess, String emailPess,
                    String nrCro, String especializacaoDent) {
        super(idPessoa, nmPess, docuPess, cepPess, emailPess);
        this.nrCro = nrCro;
        this.especializacaoDent = especializacaoDent;
    }

    public String getNrCro() {
        return nrCro;
    }

    public void setNrCro(String nrCro) {
        this.nrCro = nrCro;
    }

    public String getEspecializacaoDent() {
        return especializacaoDent;
    }

    public void setEspecializacaoDent(String especializacaoDent) {
        this.especializacaoDent = especializacaoDent;
    }

    public boolean croValido() {
        return nrCro != null && nrCro.matches("\\d{4,8}(/[A-Z]{2})?");
    }

    @Override
    public String toString() {
        return "Dentista{idPessoa=" + getIdPessoa() +
                ", nome='" + getNmPess() + '\'' +
                ", nrCro='" + nrCro + '\'' + '}';
    }
}
