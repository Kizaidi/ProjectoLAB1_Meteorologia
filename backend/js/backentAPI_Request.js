const apikey = "cf1fed3f2e9d2f4683812cd77b1330fe";

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&lang=pt`;

            fetch(url).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                console.log(new Date().getTime());
                var dat = new Date(data.dt);
                console.log(dat.toLocaleString(undefined, 'Africa/Angola'));
                console.log(new Date().getMinutes());
                relatorioClima(data);
            });
        });
    }
});

function buscarPorCidade() {
    var lugar = document.getElementById('input').value;
    var urlBusca = `https://api.openweathermap.org/data/2.5/weather?q=${lugar}&appid=${apikey}&lang=pt`;

    fetch(urlBusca).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        relatorioClima(data);
    });
    document.getElementById('input').value = '';
}

function relatorioClima(data) {
    var urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}&lang=pt`;

    fetch(urlPrevisao).then((res) => {
        return res.json();
    }).then((previsao) => {
        console.log(previsao.city);
        previsaoHora(previsao);
        previsaoDia(previsao);

        console.log(data);
        document.getElementById('cidade').innerText = data.name + ', ' + data.sys.country;
        console.log(data.name, data.sys.country);

        console.log(Math.floor(data.main.temp - 273));
        document.getElementById('temperatura').innerText = Math.floor(data.main.temp - 273) + ' °C';

        document.getElementById('nuvens').innerText = data.weather[0].description;
        console.log(data.weather[0].description);

        let icone = data.weather[0].icon;
        let urlIcone = "https://api.openweathermap.org/img/w/" + icone + ".png";
        document.getElementById('img').src = urlIcone;
    });
}

function previsaoHora(previsao) {
    document.querySelector('.templist').innerHTML = '';
    for (let i = 0; i < 5; i++) {
        var data = new Date(previsao.list[i].dt * 1000);
        console.log((data.toLocaleTimeString(undefined, 'Africa/Luanda')).replace(':00', ''));

        let horaR = document.createElement('div');
        horaR.setAttribute('class', 'proximas');

        let div = document.createElement('div');
        let hora = document.createElement('p');
        hora.setAttribute('class', 'hora');
        hora.innerText = (data.toLocaleTimeString(undefined, 'Africa/Luanda')).replace(':00', '');

        let temp = document.createElement('p');
        temp.innerText = Math.floor((previsao.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((previsao.list[i].main.temp_min - 273)) + ' °C';

        div.appendChild(hora);
        div.appendChild(temp);

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = previsao.list[i].weather[0].description;

        horaR.appendChild(div);
        horaR.appendChild(desc);
        document.querySelector('.templist').appendChild(horaR);
    }
}

function previsaoDia(previsao) {
    document.querySelector('.semanaF').innerHTML = '';
    for (let i = 8; i < previsao.list.length; i += 8) {
        console.log(previsao.list[i]);
        let div = document.createElement('div');
        div.setAttribute('class', 'diaF');

        let dia = document.createElement('p');
        dia.setAttribute('class', 'data');
        dia.innerText = new Date(previsao.list[i].dt * 1000).toDateString(undefined, 'Africa/Luanda');
        div.appendChild(dia);

        let temp = document.createElement('p');
        temp.innerText = Math.floor((previsao.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((previsao.list[i].main.temp_min - 273)) + ' °C';
        div.appendChild(temp);

        let descricao = document.createElement('p');
        descricao.setAttribute('class', 'desc');
        descricao.innerText = previsao.list[i].weather[0].description;
        div.appendChild(descricao);

        document.querySelector('.semanaF').appendChild(div);
    }
}
