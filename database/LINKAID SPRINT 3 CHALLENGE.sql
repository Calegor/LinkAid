-- Projeto: LinkAid (Turma do Bem)
-- ALUNOS:
-- JULIA SILVA SPANOPOULOS - RM: 566754
-- JULIA VALERIO DA SILVA GUIMARÃES - RM: 568275
-- THIAGO GRAMORELLI LIMA - RM: 567630

----------------------------------------------------------------------

-- SCRIPT DE DELEÇÃO (DROP TABLES)
-- Ordem: Das tabelas mais fracas (dependentes) para as tabelas mais fortes.

-- 1. Tabelas Associativas e Altamente Dependentes
DROP TABLE T_TDB_ATENDIMENTO CASCADE CONSTRAINTS;
DROP TABLE T_TDB_DENTISTA_PROGRAMA CASCADE CONSTRAINTS;
DROP TABLE T_TDB_TRIAGEM CASCADE CONSTRAINTS;
DROP TABLE T_TDB_TICKET CASCADE CONSTRAINTS;
DROP TABLE T_TDB_RELATORIO CASCADE CONSTRAINTS;
DROP TABLE T_TDB_DOACAO CASCADE CONSTRAINTS;
DROP TABLE T_TDB_TELEFONE CASCADE CONSTRAINTS;

-- 2. Sub-tipos (Dependem da tabela Contato)
DROP TABLE T_TDB_VOLUNTARIO CASCADE CONSTRAINTS;
DROP TABLE T_TBD_SOLICITANTE CASCADE CONSTRAINTS;
DROP TABLE T_TDB_DOADOR CASCADE CONSTRAINTS;
DROP TABLE T_TDB_DENTISTA CASCADE CONSTRAINTS;
DROP TABLE T_TDB_BENEFICIARIO CASCADE CONSTRAINTS;

-- 3. Tabelas Menos Fortes (Possuem FKs para as tabelas fortes)
DROP TABLE T_TDB_EQUIPE_ONG CASCADE CONSTRAINTS;
DROP TABLE T_TDB_CONTATO CASCADE CONSTRAINTS;

-- 4. Tabelas Fortes (Não possuem FKs, são a base do banco)
DROP TABLE T_TDB_TIPO_PAGAMENTO CASCADE CONSTRAINTS;
DROP TABLE T_TICKET_STATUS CASCADE CONSTRAINTS;
DROP TABLE T_TDB_PROGRAMA_SOCIAL CASCADE CONSTRAINTS;
DROP TABLE T_TDB_DOCUMENTO CASCADE CONSTRAINTS;
DROP TABLE T_TDB_ENDERECO CASCADE CONSTRAINTS;

-- FIM DO SCRIPT DE DELEÇÃO
-- A partir daqui, iniciamos o CREATE TABLE...

-- CRIANDO AS TABELAS E REGRAS DE VALIDAÇÃO (PK, UK, CK, NN)
-- A ordem é crescente (tabelas fortes primeiro, tabelas fracas depois).

-- TABELAS FORTES (Sem Chaves Estrangeiras)
CREATE TABLE T_TDB_ENDERECO(
    id_endereco int generated always as identity primary key,
    ds_logradouro varchar2(150) not null,
    ds_numero varchar2(10),
    ds_complemento varchar2(50),
    nm_bairro varchar2(80) not null,
    nm_cidade varchar2(100) not null,
    sg_uf char(2) not null,
    nr_cep varchar2(8) not null
);

CREATE TABLE T_TDB_DOCUMENTO(
    id_tipo_documento int generated always as identity primary key,
    nm_tipo_documento varchar2(30) not null unique
);

CREATE TABLE T_TDB_PROGRAMA_SOCIAL(
    id_programa_social int generated always as identity primary key,
    nm_programa_social varchar2(30) not null
);

CREATE TABLE T_TICKET_STATUS(
    id_status_ticket int generated always as identity primary key,
    nm_status_ticket varchar2(50) not null unique
);

CREATE TABLE T_TDB_TIPO_PAGAMENTO(
    id_tipo_pagamento int generated always as identity primary key,
    nm_tipo_pagamento varchar2(50) not null unique
);


-- TABELAS MENOS FORTES (Com Chaves Estrangeiras)
CREATE TABLE T_TDB_CONTATO(
    id_contato int generated always as identity primary key,
    tp_canal_contato char(30) not null,
    nm_contato varchar2(100) not null,
    cd_documento varchar2(30) not null,
    ds_email_contato varchar2(255) not null,
    id_tipo_documento int references T_TDB_DOCUMENTO(id_tipo_documento) not null,
    id_endereco int references T_TDB_ENDERECO(id_endereco) not null,
    unique (cd_documento, id_tipo_documento)
);

CREATE TABLE T_TDB_EQUIPE_ONG(
    id_equipe int generated always as identity primary key,
    nm_equipe varchar2(100) not null,
    cd_documento varchar2(30) not null,
    id_tipo_documento int references T_TDB_DOCUMENTO(id_tipo_documento) not null,
    unique (cd_documento, id_tipo_documento)
);

-- SUB-TIPOS DE CONTATO

CREATE TABLE T_TDB_BENEFICIARIO(
    id_contato int primary key references T_TDB_CONTATO(id_contato),
    dt_nascimento date not null,
    id_programa_social int references T_TDB_PROGRAMA_SOCIAL(id_programa_social) not null
);

CREATE TABLE T_TDB_DENTISTA(
    id_contato int primary key references T_TDB_CONTATO(id_contato),
    nr_cro varchar2(10) not null,
    sg_uf_cro char(2) not null,
    ds_especializacao varchar2(500) not null,
    unique (nr_cro, sg_uf_cro)
);

CREATE TABLE T_TDB_DOADOR(
    id_contato int primary key references T_TDB_CONTATO(id_contato)
);

CREATE TABLE T_TBD_SOLICITANTE(
    id_contato int primary key references T_TDB_CONTATO(id_contato)
);

CREATE TABLE T_TDB_VOLUNTARIO(
    id_contato int primary key references T_TDB_CONTATO(id_contato),
    ds_area_interesse varchar2(100) not null,
    ds_disponibilidade varchar2(500) not null
);

-- TABELAS DEPENDENTES / ASSOCIATIVAS
CREATE TABLE T_TDB_TELEFONE(
    id_telefone int generated always as identity primary key,
    tp_telefone varchar2(10) not null,
    nr_telefone varchar2(15) not null,
    id_contato int references T_TDB_CONTATO(id_contato) not null
);

CREATE TABLE T_TDB_DOACAO(
    id_doacao int generated always as identity primary key,
    vl_doacao number(10,2) not null,
    dt_doacao date not null,
    id_tipo_pagamento int references T_TDB_TIPO_PAGAMENTO(id_tipo_pagamento) not null,
    id_contato int references T_TDB_DOADOR(id_contato) not null
);

CREATE TABLE T_TDB_RELATORIO(
    id_relatorio int generated always as identity primary key,
    dt_geracao date not null,
    dt_inicio_periodo date not null,
    dt_fim_periodo date not null,
    qt_tickets_novos number(10) not null,
    qt_triagens_realizadas number(10) not null,
    qt_atendimentos_finalizados number(10) not null,
    vl_total_doacoes number(10,2) not null,
    qt_horas_voluntariado number(10,2) not null,
    id_equipe int references T_TDB_EQUIPE_ONG(id_equipe) not null
);

CREATE TABLE T_TDB_TICKET(
    id_ticket int generated always as identity primary key,
    nr_protocolo_ticket int not null unique,
    dt_criacao_ticket date not null,
    dt_atualizacao_ticket date not null,
    in_prioridade number(1) default 0 check(in_prioridade IN(0, 1)) not null,
    dt_finalizacao date not null,
    id_status_ticket int references T_TICKET_STATUS(id_status_ticket) not null,
    id_contato int references T_TDB_CONTATO(id_contato) not null,
    id_equipe int references T_TDB_EQUIPE_ONG(id_equipe) not null
);

CREATE TABLE T_TDB_TRIAGEM(
    id_triagem int generated always as identity primary key,
    id_contato_solicitante int references T_TBD_SOLICITANTE(id_contato) not null,
    tp_triagem varchar2(30) not null,
    dt_triagem date not null,
    ds_gravidade clob not null,
    ds_vulnerabilidade clob not null,
    ds_empregabilidade clob not null
);

CREATE TABLE T_TDB_DENTISTA_PROGRAMA(
    id_contato int references T_TDB_DENTISTA(id_contato) not null,
    id_programa_social int references T_TDB_PROGRAMA_SOCIAL(id_programa_social) not null,
    dt_inicio_vinculo date not null,
    in_ativo number(1) not null,
    primary key (id_contato, id_programa_social)
);

CREATE TABLE T_TDB_ATENDIMENTO(
    id_atendimento int generated always as identity primary key,
    dt_atendimento date not null,
    ds_atendimento clob not null,
    id_triagem int references T_TDB_TRIAGEM(id_triagem) not null,
    id_contato_beneficiario int references T_TDB_BENEFICIARIO(id_contato) not null,
    id_contato_dentista int references T_TDB_DENTISTA(id_contato) not null
);