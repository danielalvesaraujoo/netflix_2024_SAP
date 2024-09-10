sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("projectnetflix.controller.Inicio", {
        onInit: function () {
            //Definição de lista vazia de resiltados
            let resultados = {
                titles: []
            }

            //Definição de modelo - variavel especial para mostrar dados na tela
            let resultadosModel = new JSONModel();
            //atribuição de dados
            resultadosModel.setData(resultados);
            //anexar modelo na tela
            let tela = this.getView();
            tela.setModel(resultadosModel, "APINetFlix");

        },
        onInicioLinkPress: function (){
            alert("navegar para tela inicial");
        },

        onBuscarDados: function (){
            //busca de dados na api da netflix
            let searchField = this.byId("idSearchField");
            let filtro = searchField.getValue();
            //alert(filtro);

            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://netflix54.p.rapidapi.com/search/?query='+filtro+'&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'd737dfeda9msh5320437e23f5869p1b3fd0jsna9fc9f1bc623',
                    'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                }
            };
            
            $.ajax(settings).done(function (response) {
                console.log(response);
                //RESGATAR O MODELO E ATUALIZAR DADOS
                let tela = this.getView();
                let modelo = tela.getModel("APINetFlix");
                let dados = modelo.getData();

                //limpar a lista
                dados.titles = [];
                dados.titles = response.titles;
                modelo.refresh();
            }.bind(this));
        }
    
    });
});
