package com.turmadobem.entidades;

import java.time.LocalDate;
import java.time.Period;

public class Beneficiario extends Pessoa {
    private LocalDate dtNascimento;
    private Integer idProgramaSocial;
    private ProgramaSocial programaSocial;

    public Beneficiario() {
    }

    public Beneficiario(Integer idPessoa, String nmPess, String docuPess, Integer cepPess, String emailPess,
                        LocalDate dtNascimento, Integer idProgramaSocial) {
        super(idPessoa, nmPess, docuPess, cepPess, emailPess);
        this.dtNascimento = dtNascimento;
        this.idProgramaSocial = idProgramaSocial;
    }

    public LocalDate getDtNascimento() {
        return dtNascimento;
    }

    public void setDtNascimento(LocalDate dtNascimento) {
        this.dtNascimento = dtNascimento;
    }

    public Integer getIdProgramaSocial() {
        return idProgramaSocial;
    }

    public void setIdProgramaSocial(Integer idProgramaSocial) {
        this.idProgramaSocial = idProgramaSocial;
    }

    public ProgramaSocial getProgramaSocial() {
        return programaSocial;
    }

    public void setProgramaSocial(ProgramaSocial programaSocial) {
        this.programaSocial = programaSocial;
        if (programaSocial != null) {
            this.idProgramaSocial = programaSocial.getIdProgramaSocial();
        }
    }

    public int getIdade() {
        if (dtNascimento == null) {
            return 0;
        }
        return Period.between(dtNascimento, LocalDate.now()).getYears();
    }

    @Override
    public String toString() {
        return "Beneficiario{idPessoa=" + getIdPessoa() +
                ", nome='" + getNmPess() + '\'' +
                ", idade=" + getIdade() +
                ", idProgramaSocial=" + idProgramaSocial + '}';
    }
}
