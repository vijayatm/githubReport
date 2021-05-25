const baseApi = 'https://api.github.com/'

const form = document.getElementById('form');
const search = document.getElementById('search');

const main = document.getElementById('main');
const followersCard = document.getElementById('followers');
const repoCard = document.getElementById('repositories');


// getUser('naveenanimation20');


async function getUser(username){
    const resp = await fetch(baseApi +'users/'+username);
    const response = await resp.json();

    
    createUserCard(response);  


   createFollowersCard();
   getFollowersAddToCard_Followers(username);

   createRepositoriesCard();
   getReposAddToCard_Repositories(username);   
   
}



function createUserCard(username){
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${username.avatar_url}" alt="${username.name}"/>
            </div>
            <div class="user-info">
                <h1><a href=${username.html_url} target="_blank">${username.name}</a></h1>
                <p>${username.bio}</p>

                <ul class="info">
                    <li>${username.public_repos}
                    <strong>Repositories</strong></li>
                    <li>${username.followers}
                    <strong>Followers</strong></li>
                    <li>${username.following}
                    <strong>Following</strong></li>
                </ul>
                <div name="repoC" id="repos"></div>
            </div>
        </div>`;
    main.innerHTML = cardHTML;
}

async function getAndAddToUserCard_Repos(username){
    const resp = await fetch(baseApi+username+"/repos");
    const response = await resp.json();

    const reposArrayElement = document.getElementById('repos');    
    response
    .sort((a,b) => b.stargazers_count - a.stargazers_count)
    .slice(0,10)
    .forEach((repo) =>{
        const repoElement = document.createElement('a');
        repoElement.classList.add('repo');
        repoElement.href=repo.html_url;
        repoElement.target="_blank";
        repoElement.innerHTML=repo.name;

        reposArrayElement.appendChild(repoElement);
    });

}


function createFollowersCard(){
    const followerCardHTML = `
        <div class="card">
            <div class="fol-title-block">
                <h1>Followers</h1>
                <div id="followers-avatars"></div>   
            </div>    
        </div>`;

    followersCard.innerHTML = followerCardHTML;
}

async function getFollowersAddToCard_Followers(username){
    const respF = await fetch(baseApi +'users/'+username+"/followers");
    const response = await respF.json();

    
    const followersElement = document.getElementById('followers-avatars');  

    if(response.length ==0){
        console.log("length is 0");
        const aFollElement = document.createElement('h2');
        aFollElement.classList.add('err-msg');
        aFollElement.innerHTML = "You don't have any followers.<br> Inspire people";
        followersElement.appendChild(aFollElement);

    }else{
        response
        .forEach((follower)=>{
            const aFollElement = document.createElement('a');
            aFollElement.href=follower.html_url;
            aFollElement.classList.add('users-list');
            aFollElement.target="_blank";

            const follElement = document.createElement('img');
            follElement.classList.add('fol-img');
            follElement.src = follower.avatar_url;
            follElement.title = follower.login;

            aFollElement.appendChild(follElement); 
            followersElement.appendChild(aFollElement); 

        });
    }
}



function createRepositoriesCard(repoRes){
    const repositoriesCardHTML = `
    <div class = "card">
        <div class="fol-title-block">
            <h1> Repositories List </h1>
            <div id="repo-list"></div>
        </div>   
    </div>`

    repoCard.innerHTML = repositoriesCardHTML;
}


async function getReposAddToCard_Repositories(username){
    const respRaw = await fetch(baseApi +'users/'+username+"/repos");
    const response = await respRaw.json();


    const RepositoriesElement = document.getElementById('repo-list');  

    response
    .sort((a,b) => b.stargazers_count - a.stargazers_count)
    .forEach((repo)=>{
        const repElement = document.createElement('div');
        repElement.classList.add('repos');

        repElement.append(addNameTimeLangToCard(repo));
        repElement.append(addWatchStarForkToCard(repo));
       
        RepositoriesElement.appendChild(repElement); 
    });
   
}

function addNameTimeLangToCard(repo){
    const nameTimeLangHTML = document.createElement('div');
        
    const repoNameHTML = document.createElement('a');
    repoNameHTML.innerHTML = repo.name;
    repoNameHTML.href=repo.html_url;
    nameTimeLangHTML.appendChild(repoNameHTML);

    const timeCreateHTML = document.createElement('span');
    timeCreateHTML.classList.add('repoCreTime');
    timeCreateHTML.innerHTML = repo.created_at;
    nameTimeLangHTML.appendChild(timeCreateHTML);

    const langCont = document.createElement('h3');
    const langHTML = document.createElement('span');
    langHTML.classList.add("top-language");
    if(repo.language!='null'){
    langHTML.innerHTML = repo.language;
    }
    langCont.append(langHTML);
    nameTimeLangHTML.appendChild(langCont);

    return nameTimeLangHTML;
}

function addWatchStarForkToCard(repo){
    const threeLists = document.createElement('div');
        const ulItems = document.createElement('ul');
        ulItems.classList.add('wa-st-fo');
        var liItems_1 =document.createElement('li');
        var liItems_2 =document.createElement('li');
        var liItems_3 =document.createElement('li');
        
        liItems_1.innerHTML = `
        ${repo.watchers_count} <strong>Watchers</strong>
        `;
        liItems_2.innerHTML = `
        ${repo.stargazers_count} <strong>Stars</strong>
        `;
        liItems_3.innerHTML = `
        ${repo.forks_count} <strong>Forks</strong>
        `;

        ulItems.append(liItems_1);
        ulItems.append(liItems_2);
        ulItems.append(liItems_3);
        threeLists.append(ulItems);

        return threeLists;
}


form.addEventListener('submit', e=>{
    e.preventDefault();
    const user = search.value;

    if(user){
        getUser(user);
        search.value = "";
    }
})