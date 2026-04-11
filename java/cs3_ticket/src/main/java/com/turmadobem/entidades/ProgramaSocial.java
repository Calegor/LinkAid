package com.turmadobem.entidades;

public class ProgramaSocial {
    private Integer idProgramaSocial;
    private String nmProgramaSocial;

    public ProgramaSocial() {
    }

    public ProgramaSocial(Integer idProgramaSocial, String nmProgramaSocial) {
        this.idProgramaSocial = idProgramaSocial;
        this.nmProgramaSocial = nmProgramaSocial;
    }

    public Integer getIdProgramaSocial() {
        return idProgramaSocial;
    }

    public void setIdProgramaSocial(Integer idProgramaSocial) {
        this.idProgramaSocial = idProgramaSocial;
    }

    public String getNmProgramaSocial() {
        return nmProgramaSocial;
    }

    public void setNmProgramaSocial(String nmProgramaSocial) {
        this.nmProgramaSocial = nmProgramaSocial;
    }

    @Override
    public String toString() {
        return "ProgramaSocial{idProgramaSocial=" + idProgramaSocial +
                ", nmProgramaSocial='" + nmProgramaSocial + '\'' + '}';
    }
}
