

//START REGION ERROR FORMS
//exibe o erro na tela
const showError = (element) => {
    element.classList.remove("form__input")
    element.classList.add("form__input__error")
    document.querySelector(`#errorinput${element.name} label`).classList.remove("form__input__error_none__display")
    document.querySelector(`#errorinput${element.name} label`).classList.add("form__input__error__display")
    element.focus()
}

// Oculta o erro na tela
const hideError = (element) => {

    element.classList.remove("form__input__error");
    element.classList.add("form__input");
    document.querySelector(`#errorinput${element.name} label`).classList.remove("form__input__error__display")
    document.querySelector(`#errorinput${element.name} label`).classList.add("form__input__error_none__display")
}
//END REGION




//REGION MASCARAS
/**
 * 
 * Mascara para o cpf
 */
const cpfMask = (strCpf) => {


    strCpf.value = strCpf.value.replace(/\D/g, "")
    strCpf.value = strCpf.value.replace(/(\d{3})(\d)/, "$1.$2")
    strCpf.value = strCpf.value.replace(/(\d{3})(\d)/, "$1.$2")
    strCpf.value = strCpf.value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return strCpf.value

}

/**
 * 
 * Mascara para o cep
 */
const cepMask = (strCep) => {
    strCep.value = strCep.value.replace(/\D/g, "")
    strCep.value = strCep.value.replace(/(\d{2})(\d)/, "$1.$2")
    strCep.value = strCep.value.replace(/(\d{3})(\d)/, "$1-$2")
    return strCep.value

}
/**
 * 
 * Mascara para o numero do cartao de credito
 */
const cardNumberMask = (strCardNumber) => {
    strCardNumber.value = strCardNumber.value.replace(/\D/g, "")
    strCardNumber.value = strCardNumber.value.replace(/(\d{4})(\d)/, "$1 $2")
    strCardNumber.value = strCardNumber.value.replace(/(\d{4})(\d)/, "$1 $2")
    strCardNumber.value = strCardNumber.value.replace(/(\d{4})(\d)/, "$1 $2")

    return strCardNumber.value

}
//END REGION


//REGION VALIDA INPUTS
//valida cpf
const cpfValid = (strCpf) => {

    var soma;
    var resto;
    soma = 0;


    if (strCpf == "00000000000") {
        return false;
    }

    for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
}

//valida se input tem caracter numerico
const validInputWord = (val) => {
    let regExp = new RegExp(/^[a-zA-Záéíóúâêôãõ ]+$/)

    if (!regExp.test(val.value) || val.value == "") {
        showError(val)
        return false;
    }
    else {
        hideError(val)
        return true;
    }
}

//remove caracteres especiais do cpf
const regExpCpfReplace = (strCpf) => {
    let regExpCpf = new RegExp(/[.,-]/g)
    strCpf = strCpf.replace(regExpCpf, "")
    return strCpf
}

//remove caracter especial .,- 
const regExpNumberReplace = (strNumber) => {
    let regExpNumber = new RegExp(/[.,- ]/g)
    strNumber = strNumber.replace(regExpNumber, "")
    return strNumber
}

//valida se o cep está valido
//codigo retirado do GITHUB
const validCep = (val) => {
    // Caso o CEP não esteja nesse formato ele é inválido!
    var objER = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;
    let cep = ""
    cep = val.value.replace(/^s+|s+$/g, '');
    if (cep.length > 0) {
        if (objER.test(cep)) {
            hideError(val)
            return true;
        }
        else {
            showError(val)
            return false
        }

    }

}

//valida se o cartao digitado é valido
//retirado do GITHUB
const checkCard = (val) => {
    if (val.value.length == 19) {
        var msg = Array();
        var tipo = null;
        var cardNumber = val.value.replace(/\s/g, "")
        if (cardNumber.length > 16 || cardNumber[0] == 0) {
            showError(val)
            document.querySelector(`#errorinput${val.name} label`).innerHTML = "Cartão inválido"

        } else {

            var total = 0;
            var arr = Array();

            for (i = 0; i < cardNumber.length; i++) {
                if (i % 2 == 0) {
                    dig = cardNumber[i] * 2;

                    if (dig > 9) {
                        dig1 = dig.toString().substr(0, 1);
                        dig2 = dig.toString().substr(1, 1);
                        arr[i] = parseInt(dig1) + parseInt(dig2);
                    } else {
                        arr[i] = parseInt(dig);
                    }

                    total += parseInt(arr[i]);

                } else {

                    arr[i] = parseInt(cardNumber[i]);
                    total += parseInt(arr[i]);
                }
            }

            switch (parseInt(cardNumber[0])) {
                case 0:
                    showError(val)
                    document.querySelector(`#errorinput${val.name} label`).innerHTML = "Cartão inválido"
                    break;
                case 1:
                    tipo = "Empresas Aéreas";
                    break;
                case 2:
                    tipo = "Empresas Aéreas";
                    break
                case 3:
                    tipo = "Viagens e Entretenimento";
                    if (parseInt(cardNumber[0] + cardNumber[1]) == 34 || parseInt(cardNumber[0] + cardNumber[1]) == 37) { operadora = "Amex"; }
                    if (parseInt(cardNumber[0] + cardNumber[1]) == 36) { operadora = "Diners"; }
                    break
                case 4:
                    tipo = "Bancos e Instituições Financeiras";
                    operadora = "visa";
                    break
                case 5:
                    if (parseInt(cardNumber[0] + cardNumber[1]) >= 51 && parseInt(cardNumber[0] + cardNumber[1]) <= 55) { operadora = "Mastercard"; }
                    tipo = "Bancos e Instituições Financeiras";
                    operadora = "Mastercard"
                    break;
                case 6:
                    tipo = "Bancos e Comerciais";
                    operadora = "";
                    break
                case 7:
                    tipo = "Companhias de petróleo";
                    operadora = "";
                    break
                case 8:
                    tipo = "Companhia de telecomunicações";
                    operadora = "";
                    break
                case 9:
                    tipo = "Nacionais";
                    operadora = "";
                    break
                default:
                    showError(val)
                    document.querySelector(`#errorinput${val.name} label`).innerHTML = "Cartão inválido"
                    break;
            }

        }

        if (msg.length > 0) {
            showError(val)
            document.querySelector(`#errorinput${val.name} label`).innerHTML = "Cartão inválido"
            return false


        } else {
            if (total % 10 == 0) {
                hideError(val)
                return true
            } else {
                showError(val)
                document.querySelector(`#errorinput${val.name} label`).innerHTML = "Cartão inválido"
                return false
            }
        }
    }
    else {
        showError(val)
        document.querySelector(`#errorinput${val.name} label`).innerHTML = "Cartão inválido"
        return false

    }

}

//valida se input contem somente caracters numericos
const validInputNumber = (val, cpf = false) => {
    let regExp = new RegExp(/^[0-9]+$/)


    if (!regExp.test(val.value) && cpf == false) {
        showError(val)
        document.querySelector(`#errorinput${val.name} label`).innerHTML = "Apenas números são permitidos"
        return false
    }
    else if (regExp.test(val.value) && cpf == false) {
        hideError(val)
        return true
    }
    else if (cpf == true) {
        hideError(val)
        if (cpf == true && regExpCpfReplace(val.value).length != 11) {
            showError(val)
            let cpfLength = (11 - (regExpCpfReplace(val.value)).length)
            document.querySelector(`#errorinput${val.name} label`).innerHTML = `O CPF deve ter 11 digitos : ${regExpCpfReplace(val.value).length <= 11 ? `Falta ${cpfLength}` : `Sobra ${cpfLength * -1}`}  caracters`
            return false;
        }

    }
    if (cpf == true && (regExpCpfReplace(val.value)).length == 11 && !cpfValid(regExpCpfReplace(val.value))) {
        showError(val)
        document.querySelector(`#errorinput${val.name} label`).innerHTML = "CPF é invalido, verifique!"
        return false;
    }
    else if (cpf == true && (regExpCpfReplace(val.value)).length == 11 && cpfValid(regExpCpfReplace(val.value))) {
        hideError(val)
        return true
    }

}

//valida campo do email
//codigo retirado do GITHUB
const validInputEmail = (val) => {
    pre = val.value.substring(0, val.value.indexOf("@"))
    pos = val.value.substring(val.value.indexOf("@") + 1, val.value.lenght)

    if ((pre.length >= 1) &&
        (pos.length >= 3) &&
        (pre.search("@") == -1) &&
        (pos.search("@") == -1) &&
        (pre.search(" ") == -1) &&
        (pos.search(" ") == -1) &&
        (pos.search(".") != -1) &&
        (pos.indexOf(".") >= 1) &&
        (pos.lastIndexOf(".") < pos.length - 1) &&
        (pre.lastIndexOf(",") == -1) &&
        (pos.lastIndexOf(",") == -1)
    ) {
        hideError(val)
        return true
    }
    else {
        showError(val)
        return false
    }
}

/*exibe dados do cartao de credito se a opcao escolhida
fo a de cartao de credito */
const enableValuesCreditCard = () => {
    document.querySelector("#payament_form_credit").checked = true
    let dataCardOne = document.querySelector('#dataCardOne')
    let dataCardTwo = document.querySelector('#dataCardTwo')
    dataCardOne.removeAttribute("hidden", "hidden")
    dataCardTwo.removeAttribute("hidden", "hidden")

    document.querySelector('#security_code').setAttribute("required", "required")
    document.querySelector('#card__number').setAttribute("required", "required")
    document.querySelector('#yearDataCard').setAttribute("required", "required")
    document.querySelector('#monthDataCard').setAttribute("required", "required")
    document.querySelector('#card__name').setAttribute("required", "required")








}

/* oculta dados de cartao de credito caso a opcao 
escolhida seja boleto
*/
const disableValuesCreditCard = () => {
    let dataCardOne = document.querySelector('#dataCardOne')
    let dataCardTwo = document.querySelector('#dataCardTwo')
    dataCardOne.setAttribute("hidden", "hidden")
    dataCardTwo.setAttribute("hidden", "hidden")

    document.querySelector('#security_code').removeAttribute("required", "required")
    document.querySelector('#card__number').removeAttribute("required", "required")
    document.querySelector('#yearDataCard').removeAttribute("required", "required")
    document.querySelector('#monthDataCard').removeAttribute("required", "required")
    document.querySelector('#card__name').removeAttribute("required", "required")


}
//END REGION

//REGION LOAD
//carrega todas os estados do Brasil, no select
const loadUf = () => {
    //A VAR DATA VEM DO ARQUIVO BRUF.JSON, IMPORTADA NO INDEX.HTML
    let selectObj = document.getElementById('uf')
    //REMOVE ALL OPTIONS
    selectObj.options.length = 1

    for (var i = 0; i < data.length; i++) {
        let opt = document.createElement("option");
        opt.value = data[i].sigla
        opt.text = data[i].nome
        selectObj.add(opt, null)

        // more statements
    }



}
/*carrega todas as cidades referente ao estado escolhido...
obs: função chamada, após a escolha da UF
*/
const loadCity = (uf) => {
    //A VAR DATA VEM DO ARQUIVO BRUF.JSON, IMPORTADA NO INDEX.HTML

    let selectObj = document.getElementById('city')
    //REMOVE ALL OPTIONS
    selectObj.options.length = 1
    for (var i = 0; i < data.length; i++) {
        if (data[i].sigla == uf.value) {
            for (var j = 0; j < data[i].cidades.length; j++) {
                let opt = document.createElement("option");
                opt.value = data[i].cidades[j]
                opt.text = data[i].cidades[j]
                selectObj.add(opt, null)
            }
        }

        // more statements
    }
}

/**
 * carrega o mes e depois o ano de validade do cartao
 * obs: Existe uma validação do mes atual com o ano atual
 */
const loadMonthDataCard = () => {

    let selectObjMonth = document.querySelector("#monthDataCard")
    let selectObjYear = document.querySelector("#yearDataCard")


    for (let i = 1; i <= 12; i++) {
        let opt = document.createElement("option");
        opt.value = i
        opt.text = i
        selectObjMonth.add(opt, null)

    }


}
/**
 * 
 * Metodo chamado ao escolher o mes do vencimento do cartao de credito
 * se o mes escolhido for menor que o mes atual, o ano atual é descartado
 */
const loadYearDataCard = (obj) => {
    let now = new Date
    let selectObjYear = document.querySelector("#yearDataCard")
    selectObjYear.options.length = 1
    let year = 0
    //COMPARO O OBJETO COM O NOW.GETMONTH() + 1, POIS O RANGE VAI DE 0 a 11
    if (obj.value <= (now.getMonth() + 1))
        year = now.getFullYear() + 1

    else
        year = now.getFullYear()


    for (let i = year; i <= (year + 10); i++) {
        let opt = document.createElement("option");
        opt.value = i
        opt.text = i
        selectObjYear.add(opt, null)
    }

}

//END REGION


//REGION VALIDA FORM
/**
 * 
 * Valida formulario e todos os campos obrigatorios
 */
const frmValid = (frm) => {


    if (
        validInputWord(frm.name) &&
        validInputEmail(frm.email) &&
        validInputNumber(frm.cpf, true) &&
        validCep(frm.cep) &&
        frm.name.value != "" &&
        frm.email.value != "" &&
        frm.cpf.value != ""

    ) {


        let frmJson = []
        let now = new Date
        let dateNow = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`
        let payament_form = []

        if (frm.payament_form.value == 'credit') {

            if (checkCard(frm.card__number) &&
                validInputWord(frm.card__name) &&
                frm.card__name.value != "" &&
                frm.security_code.value != "" &&
                frm.card__number.value != "" &&
                validInputNumber(frm.security_code)) {
                payament_form = {
                    'credit': {
                        'card_name': frm.card__name.value,
                        'expiration_date_month': frm.monthDataCard.value,
                        'expiration_date_year': frm.yearDataCard.value,
                        'card_number': frm.card__number.value,
                        'security_code': frm.security_code.value
                    }
                }

            }
            else {
                alert("Preencha corretamente as formas de pagamento!")
                return false
            }

        }
        else if (frm.payament_form.value == 'boleto') {
            payament_form = frm.payament_form.value
        }
        else {
            alert("Preencha corretamente as formas de pagamento!")
            return false
        }

        if (payament_form == "") {
            alert("Preencha corretamente as formas de pagamento!")
            return false
        }

        frmJson = {
            "id": (JSON.parse(localStorage.getItem(`register`)) != null ? JSON.parse(localStorage.getItem(`register`)).length + 1 : 1),
            "name": frm.name.value,
            "email": frm.email.value,
            "cpf": frm.cpf.value,
            "address": frm.address.value,
            "uf": frm.uf.value,
            "city": frm.city.value,
            "cep": frm.cep.value,
            "payament_form": payament_form,
            "create": dateNow
        }

        if (localStorage.getItem(`register`) != null || localStorage.getItem(`register`) != undefined) {
            let registers = JSON.parse(localStorage.getItem(`register`))
            registers.push(frmJson)
            localStorage.setItem(`register`, JSON.stringify(registers))
        }
        else {
            let registers = []
            registers.push(frmJson)
            localStorage.setItem(`register`, JSON.stringify(registers))
        }

        alert("O cadastro foi realizado com sucesso!")

        document.location.reload(true)

    }
    else
        return false


}
//ENDREGION




/** 
 * os metodos abaixo são chamados no carregamento da pagina
 * */



// REGION DOCUMENT DEFAULT LOAD

//Carrega todas as UF do bruf.json 

loadUf()
//Desabilitar campos do  cartao de credito
enableValuesCreditCard()
//Carrega os meses
loadMonthDataCard()
// ENDREGION
//inicia o cursor no input name
document.querySelector("#name").focus();