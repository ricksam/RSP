# RSP
plugin que facilita integração com páginas PHP, MVC, JSP

Como Usar:

    //Esta função deve ser utilizada no $(document).ready(); e tem a finalidade de gerenciar o spinner geral da página
    rsp.loader(
        function(){
            //loader on
        },
        function(){
            //loader off
        }
    );
    
    // Usando uma div contendo os inputs de dados
    rsp.post("#div_dados", "/Controller/Action", "#div_result"); 

    // Usando Json
    rsp.post({ id : 1 }, "/Controller/Action", "#div_result"); 

    // Retornando em uma function
    rsp.post({ id : 1 }, "/Controller/Action", function(result){
        $("#div_result").html(result);
    });

    // Com Input file
    function SendImagens(e)
    {
        var formData = new FormData();
        for (var i = 0; i < $(e).get(0).files.length; i++) {
            formData.append("file", $(e).get(0).files[i]);
        }        
        rsp.post(formData, "/Controller/Action", "#div_result");
    }
    
O RSP foi pensado em um modelo acadêmico de Entrada, Processamento e Saída de dados.

Estrutura: rsp.[metodo]([Entrada], [Processamento], [Saída])

Os métodos de entrada deverão ser: get, post, put ou delete, exemplo:
 - rsp.get("#divcampos", "Listar.php", "#divlista");
 - rsp.post("#divcampos", "Listar.php", "#divlista");
 - rsp.put("#divcampos", "Listar.php", "#divlista");
 - rsp.delete("#divcampos", "Listar.php", "#divlista");

Como Entrada pode ser enviado :
 - um elemento que contenha os inputs de dados exemplo "#divcampos"
 - um FormData javascript
 - um json
 
Como Processamento deve ser enviado a página que irá receber/processar estes dados que pode ser 
um link de qualquer linguagem como PHP, Ruby, Node, C#, JSP etc ... 

Como Saída pode ser utilizado:
 - um elemento onde a página que é resultado do processamento será renderizada
 - uma function que irá trabalhar com o resultado do link de processamento
