
// Criando uma função anônima para jogar tudo para dentro da clous
(function () {
    const search = document.getElementById("search")
    const profile = document.getElementById("profile")

    const url = "https://api.github.com/users" // Deixei meio afastado só para lembrar que essa aqui é a API do git, melhor, o endpoint da API do Git ! 
    const clientId = "Iv1.742ed81e0cab42d3"
    const clientSecret = "4c9ef2c3d55125de59610bdd8e2c2dce39497904"
    const count = 10
    const sort = "creat: asc"

    async function getUser(user) { // Lembrando que eu pus o Async e o await ! Ou seja, eu pauso a execução para fazer a pesquisa de baixo ! 
        const profileResponse = await fetch(`${url}/${user}?clientId=${clientId}&clienteSecret=${clientSecret}`) // Usando o fetch para "pesquisar no link "
        
        const reposResponse = await fetch(`${url}/${user}/repos?per_page=${count}&sort=${sort}&clientId=${clientId}&clienteSecret=${clientSecret}`) // Usando o fetch para "pesquisar no link "
       

        const profile = await profileResponse.json() // Passando o profileresponse  para Json através do Profile ! E retornando, em baixo ! 
        const repos = await reposResponse.json()

        return {profile,repos}

    }
 
    function showProfile(user){ // Criando um template para renderizar o que está aqui ! copiei o que estava no HTML e tô jogando dentro do HTML, concatenando infos  !
        console.log(user)
        profile.innerHTML= `<div class="row mt-3">
        <col-md-4> </col-md-4>
        <div class="card" style="width: 18rem;"></div>
        <img class="200-200" src="${user.avatar_url}">
        <ul class="list-group list-group-flush"> 
            <li class="list-group-item"> Repositórios: <span class="badge bg-success text-light"> ${user.public_repos}</span></li>
            <li class="list-group-item">Seguidores:<span class="badge badge-light text-dark ">${user.followers} </span></li>
            <li class="list-group-item">Seguindo: <span class="badge badge-light text-dark">${user.following} </span></li>
           
        </ul>
        <div class="card-body">
            <a href="${user.html_url}" target="_blank" class="btn btn-warning btn btn-block"> </a>
        </div>
    </div>
</div> 
<div class="col-md-8"> 
<div id="repos"></div></div>
</div>`
    }
 
  function showRepos(repos){ // Se a funçao de cima cria um template com bootstrap, a de baixo far
        let output = ''
        repos.forEach(repo =>{
            output += `<div class="card card-body mb-2">
            <div class="row">
                <div class="col-md-6"> <a href="${repo.html_url}" target="_blank">${repo.name} </a></div>
                <div class="col-md-6">
                    <span class="badge-primary">Estrelas: ${repo.stargazers_count}</span>
                    <span class="badge-primary"> Visto: ${repo.watchers_count} </span>
                    <span class="badge-primary"> Forks: ${repo.forks_count} </span>
                </div>
           </div>
        </div>`
        }) 
        document.getElementById("repos").innerHTML = output
    }
 
    search.addEventListener("keyup", (e) => {
        const user = e.target.value;

        if (user.length > 0) {  // Se o tamanho de user for maior que zero, então, eu entro no getUser, senão, eu não vou entrar! 
            getUser(user).then(res => 
                {
                    showProfile(res.profile)
               showRepos(res.repos)
            })
  }
    })
})()