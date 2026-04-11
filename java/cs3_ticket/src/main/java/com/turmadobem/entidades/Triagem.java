package com.turmadobem.entidades;

import java.time.LocalDate;

public class Triagem {
    private Integer idTriagem;
    private Integer idPessoaSolicitante;
    private String tpTriagem;
    private LocalDate dtTriagem;
    private String dsGravidade;
    private Pessoa pessoaSolicitante;

    public Triagem() {
    }

    public Triagem(Integer idTriagem, Integer idPessoaSolicitante, String tpTriagem, LocalDate dtTriagem,
                   String dsGravidade) {
        this.idTriagem = idTriagem;
        this.idPessoaSolicitante = idPessoaSolicitante;
        this.tpTriagem = tpTriagem;
        this.dtTriagem = dtTriagem;
        this.dsGravidade = dsGravidade;
    }

    public Integer getIdTriagem() {
        return idTriagem;
    }

    public void setIdTriagem(Integer idTriagem) {
        this.idTriagem = idTriagem;
    }

    public Integer getIdPessoaSolicitante() {
        return idPessoaSolicitante;
    }

    public void setIdPessoaSolicitante(Integer idPessoaSolicitante) {
        this.idPessoaSolicitante = idPessoaSolicitante;
    }

    public String getTpTriagem() {
        return tpTriagem;
    }

    public void setTpTriagem(String tpTriagem) {
        this.tpTriagem = tpTriagem;
    }

    public LocalDate getDtTriagem() {
        return dtTriagem;
    }

    public void setDtTriagem(LocalDate dtTriagem) {
        this.dtTriagem = dtTriagem;
    }

    public String getDsGravidade() {
        return dsGravidade;
    }

    public void setDsGravidade(String dsGravidade) {
        this.dsGravidade = dsGravidade;
    }

    public Pessoa getPessoaSolicitante() {
        return pessoaSolicitante;
    }

    public void setPessoaSolicitante(Pessoa pessoaSolicitante) {
        this.pessoaSolicitante = pessoaSolicitante;
        if (pessoaSolicitante != null) {
            this.idPessoaSolicitante = pessoaSolicitante.getIdPessoa();
        }
    }

    public String classificarPrioridade() {
        if (dsGravidade == null) {
            return "NAO_CLASSIFICADA";
        }

        String gravidade = dsGravidade.trim().toUpperCase();
        if (gravidade.contains("ALTA") || gravidade.contains("URG")) {
            return "PRIORIDADE_MAXIMA";
        }
        if (gravidade.contains("MEDIA")) {
            return "PRIORIDADE_ALTA";
        }
        if (gravidade.contains("BAIXA")) {
            return "PRIORIDADE_PADRAO";
        }
        return "AVALIACAO_MANUAL";
    }

    public boolean podeGerarAtendimento() {
        return idPessoaSolicitante != null
                && tpTriagem != null && !tpTriagem.isBlank()
                && dtTriagem != null
                && dsGravidade != null && !dsGravidade.equalsIgnoreCase("INAPTO");
    }

    @Override
    public String toString() {
        return "Triagem{idTriagem=" + idTriagem +
                ", idPessoaSolicitante=" + idPessoaSolicitante +
                ", tpTriagem='" + tpTriagem + '\'' +
                ", prioridade='" + classificarPrioridade() + '\'' + '}';
    }
}
