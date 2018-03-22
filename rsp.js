// Rich Single Page
var Rsp = function () {
    var _loaderOn = null;
    var _loaderOff = null;
}

Rsp.prototype.f = function (field, value) {
    this._field = field;
    this._value = value;
};

Rsp.prototype.q = function (query) {
    this._query = query;
};

Rsp.prototype.get = function (source, url, target) {
    this.exec(source, "GET", url, target);
}

Rsp.prototype.post = function (source, url, target) {
    this.exec(source, "POST", url, target);
}

Rsp.prototype.put = function (source, url, target) {
    this.exec(source, "PUT", url, target);
}

Rsp.prototype.delete = function (source, url, target) {
    this.exec(source, "DELETE", url, target);
}

Rsp.prototype.exec = function (source, method, url, target) {

    this._url = url;
    this._type = method;

    var data = "";
    var IsFormData = false;
    
    if (({}).toString.call(source) == "[object FormData]") {
        IsFormData = true;
        data = source;
    }
    else if (({}).toString.call(source) == "[object Object]") {
        data = source;
    }
    else if (({}).toString.call(source) == "[object String]") {
        data += $(source + " input, " + source + " select, " + source + " textarea").serialize();
    }

    this.loaderOn();

    var callback = null;
    if (({}).toString.call(target) == "[object Function]") {
        callback = target;
    }
    else if (({}).toString.call(target) == "[object String]") {
        callback = function (response) {
            $(target).html(response);
        };
    }

    var Properties = {
        type: this._type,
        url: this._url,
        data: data
    };

    if (IsFormData) {
        Properties = {
            type: this._type,
            url: this._url,
            data: data,
            contentType: false,
            processData: false
        };
    }

    $.ajax(Properties)
        .done(callback)
        .always(this._loaderOff);
}

Rsp.prototype.loader = function (loaderOn, loaderOff) {
    this._loaderOn = loaderOn;
    this._loaderOff = loaderOff;
}

Rsp.prototype.loaderOn = function () {
    if (this._loaderOn != null)
    { this._loaderOn(); }
}

Rsp.prototype.loaderOff = function () {
    if (this._loaderOff != null)
    { this._loaderOff(); }
}

var rsp = new Rsp();

/*
    Modos de Uso

    // Configurando Loader
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
    rsp.post({ id = 1 }, "/Controller/Action", "#div_result"); 

    // Retornando em uma function
    rsp.post({ id = 1 }, "/Controller/Action", function(result){
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
*/