document.addEventListener("DOMContentLoaded", () => {
    const githubForm =  document.getElementById("github-form")
    const userList = document.getElementById("user-list")
    const repoList = document.getElementById("repos-list")

    // Add an event listener to the form
    githubForm.addEventListener("submit", (event) => { 
        event.preventDefault()

        const searchQuery = document.getElementById("search").value;

        // clear the previous search results 
        userList.innerHTML = "";
        repoList.innerHTML = "";

        // fetch the github data 
        fetch(`https://api.github.com/search/users?q=${searchQuery}`, {
            headers: {
                "Accept" : "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.items.forEach(user => {
                const li = document.createElement("li")
                li.innerHTML = `
                <img src ="${user.avatar_url}" "alt = ${user.login}" width ="50px" height ="50px">
                <h3>${user.login} </h3>
                <a href = "${user.html_url}" target = "_blank"> view profile </a>
                `

                li.addEventListener("click", () => {
                    fetchUserRepos(user.login)
                });
                userList.appendChild(li);

            })
        })
        .catch(error => console.error("Error fetching users :",error))
    })
})

// Create a function fetchuserrepos that returns the repositories given the username 


function fetchUserRepos(username){
    fetch(`https://api.github.com/search/users?q=${searchQuery}/repos`,{
        headers : {
            "Accept" : "application/vnd.github.v3+json"
        }
    }
    )
    .then(response => response.json())
    .then(repos  => {
        repos.forEach(repo => {
            const li = document.createElement("li")
            li.innerHTML = `
            <h4>${repo.name}</h4>
            <p>${repo.description} || "No description available please"</p>
            <a href = "${repo.html_url}" target ="_blank"> View repository </a>
            `
            repoList.appendChild(li)
        })
    })
    .catch(error => console.error("Error fetching repository :",error))
}