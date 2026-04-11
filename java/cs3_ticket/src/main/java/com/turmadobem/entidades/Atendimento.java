package com.turmadobem.entidades;

import java.time.LocalDate;

public class Atendimento {
    private Integer idAtendimento;
    private Integer idTriagem;
    private String descAtendimento;
    private LocalDate dtAtendimento;
    private Integer idPessoaDentista;
    private Integer idPessoaBeneficiario;
    private boolean finalizado;
    private Triagem triagem;
    private Pessoa pessoaDentista;
    private Pessoa pessoaBeneficiario;

    public Atendimento() {
    }

    public Atendimento(Integer idAtendimento, Integer idTriagem, String descAtendimento, LocalDate dtAtendimento,
                       Integer idPessoaDentista, Integer idPessoaBeneficiario, boolean finalizado) {
        this.idAtendimento = idAtendimento;
        this.idTriagem = idTriagem;
        this.descAtendimento = descAtendimento;
        this.dtAtendimento = dtAtendimento;
        this.idPessoaDentista = idPessoaDentista;
        this.idPessoaBeneficiario = idPessoaBeneficiario;
        this.finalizado = finalizado;
    }

    public Integer getIdAtendimento() {
        return idAtendimento;
    }

    public void setIdAtendimento(Integer idAtendimento) {
        this.idAtendimento = idAtendimento;
    }

    public Integer getIdTriagem() {
        return idTriagem;
    }

    public void setIdTriagem(Integer idTriagem) {
        this.idTriagem = idTriagem;
    }

    public String getDescAtendimento() {
        return descAtendimento;
    }

    public void setDescAtendimento(String descAtendimento) {
        this.descAtendimento = descAtendimento;
    }

    public LocalDate getDtAtendimento() {
        return dtAtendimento;
    }

    public void setDtAtendimento(LocalDate dtAtendimento) {
        this.dtAtendimento = dtAtendimento;
    }

    public Integer getIdPessoaDentista() {
        return idPessoaDentista;
    }

    public void setIdPessoaDentista(Integer idPessoaDentista) {
        this.idPessoaDentista = idPessoaDentista;
    }

    public Integer getIdPessoaBeneficiario() {
        return idPessoaBeneficiario;
    }

    public void setIdPessoaBeneficiario(Integer idPessoaBeneficiario) {
        this.idPessoaBeneficiario = idPessoaBeneficiario;
    }

    public boolean isFinalizado() {
        return finalizado;
    }

    public void setFinalizado(boolean finalizado) {
        this.finalizado = finalizado;
    }

    public Triagem getTriagem() {
        return triagem;
    }

    public void setTriagem(Triagem triagem) {
        this.triagem = triagem;
        if (triagem != null) {
            this.idTriagem = triagem.getIdTriagem();
        }
    }

    public Pessoa getPessoaDentista() {
        return pessoaDentista;
    }

    public void setPessoaDentista(Pessoa pessoaDentista) {
        this.pessoaDentista = pessoaDentista;
        if (pessoaDentista != null) {
            this.idPessoaDentista = pessoaDentista.getIdPessoa();
        }
    }

    public Pessoa getPessoaBeneficiario() {
        return pessoaBeneficiario;
    }

    public void setPessoaBeneficiario(Pessoa pessoaBeneficiario) {
        this.pessoaBeneficiario = pessoaBeneficiario;
        if (pessoaBeneficiario != null) {
            this.idPessoaBeneficiario = pessoaBeneficiario.getIdPessoa();
        }
    }

    public boolean atendimentoValido() {
        return idTriagem != null
                && idPessoaDentista != null
                && idPessoaBeneficiario != null
                && dtAtendimento != null
                && descAtendimento != null
                && !descAtendimento.isBlank();
    }

    public boolean finalizarAtendimento() {
        if (!atendimentoValido() || finalizado) {
            return false;
        }
        finalizado = true;
        return true;
    }

    @Override
    public String toString() {
        return "Atendimento{idAtendimento=" + idAtendimento +
                ", idTriagem=" + idTriagem +
                ", finalizado=" + finalizado + '}';
    }
}
