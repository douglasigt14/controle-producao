let dados = [{ id: 1, rotulo: 'P-02' }];
let prom = fetch('http://controleproducao.tuboarte.com/paradas-frequencia/2')
.then(function (response) {
    return response.json();
})
.then(function (r) {
    dados = r;
    console.warn(dados);
});
Promise.all([prom]).then((values) => {
    console.log(values);
});
export default dados;