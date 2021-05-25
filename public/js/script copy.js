const baseApi = 'https://api.github.com/users/'
const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');
const followersCard = document.getElementById('followers');


getUser('florinpop17');
async function getUser(username){
    const resp = await fetch(baseApi +username);
    const response = await resp.json();

    
    createUserCard(response);   //To Create the user card with username, bio and major stats
    
    
    /*
    getAndAddToCard_Repos(username); //To get all the repos and add to the user card
    */

   createFollowersCard(username);
   getAndAddToCard_Followers(username);
    
}



function createUserCard(username){
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${username.avatar_url}" alt="${username.name}"/>
            </div>
            <div class="user-info">
                <h2>${username.name}</h2>
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

async function getAndAddToCard_Repos(username){
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




function createFollowersCard(followersRe){
    const followerCardHTML = `
    <div name="FOLLOWERSCARD">

        <div class="card">
            <div class="fol-title-block">
                <i class="fa fa-users">
                    <span>Followers</span>
                </i>
            <div>    
           
            <div id="followers-avatars">
            </div>
        </div> 
    </div>`;

    
    followersCard.innerHTML = followerCardHTML;
}

async function getAndAddToCard_Followers(username){
    const respF = await fetch(baseApi +username+"/followers");
    const response = await respF.json();

    
    const followersElement = document.getElementById('followers-avatars');  

    response.forEach((follower)=>{
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


function addToFollowersCard(resp){
    
}


form.addEventListener('submit', e=>{
    e.preventDefault();
    const user = search.value;

    if(user){
        getUser(user);
        search.value = "";
    }
})