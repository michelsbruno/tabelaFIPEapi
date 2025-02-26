

document.addEventListener('DOMContentLoaded', () => {
    
    //Aplicando os dados de cada marca no select do html
    (async function buscaMarca(){
        let response = await fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas"); 
        let marcas = await response.json();

        let selectMarcas = document.getElementById("selMarca");

        marcas.forEach(marca => {
            let option = document.createElement("option");
            option.value = marca.codigo;
            option.textContent = marca.nome;
            selectMarcas.appendChild(option);
        });
    })();

    document.getElementById('btnBusca').addEventListener('click', buscaCarro);

    async function buscaCarro() {
        let listaCarro = document.getElementById("listaCarros");
        listaCarro.innerHTML = '';

        let selMarca = document.getElementById('selMarca');

        
        if(!selMarca) return;
        try{
            let response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${selMarca.value}/modelos`);
            if (!response.ok) {
                throw new Error("Erro ao buscar modelos");
            }
            let data = await response.json();

            if(data.modelos.length !== 0){
                let titulo = document.createElement("h2");
                titulo.textContent = `Listando carros da marca ${selMarca.options[selMarca.selectedIndex].text}`;
                listaCarro.appendChild(titulo);
            }
    
            data.modelos.forEach(modelo => {
                let li = document.createElement("li");
                li.textContent = modelo.nome;
                listaCarro.appendChild(li);
            });
        }
        catch(error){
            console.error(error);
            alert("Ocorreu um erro ao buscar os modelos.");
        }
        
    
    }
});
